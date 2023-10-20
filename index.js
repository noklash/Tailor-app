import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose";

// import customers from "./_db.js"

import Tailor from "./models/dataModel.js";
import Customer from "./models/dataModel.js";

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
const resolvers = {
    Query: {
        customers: async (_, args) => {
            // if(args.id === Tailor.id){
                const tailor = Tailor.findById(args.id)
                try {
                    const customers = await tailor.find({});
                    return customers;
                } catch (error) {
                    throw new Error('Failed to fetch customers');
                }
        // }
            
        },
        items(){
            return collectItems(customers)
        }, 
        customer(_, args){
            if(args.id === Tailor.id){
                return Tailor.customers.find((cus) => cus.name === args.name)
            }
            // return Tailor.customers.find((cus) => cus.name === args.name)
            // to search customer by name
        }
    },

    Mutation: {
        async createCustomer (_, args){
            const newCustomer = new Customer({name: args.name, phone: args.phone })
            const findTailor = await Tailor.findByIdAndUpdate(args.id, { $push: {customers: newCustomer}})
            // .customers.push(newCustomer);
            console.log(`tailor is  ${findTailor}`)
            // const response = findTailor.
            return{
                id: newCustomer._id,
                // phone: newCustomer.phone,
                // customer: [...findTailor.customers ],
                ...newCustomer._doc
                
            }
            
            // const newCustomer = Tailor{
            //     name: args.name,
            //     phone: args.phone,
            //     id: args.id
            // });

            // const response = await newCustomer.save();
            // console.log(newCustomer);

            // return {
            //     id: response._id,
            //     ...response._doc
            // }
        },

        async createTailor (_, args){
            const newTailor = new Tailor({
                name: args.name 
                // email: email
            });

            const response = await newTailor.save();
            console.log(newTailor);

            return {
                id: response._id,
                ...response._doc
            }
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
console.log( await url)

console.log(`server is listening on port , ${port}`)

