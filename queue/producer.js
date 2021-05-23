let q = "video_tasks";

let amqplib = require("amqplib");
let ch;

amqplib.connect("amqp://localhost").then(async (conn, err) => {
  if (err) {
    return console.warn();
  }
  let channel = await conn.createChannel();
  await channel.assertQueue(q);
  ch = channel;
});

let publishTaskToQueue = async (message) => {
  let sent = ch.sendToQueue(q, Buffer.from(message));
  if (!sent) {
    throw "Message cannot be stored in the queue";
  }

  return sent;
};

process.on("exit", (sigNum) => {
  ch.close();
  console.log("RabbitMq channel closed");
});

module.exports.publishTaskToQueue = publishTaskToQueue;

// // Publisher
// open
//   .then(function (conn) {
//     return conn.createChannel();
//   })
//   .then(function (ch) {
//     return ch.assertQueue(q).then(function (ok) {
//       return ch.sendToQueue(q, Buffer.from("something to do"));
//     });
//   })
//   .catch(console.warn);

// // Consumer
// open
//   .then(function (conn) {
//     return conn.createChannel();
//   })
//   .then(function (ch) {
//     return ch.assertQueue(q).then(function (ok) {
//       return ch.consume(q, function (msg) {
//         if (msg !== null) {
//           console.log(msg.content.toString());
//           ch.ack(msg);
//         }
//       });
//     });
//   })
//   .catch(console.warn);
