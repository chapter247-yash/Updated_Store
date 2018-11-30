const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 8001;
const server = http.createServer(app);
server.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// Get unhappy points
function getUnhappyPoints(
  totalSpace,
  totalUsers,
  column,
  maxUnhappy,
  sittingIndex,
  totalUnhappy = 0
) 
{
  for (var i = 0; i < totalSpace; i++)
  {
    var isFirst = i % column == 0;
    console.log = isFirst;
    let isLast = i % column == column - 1;
    let isRightBlocked = sittingIndex.indexOf(parseInt(i) + 1) > -1;
    let isLeftBlocked = sittingIndex.indexOf(i - 1) > -1;
    let isTopBlocked = sittingIndex.indexOf(i - column) > -1;
    let isBottomBlocked =
      sittingIndex.indexOf(parseInt(i) + parseInt(column)) > -1;
    if (isFirst) {
      isLeftBlocked = false;
    }
    if (isLast) {
      isRightBlocked = false;
    }
    let left = isLeftBlocked ? 1 : 0;
    let right = isRightBlocked ? 1 : 0;
    let top = isTopBlocked ? 1 : 0;
    let bottom = isBottomBlocked ? 1 : 0;
    let total = left + right + top + bottom;
    if (total == maxUnhappy && sittingIndex.indexOf(i) == -1) {
      sittingIndex.push(i);
      totalUnhappy = totalUnhappy + total;
    }
    if (sittingIndex.length >= totalUsers) {
      return { totalUnhappy, sittingIndex };
    }
  }
  if (sittingIndex.length < totalUsers) {
    return getUnhappyPoints(
      totalSpace,
      totalUsers,
      column,
      ++maxUnhappy,
      sittingIndex,
      totalUnhappy
    );
  }
  return { totalUnhappy, sittingIndex };
}
  
// View js
app.set("view engine", "ejs");
app.get("/", function(req, res) {
  let structure = {};
  const $data = req.query;
  var row = $data.row;
  var column = $data.column;
  var person = $data.person;
  if (row && column && person) {
    var totalSpace = row * column;
    var sittingIndex = [];
    structure = getUnhappyPoints(totalSpace, person, column, 0, sittingIndex);
  }
  res.render("puzzle", { structure: structure, query: $data });
});

module.exports = {
  server,
  getUnhappyPoints
};
