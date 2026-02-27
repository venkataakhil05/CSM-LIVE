const cron = require("node-cron");
const OTP = require("../models/otp.model");

// Runs every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running OTP cleanup job...");

  const now = new Date();

  await OTP.deleteMany({ expiresAt: { $lt: now } });

  console.log("Expired OTPs removed");
});
