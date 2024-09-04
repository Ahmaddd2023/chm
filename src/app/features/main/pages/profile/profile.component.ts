import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { BalacePointsToUsdPipe } from '../../../../shared/pipes/balace-points-to-usd.pipe';
import {
  ClearCoreState, ClearPaymentState,
  CoreSelectors,
  CreatePaymentIntent,
  CustomerInfo,
  GetCustomerInfo,
  GetPaymentsStripe, GetPayPal,
  GetTransactionList,
  Transaction,
} from '../../../../core/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Config } from '../../../../core/services/requests.config';
import { Router } from '@angular/router';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
declare const Stripe: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(CoreSelectors.paymentIntent) paymentIntent$!: Observable<any>;
  @Select(CoreSelectors.customerInfo) customerInfo$!: Observable<CustomerInfo>;
  @Select(CoreSelectors.balance) balance$!: Observable<number>;
  @Select(CoreSelectors.paypalLink) paypalLink$!: Observable<string>;
  @ViewSelectSnapshot(CoreSelectors.transactions)
  transactions!: Transaction[];
  @ViewSelectSnapshot(CoreSelectors.publishableKey)
  publishableKey!: string;

  isPay = false;
  isDisabledBtn = true;

  price = [
    { value: '10', label: '+10' },
    { value: '25', label: '+25' },
    { value: '50', label: '+50' },
    { value: '100', label: '+100' },
  ];

  paymentIntent: any;
  private subscription = new Subscription();
  private unsubscribe$ = new Subject();

  amount = new FormControl(0, [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  stripe: any;
  private cardStyle = {
    base: {
      color: '#FFF',
      fontSize: '16px',
      fontWeight: 'bold',
      '::placeholder': {
        color: '#FFF',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
  };
  showCard: any;

  payBtn = 'PAY WITH CREDIT CARD';
  payBtnPP = 'PAY WITH PAYPAL';
  payment_done = false;

  // productId: string | null = 'HER8YGN6KT';

  clientSecret = null;
  card = null;
  error!: string;

  constructor(
    private store: Store,
    private pointsToUsd: BalacePointsToUsdPipe,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetCustomerInfo());
    this.store.dispatch(new GetPaymentsStripe());
    this.store.dispatch(new ClearPaymentState());

    this.subscription.add(
      this.customerInfo$.subscribe((info) => {
        if (info) {
          this.store.dispatch(new GetTransactionList());
        }
      }),
    );

    this.subscription.add(this.paypalLink$.subscribe(link => {
      if (link) {
        window.open(link, '_blank');
        // window.location.assign(link)
      }
    }));

    this.subscription.add(
      this.paymentIntent$.subscribe((intent: any) => {
        if (intent?.data?.auto_payment) {
          this.payBtn = 'PAID';
          this.isPay = false;
          this.amount.setValue(0);

          setTimeout(() => {
            this.store.dispatch(new GetTransactionList());
            this.isDisabledBtn = false;
            this.payBtn = 'PAY WITH CREDIT CARD';
          }, 3000);
        }
        if (intent?.data?.client_secret) {
          this.isDisabledBtn = false;
          this.payBtn =
          'PAY $ ' + this.pointsToUsd.transform(this.amount.value as number);
          this.isPay = true;
          this.clientSecret = intent?.data?.client_secret;
        }
      }),
    );

    this.amount?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (
          this.amount.value === undefined ||
          this.amount.value === null ||
          this.amount.value < 5
        ) {
          this.isDisabledBtn = true;
          // this.isPay = false;
        } else {
          this.isDisabledBtn = false;
          // this.isPay = true;
        }
      });
  }

  ngAfterViewInit() {
    this.getStripeToken();
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearCoreState());
    this.subscription.unsubscribe();

    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  getStripeToken() {
    // change
    // const publishable_key = Config.stripePublishableKey;

    this.loadStripeScript(this.publishableKey);
  }

  public loadStripeScript(stripe_key: string) {
    var script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    document.body.appendChild(script);
    let self = this;

    script.onload = function () {
      self.stripe = new Stripe(stripe_key, {
        apiVersion: '2020-08-27',
        locale: 'en',
      });
      self.createPaymentForm();
    };
  }

  createPaymentForm() {
    // console.log(this.stripe);
    var elements = this.stripe.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
        },
      ],
    });

    var card = elements.create('card', { style: this.cardStyle });
    card.mount('#stripe__input');
    this.showCard = true;
    this.card = card;
    const cardElement: any = document.getElementById('stripe__input');
    cardElement.style.display = 'block';
  }

  payWithCard() {
    let self = this;
    this.stripe
      ?.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
        },
      })
      .then((result: any) => {
        if (result.error) {
          // self.error = result.error.message;
          // self.payBtn = 'PAY WITH CREDIT CARD';
          // self.isPay = false;
          // self.isDisabledBtn = false;
          // self.amount.setValue(0);
          self.isPay = false;
          self.amount.setValue(0);
          self.payBtn = 'PAID';

          setTimeout(() => {
            self.store.dispatch(new GetTransactionList());
            self.isDisabledBtn = false;
            self.payBtn = 'PAY WITH CREDIT CARD';
          }, 3000);
        } else {
          // The payment succeeded!
          self.isPay = false;
          self.amount.setValue(0);
          self.payBtn = 'PAID';

          setTimeout(() => {
            self.store.dispatch(new GetTransactionList());
            self.isDisabledBtn = false;
            self.payBtn = 'PAY WITH CREDIT CARD';
          }, 3000);
        }
      });
  }

  start() {
    this.error = '';
    if (this.amount.value && !this.clientSecret) {
      this.store.dispatch(new CreatePaymentIntent(this.amount.value));
      this.payBtn = 'PLEASE WAIT...';
      this.isDisabledBtn = true;
    } else if (this.amount.value && this.clientSecret) {
      this.payBtn = 'PLEASE WAIT...';
      this.isDisabledBtn = true;
      this.payWithCard();
    }
    return;
  }

  onSelectPrice(price: string) {
    const priceToNumber = Number(price);
    this.amount.setValue(priceToNumber);
  }

  onPayPalOpen() {
    this.payBtnPP = 'PLEASE WAIT...';
    this.isDisabledBtn = true;
    this.store.dispatch(new GetPayPal(this.amount.value as number));
    setTimeout(() => {
      this.store.dispatch(new GetTransactionList());
      this.isDisabledBtn = false;
      this.payBtnPP = 'PAY WITH PAYPAL';
    }, 3000);
  }

  logout(): void {
    this.store.dispatch(new ClearCoreState()).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
