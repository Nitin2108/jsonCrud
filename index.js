const express = require("express");
const user = require("./routers/user.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.status(200).send("Hello Nitesh");
});

app.use('/user',user);

app.listen(3000, () => console.log("listening on port 3000"));
