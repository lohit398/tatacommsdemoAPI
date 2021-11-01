const express = require("express");
var app = express();
const path = require("path");
const { Pool } = require("pg");
const PORT = process.env.PORT || 3000;
const connString =
  "postgres://vwxbvoyafuwseu:643837eb34c284d397f973a41cdbe28e22bad7fe44790362df061856771230a4@ec2-34-200-161-87.compute-1.amazonaws.com:5432/d1uv3ahvlqfsu1";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || connString,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.static(__dirname + '/')); 

pool.connect();

const query = `SELECT * from insights;`;
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Expose-Headers",
    "X-Api-Version, X-Request-Id, X-Response-Time"
  );
  res.setHeader("Access-Control-Max-Age", "1000");

  next();
});


app.get("/getrows", function (req, res) {
  pool.query(query).then((result) => {
    res.send(result.rows);
  });
});

app.get("/", function (req, res) {

});

app.listen(PORT, function () {
  console.log("Example app listening on port 3000!");
});
