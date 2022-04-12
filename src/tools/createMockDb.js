/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { holdings, netWorth } = mockData;
const data = JSON.stringify({ holdings, netWorth });

/* The __dirname in a node script returns the path of the folder where the current JavaScript file resides. */
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
