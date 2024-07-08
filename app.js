const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

const DB_FILE = "./real_estate.db";

// Check if database file exists
const dbExists = fs.existsSync(DB_FILE);

// Database setup
const db = new sqlite3.Database(DB_FILE);

// Create the properties table if the database is new
if (!dbExists) {
  db.serialize(() => {
    db.run(
      `CREATE TABLE properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address TEXT,
            houseName TEXT,
            rooms INTEGER,
            bathrooms INTEGER,
            squareFeet REAL,
            price TEXT,
            customerImage TEXT,
            images TEXT,
            landKunte TEXT,
            propertyType TEXT,
            buildingType TEXT
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Properties table created successfully.");
        }
      }
    );
  });
}

// Routes

// 1. Listing All Properties
app.get("/properties", (req, res) => {
  db.all("SELECT * FROM properties", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Parse images JSON string into an array
    const properties = rows.map((row) => ({
      ...row,
      images: JSON.parse(row.images),
    }));

    res.json({ properties });
  });
});

// 2. Creating New Property
app.post("/properties", (req, res) => {
  const {
    address,
    houseName,
    rooms,
    bathrooms,
    squareFeet,
    price,
    customerImage,
    images,
    landKunte,
    propertyType,
    buildingType,
  } = req.body;
  const imagesString = JSON.stringify(images); // Convert images array to JSON string

  db.run(
    `INSERT INTO properties (address, houseName, rooms, bathrooms, squareFeet, price, customerImage, images, landKunte, propertyType, buildingType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      address,
      houseName,
      rooms,
      bathrooms,
      squareFeet,
      price,
      customerImage,
      imagesString,
      landKunte,
      propertyType,
      buildingType,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.json({
        success: true,
        message: "Property created successfully",
        data: {
          id: this.lastID,
          address,
          houseName,
          rooms,
          bathrooms,
          squareFeet,
          price,
          customerImage,
          images,
          landKunte,
          propertyType,
          buildingType,
        },
      });
    }
  );
});

// 3. Updating Property
app.put("/properties/:id", (req, res) => {
  const { id } = req.params;
  const {
    address,
    houseName,
    rooms,
    bathrooms,
    squareFeet,
    price,
    customerImage,
    images,
    landKunte,
    propertyType,
    buildingType,
  } = req.body;
  const imagesString = JSON.stringify(images); // Convert images array to JSON string

  db.run(
    `UPDATE properties SET address = ?, houseName = ?, rooms = ?, bathrooms = ?, squareFeet = ?, price = ?, customerImage = ?, images = ?, landKunte = ?, propertyType = ?, buildingType = ? WHERE id = ?`,
    [
      address,
      houseName,
      rooms,
      bathrooms,
      squareFeet,
      price,
      customerImage,
      imagesString,
      landKunte,
      propertyType,
      buildingType,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }
      res.json({ success: true, message: "Property updated successfully" });
    }
  );
});

// 4. Deleting Property
app.delete("/properties/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM properties WHERE id = ?`, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    res.json({ success: true, message: "Property deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
