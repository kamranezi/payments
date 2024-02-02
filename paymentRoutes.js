// paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPayment, getPaymentInfo, capturePayment, cancelPayment } = require('./paymentControllers');

router.post('/create', createPayment);
router.get('/info/:paymentId', getPaymentInfo);
router.post('/capture/:paymentId', capturePayment);
router.post('/cancel/:paymentId', cancelPayment);

module.exports = router;
