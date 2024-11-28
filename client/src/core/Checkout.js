import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: null,
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getBraintreeClientToken(userId, token)
      .then((data) => {
        if (data.error) {
          setData({ ...data, error: 'Failed to load payment gateway' });
        } else {
          setData({ clientToken: data.clientToken });
        }
      })
      .catch((err) => {
        console.error('Error fetching token:', err);
        setData({ ...data, error: 'Failed to fetch payment token' });
      });
  }, [userId, token]);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const buy = () => {
    if (!data.instance) {
      setData({ ...data, error: 'Payment instance is not available' });
      return;
    }

    setData({ loading: true });

    data.instance
      .requestPaymentMethod()
      .then((response) => {
        const paymentData = {
          paymentMethodNonce: response.nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            if (response.error) {
              setData({ loading: false, error: response.error });
            } else {
              const createOrderData = {
                products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
                address: data.address,
              };

              createOrder(userId, token, createOrderData)
                .then(() => {
                  emptyCart(() => {
                    setRun(!run);
                    setData({ loading: false, success: true });
                  });
                })
                .catch((error) => {
                  console.error('Order creation error:', error);
                  setData({ loading: false, error: 'Failed to create order' });
                });
            }
          })
          .catch((error) => {
            console.error('Payment processing error:', error);
            setData({ loading: false, error: 'Payment processing failed' });
          });
      })
      .catch((error) => {
        console.error('DropIn error:', error);
        setData({ ...data, error: 'Failed to process payment. Try again.' });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='form-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: { flow: 'vault' },
            }}
            onInstance={(instance) =>
              setData((prevData) => ({ ...prevData, instance }))
            }
          />
          <button onClick={buy} className='btn btn-success btn-block'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showDropIn()}
    </div>
  );
};

export default Checkout;
