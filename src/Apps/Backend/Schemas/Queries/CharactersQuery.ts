import { GraphQLString, GraphQLInt } from 'graphql';

import { FilterDefinition } from '../../Shared/generics';
import { ResponseType } from '../Types/CharactersResponse';
import { FilterInputType } from '../Types/FilterInputType';
import { default as CharacterType } from '../Types/Character';
import { CharactersResolver } from '../Resolvers/CharactersResolver';

const filterDefinitions: Record<string, FilterDefinition> = {
  name: { type: GraphQLString, strategy: 'filter_substring_no_sensitive' },
  species: { type: GraphQLString, strategy: 'filter_substring_no_sensitive' },
  gender: { type: GraphQLString, strategy: 'filter_string_exact' },
  status: { type: GraphQLString, strategy: 'filter_string_exact' },
  origin: { type: GraphQLString, strategy: 'filter_substring_no_sensitive' },
};

const resolverInstance = new CharactersResolver(filterDefinitions);

const CharactersQuery = {
  name: 'characters',
  type: new ResponseType({name: 'CharactersResponse',resultType: CharacterType, isList: true}),
  args: {
    page: { type: GraphQLInt },
    filter: { type: new FilterInputType({ name: "CharacterFilterInput", definitions: filterDefinitions }) },
  },
  resolve: resolverInstance.resolve.bind(resolverInstance),
};

export default CharactersQuery;
