export interface AccountData {
  email: string;
  password: string;
}

export interface ShippingData {
  savedAddress: string;
  firstLine: string;
  streetName: string;
  postcode: string;
  shippingMethod: string;
}

export interface PaymentData {
  savedCard: string;
  nameOnCard: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvc: string;
}

export interface OrderSummaryData {
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  discountCode?: string;
}

export interface CheckoutState {
  currentStep: 1 | 2 | 3;
  accountData: AccountData;
  shippingData: ShippingData;
  paymentData: PaymentData;
  orderSummary: OrderSummaryData;
}

export interface CheckoutContextType extends CheckoutState {
  setCurrentStep: (step: 1 | 2 | 3) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateAccountData: (data: Partial<AccountData>) => void;
  updateShippingData: (data: Partial<ShippingData>) => void;
  updatePaymentData: (data: Partial<PaymentData>) => void;
  updateOrderSummary: (data: Partial<OrderSummaryData>) => void;
  resetCheckout: () => void;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
