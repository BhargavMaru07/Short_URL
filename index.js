const express = require("express");
const { connectMongoDB } = require("./connection");
const app = express();
const {router} = require("./routes/router")
const PORT = 3000;

//connection
connectMongoDB("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use("/url",router)

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
});
