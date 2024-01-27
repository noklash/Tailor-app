import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose";

// import customers from "./_db.js"

import Tailor from "./models/dataModel.js";
import Customer from "./models/dataModel.js";
import Item from "./models/dataModel.js";
import Measurement from "./models/dataModel.js";

// const Tailor = require("./models/dataModel.js")

// import types
import { typeDefs } from "./schema.js";

function collectItems(cus) {
    const itemsArr = [];

    for (const customer of cus) {
        if (customer.items){
            itemsArr.push(...customer.items);
        }
    }
    return itemsArr
}


async function createCustomer(input) {
    try {
        // Create a new Contact document from the input
        const contact = new Contact(input.contact);
        await contact.save();

        // Create a new Measurement document from the input
        const measurement = new Measurement(input.measurement);
        await measurement.save();

        // Create a new Customer document using the input data
        const customer = new Customer({
            name: input.name,
            contact: contact._id, // Reference to the Contact document
            measurement: measurement._id, // Reference to the Measurement document
        });

        // Save the new Customer document
        await customer.save();

        return customer; // Return the newly created Customer document
    } catch (error) {
        throw new Error(`Failed to create customer: ${error.message}`);
    }
}
const resolvers = {
    Query: {
        // customers: async (_, args) => {
        //     // if(Tailor.findById(args.id)){
        //         const tailor = await Tailor.findById(args.id)
        //         console.log(tailor.customers.name)
        //         // return Tailor
        //         try {
        //             // const customerss = await Customer.find({});
        //             // console.log(customerss)
        //             return tailor.customers.name ;
        //         } catch (error) {
        //             throw new Error('Failed to fetch customers');
        //         }
        // // }
            
        // },
        // items(){
        //     return collectItems(customers)
        // }, 

// MY OWN ABOVE

        customers: async (parent, args) => {
            if (args.id){
                const cus = await Customer.find({ _id: args.id })
                console.log(cus)
                return cus
            }
            return Customer.find({});
        },



        customer: async(parent, args) => {
            // if(args.id === Tailor.id){
                // const tailor =  await Tailor.find({parent: args.id})
                // // const res = await tailor.customers
                // console.log(tailor)
                // const res = await tailor.customers.find(args.cus)
                // // console.log(res)
                // return res
                // STOP
                if (args.id){
                    return Customer.findById(args.id);
                }
                if(args.name){
                    return Customer.findOne({name: args.name });
                }
                return null 
            // }
            // return tailor.customers.find((cus) => cus.name === args.name)
            // to search customer by name
        }
    },

    Mutation: {
        async createCustomer (_, args){
            const newCustomer = new Customer({name: args.name, phone: args.phone });
            await newCustomer.save()
            const findTailor = await Tailor.findByIdAndUpdate(args.id, { $push: {customers: newCustomer}})
            // await findTailor.save()
            // .customers.push(newCustomer);
            console.log(`tailor is  ${findTailor}`)
            // const response = findTailor.
            return{
                id: newCustomer._id,
                // phone: newCustomer.phone,
                // customer: [...findTailor.customers ],
                ...newCustomer._doc
                
            }
        },
     
// stat
        // async createTailor (_, args){
        //     const newTailor = new Tailor({
        //         name: args.name 
        //         // email: email
        //     });

        //     const response = await newTailor.save();
        //     console.log(newTailor);

        //     return {
        //         id: response._id,
        //         ...response._doc
        //     }
        // },
// stop

createTailor: async (parent, args) => {
    const tailor = new Tailor(args)
    return tailor.save();
}

    }
}
// server set up
const server = new ApolloServer({
//  two objects of the appollo server are typeDefs and resolver functions
// typeDefs
typeDefs,
// resolvers
resolvers
})

const MONGO_URI = "mongodb+srv://mcvianycodes:8mdHdO9UVzrPqbKJ@cluster0.4icnb88.mongodb.net/?retryWrites=true&w=majority"
const port = 4000


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Db Connected`);
  }).catch(err => {
        console.log(err.message);
      });


const { url } = await startStandaloneServer(server, {
    listen: { port: port }
})
// console.log( await url)

console.log(`server is listening on port , ${port}`)

