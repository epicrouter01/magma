const { Kafka } = require('kafkajs');

const topicsToCreate = [
    {
        topic: 'user.created',
        numPartitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'user.deleted',
        numPartitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'health.check',
        numPartitions: 1,
        replicationFactor: 1
    }
]

async function runAll() {
    const kafka = new Kafka({
        clientId: 'notification-service-migrations',
        brokers: [process.env.KAFKA_BROKER],
        retry: {
            initialRetryTime: 500,
            retries: 20
        }
    });
    const admin = kafka.admin();
    await admin.connect();

    console.log(`Connected to Kafka broker!`);

    await admin.createTopics({
        topics: topicsToCreate
    })
    console.log(`Topics created!`);

    await admin.disconnect();
}

runAll();