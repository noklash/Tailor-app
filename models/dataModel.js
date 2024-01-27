// const {model, Schema} = require('mongoose');
import { model, Schema } from "mongoose";
// import mongoose from "mongoose";

const MeasurementSchema = new Schema({
    waist: Number,
    chest: Number,
    length: Number,
    sleeve: Number
});

export const Measurement = model('Measurement', MeasurementSchema);

const ContactSchema = new Schema({
    phone: Number,
    email: String,
    address: String
});

export const Contact = model('Contact', ContactSchema);


const ItemSchema = new Schema({
    // measurement: Measurement,
    measurement: {
        type: Schema.Types.ObjectId,
        ref: 'Measurement'
    },
    price: Number,
    description: String,
    materialSample: String,
    styleSample: String,
    review: String
});

export const Item = model('Item', ItemSchema);

const CustomerSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    measurement: {
        type: Schema.Types.ObjectId,
        ref: 'Measurement'
    }
});

export const Customer = model('Customer', CustomerSchema);

const TailorSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }],
    works: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

 const Tailor = model('Tailor', TailorSchema);

// model('Tailor', tailorSchema);

// module.exports = Tailor;
export default Tailor