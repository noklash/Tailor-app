export const typeDefs = `#graphql
    type Measurement {
        id: ID!
        waist: Int
        chest: Int
        length: Int
        sleeve: Int
    }
    type Name {
        name: String!
    }
    type Contact {
        phone: Int
        email: String
        address: String
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

    type Customer {
        id: ID!
        name: Name!
        contact: Contact
        items: [Item]
        measurement: Measurement
    }

   

    type Tailor {
        id: ID!
        name: String!
        contact: Contact
        customers: [Customer]
        works: [Item]
    }

    type Query {
        customers: [Customer]
        customer(name: String!): Customer
        items: [Item]
    }
`