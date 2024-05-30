const router = require("express").Router();
const car = require("../models/car");
const { verifyToken } = require("../validation");





// CRUD Operations

// Create product - post
router.post("/", /*verifyToken,*/ (req, res) => {

    // Body, parsed as json
    let data = req.body;

    // passed into insertMany function of mongoose and inserted into the database
    car.insertMany(data)

        // responds with the data
        .then(data => { res.status(201).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});


// Read all products - get
// Create product - post  "/" = /api/car/
router.get("/", (req, res) => {

    car.find()

        // responds with the data
        .then(data => { res.send(mapArray(data)); }) // array, ikke JSON
        .catch(err => { res.status(500).send({ message: err.message }); })

});











// Get random car
router.get("/random", (req, res) => {
    // Get number of all cars in collection
    car.countDocuments({})
        .then(count => {

            // Get a random car from the database
            let random = Math.floor(Math.random() * count);

            // Query all documents, but skip (fetch) only one with the offset of "random"
            car.findOne().skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                })
        })
});






router.get("/random/supercar/", (req, res) => {
    const carType = "Supercar"; // Definerer biltypen som "Supercar"

    // Tæller antallet af dokumenter i databasen, der har typen "Supercar"
    car.countDocuments({ type: carType })
        .then(count => {

            // Hvis der ikke findes nogen Supercars, sendes en fejlmeddelelse med statuskode 404
            if (count === 0) {
                return res.status(404).send({ message: "No supercar found" });
            }

            // Genererer et tilfældigt tal mellem 0 og antallet af Supercars
            let random = Math.floor(Math.random() * count);

            // Finder en tilfældig Supercar baseret på det tilfældige tal og sender den til klienten
            car.findOne({ type: carType }).skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    
                    // Hvis der opstår en fejl, sendes en fejlmeddelelse med statuskode 500
                    res.status(500).send({ message: err.message })
                });
        });
});




router.get("/random/suv/", (req, res) => {
    const carType = "SUV";

    car.countDocuments({ type: carType })
        .then(count => {
            if (count === 0) {
                return res.status(404).send({ message: "No SUV found" });
            }

            let random = Math.floor(Math.random() * count);

            car.findOne({ type: carType }).skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
        });
});



router.get("/random/hypercar/", (req, res) => {
    const carType = "Hypercar";

    car.countDocuments({ type: carType })
        .then(count => {
            if (count === 0) {
                return res.status(404).send({ message: "No hypercar found" });
            }

            let random = Math.floor(Math.random() * count);

            car.findOne({ type: carType }).skip(random)
                .then(data => { res.send(data) })
                .catch(err => {
                    res.status(500).send({ message: err.message })
                });
        });
});


// cars/type/           
router.get("/:id", (req, res) => {

    car.findById(req.params.id)

        // responds with the data
        .then(data => { res.send(mapData(data)); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});










// Update specific product - put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    car.findByIdAndUpdate(id, req.body)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update car by id=" + id + ". Maybe car was not found" })
            }
            else {
                res.send({ message: "Car was succesfully updated." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error updating car with id=" + id }); })
});




// Delete specific product - delete
router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    car.findByIdAndDelete(id)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete car by id=" + id + ". Maybe car was not found" })
            }
            else {
                res.send({ message: "Car was succesfully deleted." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error deleting car with id=" + id }); })
});


function mapData(element) {
    let outputObj = {

        // Do some validation here

        // ID: element.id,
        Brand: element.brand,
        Model: element.model,
        Year: element.year, // Hvis man vil have en fjernet, kan man bare kommentere den ud // Year: element.year --> Så forsvinder prisen 
        Price: element.price,
        Type: element.type,

        // add uri (HATEOAS) for this resource --> måske tilføj alt data herinde
        uri: "/api/car/" + element._id
    }
    return outputObj;
}


function mapArray(inputArray) {
    let outputArray = inputArray.map(element => (
        mapData(element)
    ))
    return outputArray;
}



module.exports = router;





