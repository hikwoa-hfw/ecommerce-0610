import { scheduleJob } from "node-schedule";

// scheduleJob("job-running-every-10-sec", "*/10 * * * * *", () => {
//   console.log("JOB EXECUTED -> EVERY 10 SECOND -> HELLO WORLD!!!");
// });

// scheduleJob("job-running-every-1-min", "* * * * *", () => {
//   console.log("JOB EXECUTED -> EVERY 1 MINUTE -> HELLO WORLD!!!");
// });

scheduleJob("job-running-every-midnight", "0 0 * * *", () => {
  console.log("JOB EXECUTED -> EVERY MIDNIGHT -> HELLO WORLD!!!");
});