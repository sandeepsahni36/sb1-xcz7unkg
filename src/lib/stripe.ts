import { supabase } from './supabase';
import { StripePlan, STRIPE_PRODUCTS } from '../stripe-config';

export async function createCheckoutSession(plan: StripePlan) {
  const product = STRIPE_PRODUCTS[plan];

  if (!product) {
    throw new Error('Invalid plan selected');
  }

  const { data: { session_url } } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      price_id: product.priceId,
      mode: product.mode,
      success_url: `${window.location.origin}/dashboard/admin/subscription?success=true`,
      cancel_url: `${window.location.origin}/dashboard/admin/subscription?canceled=true`,
    },
  });

  return session_url;
}

export async function getCurrentSubscription() {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getOrderHistory() {
  const { data, error } = await supabase
    .from('stripe_user_orders')
    .select('*')
    .order('order_date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}