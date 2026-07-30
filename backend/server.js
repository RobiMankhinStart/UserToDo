console.log("robi");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dns = require("dns");
const dbConfig = require("./dbConfig");
const route = require("./router");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(cors());
dbConfig();
app.use(express.json());
app.use(route);

app.listen(8000, () => {
  console.log("server running on port 8000");
});
