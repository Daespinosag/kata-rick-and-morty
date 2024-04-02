import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

const Character = new GraphQLObjectType({
    name: 'Character',
    description: 'Represents a character from the universe.',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        species: { type: GraphQLString },
        type: { type: GraphQLString },
        gender: { type: GraphQLString },
        image: { type: GraphQLString }
    })
});

export default Character;
