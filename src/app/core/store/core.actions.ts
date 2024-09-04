export class SaveEmail {
  static readonly type = '[Core] Save email';
  constructor(public email: string) {}
}

export class ClearErrorEmail {
  static readonly type = '[Core] Clear error email';
}

export class InitDiscordSignin {
  static readonly type = '[Core] InitDiscordSignin';
}

export class DiscordSigninAuth {
  static readonly type = '[Core] DiscordSigninAuth';
  constructor(public code: string) {}
}

export class ClearCoreState {
  static readonly type = '[Core] ClearCoreState';
}
export class ClearPaymentState {
  static readonly type = '[Core] ClearPaymentState';
}

export class CreatePaymentIntent {
  static readonly type = '[Core] Create Payment Intent';
  constructor(public amount: number) {}
}

export class GetTransactionList {
  static readonly type = '[Core] Get Transaction List';
  constructor() {}
}

export class GetCustomerInfo {
  static readonly type = '[Core] Get Customer Info';
  constructor() {}
}

export class GetPaymentsStripe {
  static readonly type = '[Core] Get payments stripe';
  constructor() {}
}
export class GetPayPal {
  static readonly type = '[Core] Get Pay Pal';
  constructor( public amount: number) {}
}

