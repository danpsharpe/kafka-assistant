import config from './config/config';
var Kafka = require('no-kafka');

var producer = new Kafka.Producer({
    connectionString: config.KAFKA_HOST,
    ssl: {
       certFile: config.KAFKA_SSL_CERTIFICATE,
       keyFile: config.KAFKA_SSL_CLIENT_CERTIFICATE_KEY
     }
});

producer.init().then(function(){
    return producer.send({
        topic: config.KAFKA_TOPIC,
        message: {
            value: config.TEST_MESSAGE
        }
    });
}).then(function (result) {
    console.log(result);
});