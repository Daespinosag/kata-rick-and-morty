import { GraphQLSchema } from 'graphql';

//import Mutation from './Mutation';
import Query from './Query';

export default new GraphQLSchema({
    //mutation: Mutation,
    query: Query,
});