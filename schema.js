export const typeDefs = `#graphql
    type MeasurementInput{
        waist: Int
        chest: Int
        length: Int
        sleeve: Int
    }
    type Measurement {
        id: ID
        waist: Int
        chest: Int
        length: Int
        sleeve: Int
    }
    # type Name {
    #     name: String!
    # }
    # type Contact {
    #     phone: Int
    #     email: String
    #     address: String
    # }

    type ItemInput {
        measurement: Measurement
        price: Int
        description: String
        materialSample: String
        styleSample: String
        review: String
    }

    type Item {
        id: ID!
        measurement: Measurement
        price: Int
        description: String
        materialSample: String
        styleSample: String
        review: String
    }

    type CustomerInput{
        name: String!
        phone: Int
        email: String
        address: String
        items: [Item]
        measurement: Measurement
    }

    type Customer {
        id: ID!
        name: String!
        phone: Int
        email: String
        address: String
        items: [Item]
        measurement: Measurement
    }

   
    type TailorInput {
        name: String!
        phone: Int
        email: String
        address: String
        customers: [Customer]
        works: [Item]
    }

    type Tailor {
        id: ID
        name: String!
        phone: Int
        email: String
        address: String
        customers: [Customer]
        works: [Item]
    }

    type Query {
        customers(id: ID!): [Customer]
        customer(name: String!, id: ID!): Customer
        items: [Item]
    }
    type Mutation {
        createCustomer(name: String!, phone: Int, id: ID! ): Customer
        createItem(description: String!): Item
        createTailor(name: String!): Tailor
        updateCustomer(id: ID, name: String): Boolean
        updateItem(id: ID, description: String): Boolean
        deleteCustomer(id: ID): Boolean
        deleteItem(id: ID): Boolean 
        deleteTailor(id: ID): Boolean   
        }
`