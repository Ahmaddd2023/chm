export interface CoreStateModel {
  initDiscordStatus: boolean;
  initDiscordUrl: string;
  authDiscordStatus: boolean;
  customerInfo: CustomerInfo;
  error: string;
  paymentIntent: PaymentIntent;
  transactions: Transaction[];
  balance: number;
  publishableKey: string;
  paypalLink: string;
}

export interface SaveEmailResponse {
  status: boolean;
  error: string;
}

export interface GetPaymentsStripeResponse {
  status: boolean;
  payments: {
    stripe: {
      publishable_key: string;
      id: string;
    };
  };
}

export interface CustomerInfo {
  customer: {
    customer_id: string;
    name: string;
    login: string;
    person_id: string;
    token: string;
  };
  external_account: {
    id: string;
    username: string;
    avatar: string;
    name: string;
  };
}

export interface CustomerProfile {
  name: string;
  image: string;
  email: string;
}

export interface PaymentIntent {
  data: {
    payment_intent_id: string;
    auto_payment: boolean;
    client_secret: string;
  };
}

export interface Transaction {
  id: string;
  date: Date;
  type: string;
  amount: number;
  description: string;
  data: {
    status: string;
    source: string;
    service: string;
  };
  owner: {
    id: string;
    entity: string;
  };
  portal_id: string;
  bot_id: string;
}

export const MockedCustomer = {
  status: true,
  customer: {
    customer_id: 'BFLTWCFOIB',
    name: 'veronika_che',
    login: '65d4f391d188173648415222',
    profile: {
      name: 'veronika_che',
      image: null,
      email: null,
    },
    person_id: '65d4f391d188173648415222',
    merchants: [],
    plan: {
      status: 'free',
      mode: 'free',
    },
    relations: {
      following: 0,
      followers: 0,
    },
    statistics: {},
    created_at: '2024-02-20T18:46:41.754Z',
    updated_at: '2024-02-20T18:46:41.754Z',
    external: null,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHkiOiJjdXN0b21lciIsImN1c3RvbWVyX2lkIjoiQkZMVFdDRk9JQiIsImlhdCI6MTcwODQ1NDgwMX0.TmlVZ63p32BZW9UHTBtlom6bpwDK4N92przQQ9n4htI',
  },
  external_account: {
    id: '1092798988660506764',
    username: 'veronika_chernova',
    avatar: null,
    name: 'veronika_che',
  },
};
