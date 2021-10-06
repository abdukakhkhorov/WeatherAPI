const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3010;

const publicStaticDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../template.partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));

app.get("", (req, res) => {
  res.send("Hi this is weather app");
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must enter address in search text box",
    });
  }
  weatherData(address, (error, { temperature, description, cityName }) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    console.log(temperature, description, cityName);
    res.send({
      temperature,
      description,
      cityName,
    });
  });
});

app.get("*", (req, res) => {
  res.send("Page not found."); //agar urlga boshqa soz yozilsa ishliydi!
});

app.listen(port, () => {
  console.log(`Server working on port ${port}...`);
});
