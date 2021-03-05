const Trip = require('./model');
const {
  Types: { ObjectId },
} = require('mongoose');

const resolvers = {
  Query: {
    async trips(parent, args, context, info) {
      try {
        const allTrips = await Trip.find();
        console.log(allTrips);
        return allTrips;
      } catch (error) {
        console.error(err);
      }
    },
  },
  Mutation: {
    async createTrip(parent, args, context, info) {
      try {
        const {
          input: { fromPlaceId, toPlaceId },
        } = args;
        const trip = await Trip.create({
          from: { name: fromPlaceId },
          to: { name: toPlaceId },
        });
        console.log('trip', trip);
        return trip;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

module.exports = resolvers;
