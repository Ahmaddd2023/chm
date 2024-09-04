import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { GetPaymentsStripeResponse } from '../store';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  initDiscordSignIn(): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/person/auth-provider/discord/initialize`,
      {
        bot_id: environment.botId,
        data: {
          redirect_url: 'https://thechamp.ai/auth/login',
        },
      },
    );
  }

  discordSignInAuth(code: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/person/auth-provider/discord/authorize`,
      {
        bot_id: environment.botId,
        entity: 'customer',
        data: {
          redirect_url: 'https://thechamp.ai/auth/login',
          code: code,
        },
      },
    );
    // return of(MockedCustomer);
  }

  paymentIntentRequest(amount: number): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/customer/balance/prepare/stripe`,
      { amount: amount },
      {
        headers: new HttpHeaders({
          'X-Access-Token': localStorage.getItem('token') as string,
        }),
      },
    );
  }

  getTransactionList(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/customer/billing/transactions`,
      {
        headers: new HttpHeaders({
          'X-Access-Token': localStorage.getItem('token') as string,
        }),
      },
    );
  }

  getCustomerInfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/customer`, {
      headers: new HttpHeaders({
        'X-Access-Token': localStorage.getItem('token') as string,
      }),
    });
  }

  getPaymentsStripe(): Observable<GetPaymentsStripeResponse> {
    return this.http.get<GetPaymentsStripeResponse>(
      `${environment.apiUrl}/store/${environment.botId}/payments`,
    );
  }

  getPayPal(amount: number): Observable<any> {
    return this.http.post<GetPaymentsStripeResponse>(
      `${environment.apiUrl}/api/customer/balance/prepare/paypal`,
      {
        "description": "Credits on TheChamp.ai",
        "amount": amount
      },{
      headers: new HttpHeaders({
        'X-Access-Token': localStorage.getItem('token') as string,
      }),
    }
    );
  }
}
