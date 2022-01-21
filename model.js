const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require('validator');

const AgencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: [isMobilePhone, "Invalid Phone"]
    }
},
{
    collection: 'agency'
});

const ClientSchema = new mongoose.Schema({
    agency_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email']
    },
    phone_number: {
        type: String,
        required: true,
        validate: [isMobilePhone, 'Invalid Phone Number']
    },
    total_bill: {
        type: Number,
        required: true
    }
},
{
    collection: 'client'
});

var Agency = mongoose.model("Agency", AgencySchema);
var Client = mongoose.model("Client", ClientSchema);


module.exports = {
    Agency,
    Client
};
