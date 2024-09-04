import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ClearCoreState,
  CoreSelectors,
  CustomerInfo,
  DiscordSigninAuth,
  InitDiscordSignin,
} from '../../../../core/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(CoreSelectors.initDiscordUrl) discordUrl$!: Observable<string>;
  private subscription = new Subscription();
  @Select(CoreSelectors.customerInfo) customerInfo$!: Observable<CustomerInfo>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.subscription.add(this.customerInfo$.subscribe(info => {
    //      if (info) {
    //        this.router.navigate(['/payments']);
    //      }
    // }));
    this.activatedRoute.queryParamMap.subscribe((paramsInfo: any) => {
      this.store.dispatch(new ClearCoreState());

      const code = paramsInfo.params.code;
      if (code) {
        this.store.dispatch(new DiscordSigninAuth(code)).subscribe((res) => {
          this.router.navigate(['/payments']);
        });
      }
    });

    this.subscription.add(
      this.discordUrl$.subscribe((url) => {
        if (url) {
          window.location.assign(url)
          // window.open(url, 'new');
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSignIn() {
    this.store.dispatch(new InitDiscordSignin());
  }
}
