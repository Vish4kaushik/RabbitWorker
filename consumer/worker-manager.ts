import { Worker } from "worker_threads";
import path from "path";

export function processWithWorker(message: string) {

  const workerPath = path.resolve(__dirname, "./worker.js");

  const worker = new Worker(workerPath, {
    workerData: message,
  });

  worker.on("message", (result) => {
    console.log(`Worker finished processing: ${result}`);
  });

  worker.on("error", (error) => {
    console.error(`Worker error: ${error.message}`);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker exited with code: ${code}`);
    }
  });
}
 