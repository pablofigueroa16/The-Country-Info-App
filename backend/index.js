require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3001" }));

app.get("/", (req, res) => {
  res.send("API Backend running");
});

app.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching countries");
  }
});

app.get("/country/:code", async (req, res) => {
  const countryCode = req.params.code.toUpperCase();

  try {
    const [countryInfo, populationData, flagInfo] = await Promise.all([
      axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`),
      axios.get(`https://countriesnow.space/api/v0.1/countries/population`),
      axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`),
    ]);

    const countryName = countryInfo.data.commonName || "Unknown";

    const countryPopulation = populationData.data.data.find(
      (country) =>
        country.iso3 === countryInfo.data.cca3 ||
        country.iso2 === countryCode ||
        country.country.toLowerCase() ===
          countryInfo.data.commonName.toLowerCase()
    );

    const populationCounts = countryPopulation
      ? countryPopulation.populationCounts
      : "No population data available";

    const flagData = flagInfo.data.data.find(
      (country) =>
        country.iso2 === countryCode || country.iso3 === countryInfo.data.cca3
    );

    const flagUrl = flagData
      ? flagData.flag
      : "https://w7.pngwing.com/pngs/395/684/png-transparent-computer-icons-flag-flag-miscellaneous-angle-flag-thumbnail.png";

    res.json({
      name: countryName,
      borderCountries: countryInfo.data.borders || [],
      populationData: populationCounts,
      flagUrl: flagUrl,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error fetching country info");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
