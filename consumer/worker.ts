import { parentPort, workerData } from "worker_threads";

if (!parentPort) throw new Error("No parent port available");

function performTask(data: string) {
  console.log(`Worker is processing: ${data}`);
  // Simulate intensive computation or I/O operation
  const result = `${data} - processed at ${new Date().toISOString()}`;
  return result;
}

const result = performTask(workerData);
parentPort.postMessage(result);
