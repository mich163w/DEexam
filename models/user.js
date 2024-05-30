const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema (
    {
        name: { 
            type: String,
            require: true,
            min: 6,
            max: 100,
        },
        email: { 
            type: String,
            require: true,
            min: 6,
            max: 100,
        },
        password: { 
            type: String,
            require: true,
            min: 6,
            max: 100,
        },
       
        
    }
)

module.exports = mongoose.model("user", userSchema);