const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello Marvel api !!!" });
});

// ----------------------------------------------------------
// ROUTES COMICS
// ----------------------------------------------------------

// Get a list of comics
app.get("/comics", async (req, res) => {
  try {
    // Filters
    const title = req.query.title || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
    );

    const comics = response.data;

    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ----------------------------------------------------------
// Get a list of comics containing a specific character
app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    const comicsOfCharacter = response.data;

    res.status(200).json(comicsOfCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ----------------------------------------------------------
// ROUTES CHARACTERS
// ----------------------------------------------------------
app.get("/characters", async (req, res) => {
  try {
    // Filters
    let name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    // Get a list of characters
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );

    const characters = response.data;

    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

// Démarrer le serveur :
app.listen(process.env.PORT, () => {
  console.log("Server has started on port 3000");
});
// Remarquez que le `app.listen` doit se trouver après les déclarations des routes
