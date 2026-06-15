const express = require("express");
const router = express.Router();
const usersDB = require("../db/users");

// register
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const { email, password } = req.body;

    usersDB.addUser({ email, password });

    req.session.user = { email };

    res.redirect("/shop");
});

// login
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = usersDB.findUser(email);

    if (!user || user.password !== password) {
        return res.send("Login greșit");
    }

    req.session.user = { email };

    res.redirect("/shop");
});

// logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;