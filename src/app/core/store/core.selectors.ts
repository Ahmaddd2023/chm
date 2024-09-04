import { Selector } from '@ngxs/store';
import { CoreState } from './core.state';
import {
  CoreStateModel,
  CustomerInfo,
  PaymentIntent,
  SaveEmailResponse,
  Transaction,
} from './core-state.model';

export class CoreSelectors {
  @Selector([CoreState])
  static statusEmail(state: SaveEmailResponse): boolean {
    return state.status;
  }

  @Selector([CoreState])
  static errorEmail(state: SaveEmailResponse): string {
    return state.error;
  }

  @Selector([CoreState])
  static initDiscordUrl(state: CoreStateModel): string {
    return state.initDiscordUrl;
  }
  @Selector([CoreState])
  static customerInfo(state: CoreStateModel): CustomerInfo {
    return state.customerInfo;
  }

  @Selector([CoreState])
  static transactions(state: CoreStateModel): Transaction[] {
    return state.transactions;
  }

  @Selector([CoreState])
  static paymentIntent(state: CoreStateModel): PaymentIntent {
    return state.paymentIntent;
  }

  @Selector([CoreState])
  static balance(state: CoreStateModel): number {
    return state.balance;
  }

  @Selector([CoreState])
  static publishableKey(state: CoreStateModel): string {
    return state.publishableKey;
  }

  @Selector([CoreState])
  static paypalLink(state: CoreStateModel): string {
    return state.paypalLink;
  }
}
