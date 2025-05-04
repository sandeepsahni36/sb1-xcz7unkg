import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CreditCard, Clock, AlertTriangle, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { SUBSCRIPTION_TIERS } from '../../lib/utils';
import { createCheckoutSession, getCurrentSubscription, getOrderHistory } from '../../lib/stripe';
import { toast } from 'sonner';

const SubscriptionPage = () => {
  const { company } = useAuthStore();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success === 'true') {
      toast.success('Payment successful! Your subscription has been updated.');
    } else if (canceled === 'true') {
      toast.error('Payment canceled. Please try again if you want to upgrade your subscription.');
    }

    loadSubscriptionData();
  }, [searchParams]);

  const loadSubscriptionData = async () => {
    try {
      const [subData, orderData] = await Promise.all([
        getCurrentSubscription(),
        getOrderHistory(),
      ]);
      setSubscription(subData);
      setOrders(orderData);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      toast.error('Failed to load subscription information');
    }
  };

  const handleUpgrade = async (plan: 'starter' | 'professional' | 'enterprise') => {
    try {
      setLoading(true);
      const checkoutUrl = await createCheckoutSession(plan);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start upgrade process');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription and billing information.
          </p>
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {SUBSCRIPTION_TIERS.find(tier => tier.id === company?.tier)?.name || 'Unknown Plan'}
              </p>
              <p className="text-sm text-gray-500">
                {subscription?.status === 'active' ? 'Active' : 'Trial'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {subscription?.status === 'active' && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Renews on{' '}
                    {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
              <Button
                variant="outline"
                leftIcon={<CreditCard size={16} />}
                onClick={() => toast.info('Billing portal coming soon')}
              >
                Manage Billing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {SUBSCRIPTION_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-lg shadow-sm divide-y divide-gray-200 ${
                company?.tier === tier.id
                  ? 'border-2 border-primary-500 bg-primary-50'
                  : 'border border-gray-200 bg-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
                <p className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <Button
                  className="mt-6 w-full"
                  variant={company?.tier === tier.id ? 'secondary' : 'default'}
                  disabled={company?.tier === tier.id || loading}
                  onClick={() => handleUpgrade(tier.id as any)}
                >
                  {company?.tier === tier.id ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-4 space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <Check className="flex-shrink-0 h-5 w-5 text-success-500" />
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Billing History */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: order.currency,
                      }).format(order.amount_total / 100)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.payment_status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : order.payment_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Download size={16} />}
                        onClick={() => toast.info('Invoice download coming soon')}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No billing history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
          {subscription?.payment_method_brand ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {subscription.payment_method_brand.charAt(0).toUpperCase() +
                      subscription.payment_method_brand.slice(1)}{' '}
                    ending in {subscription.payment_method_last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {/* Add expiry date if available */}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => toast.info('Update payment method coming soon')}
              >
                Update
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payment method</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a payment method to manage your subscription.
              </p>
              <div className="mt-6">
                <Button onClick={() => toast.info('Add payment method coming soon')}>
                  Add Payment Method
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Status */}
      {subscription?.status === 'past_due' && (
        <div className="mt-8 bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-error-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error-800">Payment Past Due</h3>
              <div className="mt-2 text-sm text-error-700">
                <p>
                  Your last payment was unsuccessful. Please update your payment method to
                  continue using our services.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <Button
                    variant="outline"
                    className="bg-error-50 text-error-700 hover:bg-error-100"
                    onClick={() => toast.info('Update payment method coming soon')}
                  >
                    Update Payment Method
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;