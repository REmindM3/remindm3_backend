// const cron = require('node-cron');
// const nodemailer = require('nodemailer');
// const Event = require('./models/events');
// const User = require('./models/user');

// // Create a reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'your_email@example.com',
//     pass: 'your_password',
//   },
// });

// // Schedule a task to run every day at noon
// cron.schedule('0 12 * * *', async () => {
//   // Get the current date
//   const currentDate = new Date();

//   // Find events whose alertDate is the current date
//   const events = await Event.find({
//     alertDate: {
//       $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
//       $lt: new Date(currentDate.setHours(23, 59, 59, 999)),
//     },
//   });

//   // For each event, send an alert or email to the user
//   for (const event of events) {
//     const user = await User.findOne({ events: event._id });

//     // Send an email to the user
//     await transporter.sendMail({
//       from: '"Your Name" <your_email@example.com>',
//       to: user.email,
//       subject: 'Event Alert',
//       text: `This is a reminder that your event "${event.title}" is happening today!`,
//     });
//   }
// });
