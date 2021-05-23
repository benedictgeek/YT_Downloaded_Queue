const ytdl = require("ytdl-core");
const { publishTaskToQueue } = require("../queue/producer");
const fs = require("fs");
const uuid = require("uuid");

module.exports.getVideo = async (req, res, _) => {
  try {
    let url = req.query.url;
    if (!ytdl.validateURL(url)) {
      return res.status(400).send({
        status: false,
        message: "Invalid youtube url, please try again.",
      });
    }

    await publishTaskToQueue(JSON.stringify({ id: uuid.v4(), url: url }));

    return res.status(200).send({
      status: true,
      message: "Your video download has begun!",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong, please try again.",
    });
  }
};

module.exports.downloadVideo = (req, res, _) => {
  try {
    let id = req.params.id;

    let filePath = `${process.cwd()}/files/${id}.mp4`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).send({
        status: true,
        message: "The requested video is not available",
      });
    }

    fs.createReadStream(filePath)
      .pipe(res)
      .on("finish", () => {
        fs.unlink(filePath, () => console.log("File deleted upon download"));
      });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong, please try again.",
    });
  }
};
