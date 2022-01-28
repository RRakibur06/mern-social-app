const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const PostRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messages");
const port = process.env.port || 8800;
const path = require("path");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useUnifiedTopology: true }).catch((e) => {
    console.log(e);
  });
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", PostRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("client/build"));
//   app.get('*', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }


app.listen(port, ()=>{
    console.log("Server is running!");
})

