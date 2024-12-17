import * as amqp from "amqplib";
import { RABBITMQ_URL, QUEUE_NAME } from "./config";

async function startProducer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);
    console.log(`Producer connected to queue: ${QUEUE_NAME}`);

    // Periodically send messages
    setInterval(() => {
      const message = `Message at ${new Date().toISOString()}`;
      channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
      console.log(`Sent: ${message}`);
    }, 5000);
  } catch (error:any) {
    console.error(`Producer error: ${error.message}`);
  }
}

startProducer();
