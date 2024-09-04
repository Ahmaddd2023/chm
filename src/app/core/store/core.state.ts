import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CoreStateModel, SaveEmailResponse } from './core-state.model';
import { EmailService } from '../services/email.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  ClearCoreState, ClearPaymentState,
  CreatePaymentIntent,
  GetCustomerInfo,
  GetPaymentsStripe, GetPayPal,
  GetTransactionList,
} from './core.actions';
import {
  ClearErrorEmail,
  DiscordSigninAuth,
  InitDiscordSignin,
  SaveEmail,
} from './core.actions';
import { CoreService } from '../services/core.service';
import { dirname } from '@angular/compiler-cli';

@State<CoreStateModel>({
  name: 'core',
})
@Injectable()
export class CoreState {
  constructor(
    private emailService: EmailService,
    private coreService: CoreService,
  ) {}

  @Action(SaveEmail)
  saveEmail(
    { patchState }: StateContext<SaveEmailResponse>,
    { email }: SaveEmail,
  ): Observable<any> {
    return this.emailService.saveEmail(email).pipe(
      tap((res: any) => {
        if (res.status) {
          patchState({
            status: res.status,
          });
        }
      }),
      catchError((err: any) => {
        patchState({
          error: err.error.error,
        });
        throw err;
      }),
    );
  }

  @Action(InitDiscordSignin)
  initDiscordSignin(
    { patchState }: StateContext<CoreStateModel>,
    {}: InitDiscordSignin,
  ): Observable<any> {
    return this.coreService.initDiscordSignIn().pipe(
      tap((res: any) => {
        if (res.status) {
          patchState({
            initDiscordStatus: true,
            initDiscordUrl: res.data?.url,
          });
        }
      }),
      catchError((err: any) => {
        patchState({
          error: err.error.error,
        });
        throw err;
      }),
    );
  }

  @Action(DiscordSigninAuth)
  discordSigninAuth(
    { patchState }: StateContext<CoreStateModel>,
    { code }: DiscordSigninAuth,
  ): Observable<any> {
    return this.coreService.discordSignInAuth(code).pipe(
      tap((res: any) => {
        if (res.status) {
          localStorage.setItem('token', res.customer.token);
          patchState({
            customerInfo: res,
          });
        }
      }),
      catchError((err: any) => {
        patchState({
          error: err.error.error,
        });
        throw err;
      }),
    );
  }

  @Action(ClearErrorEmail)
  clearErrorEmail(
    { patchState }: StateContext<SaveEmailResponse>,
    {}: ClearErrorEmail,
  ): any {
    patchState({
      error: undefined,
    });
  }

  @Action(ClearCoreState)
  clearCoreState(
    { patchState }: StateContext<CoreStateModel>,
    {}: ClearCoreState,
  ): any {
    patchState({
      initDiscordStatus: undefined,
      initDiscordUrl: undefined,
      paymentIntent: undefined,
      transactions: [],
      paypalLink: undefined
    });
  }

  @Action(ClearPaymentState)
  clearPaymentState(
    { patchState }: StateContext<CoreStateModel>,
    {}: ClearPaymentState,
  ): any {
    patchState({
      paymentIntent: undefined,
      paypalLink: undefined
    });
  }

  @Action(CreatePaymentIntent)
  createPaymentIntent(
    { patchState }: StateContext<CoreStateModel>,
    { amount }: CreatePaymentIntent,
  ): Observable<any> {
    return this.coreService.paymentIntentRequest(amount).pipe(
      tap((res: any) => {
        if (res.status) {
          patchState({
            paymentIntent: res,
          });
        }
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  @Action(GetTransactionList)
  getTransactionList(
    { patchState, dispatch }: StateContext<CoreStateModel>,
    {}: GetTransactionList,
  ): Observable<any> {
    return this.coreService.getTransactionList().pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            transactions: res.transactions,
            paymentIntent: undefined,
            paypalLink: undefined
          });
          dispatch(new GetCustomerInfo());
        }
      }),
      catchError((err) => {
        // this.notification.error(err.error.error);
        return throwError(err);
      }),
    );
  }

  @Action(GetCustomerInfo)
  getCustomerInfo(
    { patchState }: StateContext<CoreStateModel>,
    {}: GetCustomerInfo,
  ): Observable<any> {
    return this.coreService.getCustomerInfo().pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            balance: res.plan.balance,
          });
        }
      }),
      catchError((err) => {
        // this.notification.error(err.error.error);
        return throwError(err);
      }),
    );
  }

  @Action(GetPaymentsStripe)
  getPaymentsStripe(
    { patchState }: StateContext<CoreStateModel>,
    {}: GetPaymentsStripe,
  ): Observable<any> {
    return this.coreService.getPaymentsStripe().pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            publishableKey: res.payments.stripe.publishable_key,
          });
        }
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  @Action(GetPayPal)
  getPayPal(
    { patchState }: StateContext<CoreStateModel>,
    {amount}: GetPayPal,
  ): Observable<any> {
    return this.coreService.getPayPal(amount).pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            paypalLink: res.data.payment_link
          })
        }
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
}
