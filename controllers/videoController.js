const ytdl = require("ytdl-core");
const { publishTaskToQueue } = require("../queue/producer");
const uuid = require("uuid");

module.exports.getVideo = async (req, res, next) => {
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
