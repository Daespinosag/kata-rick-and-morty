import { GraphQLObjectType } from 'graphql';
import StatusQuery from './Queries/StatusQuery';
import CharactersQuery from './Queries/CharactersQuery';

export default new GraphQLObjectType({
    name: 'Query',
    fields: (): any => ({
        status : StatusQuery,
        characters: CharactersQuery
    }),
});