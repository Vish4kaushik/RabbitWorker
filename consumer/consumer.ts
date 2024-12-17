import * as amqp from "amqplib";
import { RABBITMQ_URL, QUEUE_NAME } from "./config";
import { processWithWorker } from "./worker-manager";

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);
    console.log(`Consumer connected to queue: ${QUEUE_NAME}`);

    // Consume messages
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        console.log(`Consumer received: ${messageContent}`);

        // Process message in worker thread
        processWithWorker(messageContent);

        channel.ack(msg);
      }
    });
  } catch (error:any) {
    console.error(`Consumer error: ${error.message}`);
  }
}

startConsumer();