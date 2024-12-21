const URL = require("../models/url");
const shortid = require("shortid");

async function handleUrlShort(req, res) {
  let body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  let shortID = shortid();

  let result = await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  console.log(result);
  res.json({ ID: shortID });
}

async function handleRequest(req, res) {
  let shortID = req.params.shortID;

  let entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}


async function handleGetAnalytic(req,res){
  let shortID = req.params.shortID
  let result = await URL.findOne({shortID})
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics:result.visitHistory
  })
}

module.exports = {
  handleUrlShort,
  handleRequest,
  handleGetAnalytic,
};
