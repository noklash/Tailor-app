import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

import customers from "./_db.js"

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
        customers(){
            return customers
        },
        items(){
            return collectItems(customers)
        }, 
        customer(_, args){
            return customers.find(cus => cus.name === args.name)
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

const port = 4000
const { url } = await startStandaloneServer(server, {
    listen: { port: port }
})

console.log(`server is listening on port , ${port}`)