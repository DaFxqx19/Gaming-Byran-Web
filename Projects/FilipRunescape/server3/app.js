const express = require("express");
const app = express();
const path = require("path");

let CartCache = [];
let CartPerma = [];

const port = 3000;

const searchItems = async searchTerm => {
    const cache1 = [];
    while (true) {
        const response = await fetch(
            `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha=${searchTerm}&page=1`
        );
        if (response.status === 200) {
            const data = response.json();
            cache1 += data;
        } else {
            return cache1;
        }
    }
};

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/about/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "views/item.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "views/cart.html"));
});

app.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname, "views/search.html"));
});

app.get("/api/search/item/:searchTerm/:page", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const page = req.params.page;
    console.log(searchTerm, page);
    fetch(
        `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha=${searchTerm}&page=${page}`
    )
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.post("/addcart/:id", (req, res) => {
    const addItem = req.params.id;
    const found = CartPerma.findIndex(item => item.id === addItem.id);
    if (found === -1) {
        CartPerma.push(addItem);
    }
    console.log(CartPerma);
    res.send(`item ${addItem.id} was added to the CartPerma`);
});

app.listen(port);
console.log("Server lystnar på port " + port);
