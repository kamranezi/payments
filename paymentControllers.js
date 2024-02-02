// paymentControllers.js
const { YooCheckout } = require('@a2seven/yoo-checkout');
const { yooCheckout: config } = require('./config');

const checkout = new YooCheckout(config);

async function createPayment(req, res) {
    // Получение данных из тела запроса
    const paymentData = req.body;

    try {
        // Создание платежа в ЮКассе
        const payment = await checkout.createPayment(paymentData);

        // Отправка данных платежа в ответе
        res.json(payment);
    } catch (error) {
        // Обработка возможных ошибок при создании платежа
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}

async function getPaymentInfo(req, res) {
    // Ваша логика для получения информации о платеже
    const paymentId = req.params.paymentId;
    try {
        const payment = await checkout.getPayment(paymentId);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function capturePayment(req, res) {
    // Ваша логика для подтверждения платежа
    const paymentId = req.params.paymentId;
    const idempotenceKey = req.header('Idempotence-Key');
    try {
        // Замените { /* payload */ } на реальные данные подтверждения платежа
        const payment = await checkout.capturePayment(paymentId, { /* реальные данные */ }, idempotenceKey);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function cancelPayment(req, res) {
    // Ваша логика для отмены платежа
    const paymentId = req.params.paymentId;
    const idempotenceKey = req.header('Idempotence-Key');
    try {
        // Замените { /* payload */ } на реальные данные отмены платежа
        const payment = await checkout.cancelPayment(paymentId, idempotenceKey, { /* реальные данные */ });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPayment,
    getPaymentInfo,
    capturePayment,
    cancelPayment
};
