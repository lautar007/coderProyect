// app.js
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();
const PORT = 8080;

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, "public"))
//Array de usuarios

app.get("/", (req, res) => {
    let testUser = {
        nombre: "Coder",
        apellido: "House"
    }
    res.render("index", testUser)
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});