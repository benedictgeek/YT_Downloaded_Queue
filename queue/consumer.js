let amqplib = require("amqplib");
let yltd = require("ytdl-core");
let fs = require("fs");

let q = "video_tasks";
amqplib.connect("amqp://localhost").then(async (conn, err) => {
  if (err) {
    return console.warn();
  }
  let channel = await conn.createChannel();
  await channel.assertQueue(q);
  channel.consume(q, function (msg) {
    if (msg !== null) {
      let data = JSON.parse(msg.content.toString());
      let dirName = "./files";
      let fileName = `${dirName}/${data.id}.mp4`;
      fs.mkdirSync(dirName, { recursive: true });
      //   fs.mkdirSync(fileName, { recursive: true }, (err) => console.error(err));
      yltd(data.url)
        .pipe(fs.createWriteStream(fileName))
        .on("finish", () => {
          console.log("DOWNLOAD FINISHED");
          channel.ack(msg);
        });
    }
  });
});
