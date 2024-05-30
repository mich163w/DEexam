const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

require("dotenv-flow").config();

const app = express();

// CORS configuration
app.use(cors({
    origin: "*"
}));

// Parse request of content-type JSON
app.use(bodyParser.json());

mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB: " + error));
mongoose.connection.once("open", () => console.log("Successfully connected to MongoDB"));

// Load and modify Swagger document
const swaggerFilePath = path.join(__dirname, 'swagger.yaml');
let swaggerDocument = yaml.load(swaggerFilePath);
swaggerDocument.servers[0].url = process.env.APPLICATION_URL || 'http://localhost:6000/api/';

// Serve Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routes
const productRoutes = require("./routes/car");
const authRoutes = require("./routes/auth");

// Routes
app.get("/api/welcome", (req, res) => {
    res.status(200).send({ message: "Welcome to the MEN RESTful API" });
});

app.use("/api/car", productRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

module.exports = app;