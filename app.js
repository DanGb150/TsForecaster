const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const path = require("path");
let likelihood = "...";
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));

//DATABASE COLLECTION IS CHANGEABLE WITH SEASON
mongoose
  .connect("mongodb://localhost:27017/NWP", {
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
const nwp = mongoose.model("nwp", nwpSchema);

app.listen(port, () => {
  console.log(`Listening on port ${3000}`);
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
  const obj = await nwp.find({});
  res.render("modeldata.ejs", { obj });
});
app.post("/data", async (req, res) => {
  await nwp.deleteMany({});
  let nums = Object.keys(req.body);
  let values = Object.values(req.body);
  const newdata = new nwp({ num: [nums], data: [values] });
  await newdata.save();
  res.redirect("/data");
});
