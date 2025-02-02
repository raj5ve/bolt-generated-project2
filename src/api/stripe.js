import api from './axios';

export const createPaymentIntent = async (amount, currency = 'usd') => {
  const response = await api.post('/stripe/payment-intent', { amount, currency });
  return response.data;
};

export const connectStripeAccount = async () => {
  const response = await api.post('/stripe/connect');
  return response.data;
};

export const getStripeAccountStatus = async () => {
  const response = await api.get('/stripe/account-status');
  return response.data;
};
