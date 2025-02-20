const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox',
    client_id: 'AUAHX97M1TUWkP92wJpTIMks5osvNzrGeSu0ARXWA-ejlSjug9LDRQAWI7GUpVZJlYaJOXDXwIZl-E6t',
    client_secret: 'EEArxyj7oD8z3UnhE-29_zJzEJM9bgzXdWg4gSDIUe7Q_8udxVmVBpSNnKoorcKxIRGAiTM5K1wH2kpb'
});

module.exports = paypal