
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const logger = require("./middleware/logger");
const authRoutes = require("./routes/auth");
const libraryRoutes = require("./routes/library");

const app = express();

// View engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parsing (form POST)
app.use(express.urlencoded({ extended: true }));

// Cookies (pentru cookie propriu)
app.use(cookieParser());

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
      // secure: true // activează doar pe https
    }
  })
);

// Middleware custom logger (cerință)
app.use(logger);

// Home public
app.get("/", (req, res) => {
  res.render("home", { user: req.session.user || null });
});

// Rute auth
app.use("/", authRoutes);

// Rute protejate domeniu
app.use("/library", libraryRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
});
