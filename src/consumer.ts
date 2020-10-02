import config from './config/config';
var Kafka = require('no-kafka');

var consumer = new Kafka.SimpleConsumer({
    connectionString: config.KAFKA_HOST,
    ssl: {
        certFile: config.KAFKA_SSL_CERTIFICATE,
        keyFile: config.KAFKA_SSL_CLIENT_CERTIFICATE_KEY
    }
});

var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log("Message received:");
        console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
    });
};

consumer.init().then(function () {
    consumer.subscribe(config.KAFKA_TOPIC, dataHandler).then(res => {
        console.log("Consumer is ready and listening on topic: " + config.KAFKA_TOPIC);
    });
});
