import {
    GraphQLObjectType,
    GraphQLInt,
} from 'graphql';

const PageInfoType = new GraphQLObjectType({
    name: 'PageInfo',
    fields: () => ({
        count: { type: GraphQLInt },
        pages: { type: GraphQLInt },
        prev: { type: GraphQLInt, resolve: (parent) => parent.prev || null },
        next: { type: GraphQLInt, resolve: (parent) => parent.next || null },
    }),
});

export default PageInfoType;