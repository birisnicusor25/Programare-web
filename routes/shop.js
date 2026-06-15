const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const produse = require("../db/produse");

// pagina principală protejată
router.get("/", requireLogin, (req, res) => {

    if (!req.session.views) {
        req.session.views = 0;
    }

    req.session.views++;

    res.cookie("tema", "dark");

    res.render("shop/index", {
        user: req.session.user,
        produse,
        views: req.session.views,
        tema: req.cookies.tema
    });
});

// subrută
router.get("/:id", requireLogin, (req, res) => {
    const produs = produse.find(p => p.id == req.params.id);

    res.render("shop/detalii", { produs });
});

module.exports = router;