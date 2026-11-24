const amqp = require("amqplib");
const { AMQP_URL } = require("./config");

const RETRY_DELAY_MS = 3000;
let channelPromise = null;

async function connectWithRetry() {
    for (;;) {
        try {
            const connection = await amqp.connect(AMQP_URL);
            connection.on("close", () => {
                console.error("RabbitMQ connection closed, reconnecting...");
                channelPromise = null;
            });
            connection.on("error", (err) => console.error("RabbitMQ error:", err.message));
            console.log("Connected to RabbitMQ");
            return connection.createChannel();
        } catch (err) {
            console.error(`RabbitMQ unavailable (${err.message}), retrying in ${RETRY_DELAY_MS / 1000}s`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }
}

function getChannel() {
    if (!channelPromise) channelPromise = connectWithRetry();
    return channelPromise;
}

/** Publish a JSON event `{ type, payload }` to the given queue. */
async function publish(queue, type, payload) {
    const channel = await getChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ type, payload })));
}

/** Consume JSON events from a queue; `handler(type, payload)` may be async. */
async function consume(queue, handler) {
    const channel = await getChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, async (msg) => {
        if (!msg) return;
        try {
            const { type, payload } = JSON.parse(msg.content.toString());
            await handler(type, payload);
        } catch (err) {
            console.error(`Failed to handle message on ${queue}:`, err.message);
        }
        channel.ack(msg);
    });
    console.log(`Listening for events on queue ${queue}`);
}

module.exports = { publish, consume };
