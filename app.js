require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const logger = require("./middleware/logger");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// sesiuni
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(logger);

// home
app.get("/", (req, res) => {
    res.render("home", { user: req.session.user });
});

// rute
app.use("/", authRoutes);
app.use("/shop", shopRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server pornit pe port", PORT);
});
