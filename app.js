const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
let likelihood = "...";
const methodOverride = require("method-override");
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE COLLECTION IS CHANGEABLE WITH SEASON
mongoose
  .connect("mongodb://localhost:27017/NWP-WINTER", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO Connection Open!"))
  .catch((err) => {
    console.log("MONGO ERROR!");
    console.log(err);
  });
//----------------

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const nwpSchema = new mongoose.Schema({
  num: {
    type: [],
  },
  data: {
    type: [],
  },
});

//DATABASE COLLECTION IS CHANGEABLE WITH SEASON
const nwp = mongoose.model("nwp-winter", nwpSchema);
//----------------

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.post("/", (req, res) => {
  let likar = req.body;
  if (likar.trf === "Hail possible") {
    likelihood = "LIKELY";
  } else if (likar.trf === "Hail not possible") {
    likelihood = "NOT LIKELY";
  }
  res.redirect("/");
});
app.get("/", (req, res) => {
  res.render("home.ejs", { likelihood });
});
app.get("/hail", (req, res) => res.render("hail.ejs"));

app.get("/data", async (req, res) => {
  const obj = await nwp.findOne();
  res.render("modeldata.ejs", { obj });
});

app.post("/data", async (req, res) => {
  await nwp.deleteMany({});
  let values = Object.values(req.body);
  let nums = Object.keys(req.body);
  const newdata = new nwp({ num: nums, data: values });
  await newdata.save();
  res.redirect("/data");
});
