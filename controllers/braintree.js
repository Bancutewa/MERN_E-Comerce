const braintree = require('braintree');
require('dotenv').config();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox, // Production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Generate client token
exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).json({ error: 'Failed to generate client token', details: err });
    } else {
      res.json(response);
    }
  });
};

// Process payment
exports.processPayment = (req, res) => {
  const { paymentMethodNonce, amount } = req.body;

  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: paymentMethodNonce,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Payment failed', details: error });
      } else if (!result.success) {
        res.status(400).json({
          error: 'Payment unsuccessful',
          details: result.transaction ? result.transaction.processorResponseText : result.message,
        });
      } else {
        res.json(result);
      }
    }
  );
};
