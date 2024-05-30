const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
// const { verifyToken } = require("./validation"); --> har ikke lyst til det er på alle og så tilføj linje 55 i stedet for 54

// swagger dependencies
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

// setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// import routes
const productRoutes = require("./routes/car");
const authRoutes = require("./routes/auth");

// CORS npm package
const cors = require("cors");

app.use(cors({
    "origin": "*"
}));

require("dotenv-flow").config();


// parse request of content-type JSON
app.use(bodyParser.json());







mongoose.set('strictQuery', false);
mongoose.connect
 (
    process.env.DBHOST,
    {
        useUnifiedTopology:true,
        useNewUrlParser: true
    }

).catch(error => console.log("Error connecting to MongoDB:" + error));
mongoose.connection.once("open", () => console.log("Succesfully connected to MongoDB"));











// route
app.get("/api/welcome", (req, res) => {

    res.status(200).send({message: "Welcome to the MEN RESTful API"});
})


// post, put, delete - CRUD
app.use("/api/car", productRoutes);
// app.use("/api/car", verifyToken, productRoutes); --> Hvis jeg vil have man skal bruge auth-token på alle
app.use("/api/user", authRoutes);




const PORT = process.env.PORT || 4000;
// Start up server
app.listen(PORT, async(req, res) => {
    console.log("Server is running on port: " + PORT);
})

module.exports = app;

