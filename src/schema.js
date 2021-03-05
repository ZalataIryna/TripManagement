const { gql } = require('apollo-server');

const typeDefs = gql`
  "Query to get trips array"
  type Query {
    trips(offset: Int, limit: Int): [Trip!]!
  }
  "Mutation creates a trip"
  type Mutation {
    createTrip(input: CreateTripInput!): Trip
  }
  "Trip from one place to another"
  type Trip {
    _id: ID! # format "urn::trip:<mongo object id>"
    from: Location!
    to: Location!
  }

  "Location of particular place"
  type Location {
    name: String!
  }

  input CreateTripInput {
    fromPlaceId: String! # https://developers.google.com/places/web-service/place-id
    toPlaceId: String!
  }
`;

module.exports = typeDefs;
