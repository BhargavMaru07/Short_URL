const express = require("express");
const path = require("path");
const cookiesParser = require("cookie-parser")
const {checkForAuthentication, restrictTo } = require("./middlewares/auth");
const { connectMongoDB } = require("./connection");
const app = express();
const { router } = require("./routes/router");
const staticRouter = require("./routes/staticRouter")
const userRouter = require("./routes/userRouter")
const PORT = 3000;

//we need to specifies that , we use ejs as our view engine and and all ejs file are stored in views folder.....
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//connection
connectMongoDB("mongodb://127.0.0.1:27017/short-url");

app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(checkForAuthentication)


app.use("/url",restrictTo(["NORMAL","ADMIN"]), router);
app.use("/user",userRouter)
app.use("/",staticRouter)

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
});
