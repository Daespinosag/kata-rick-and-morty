import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const status = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        code: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Determina el codigo',
            resolve: (obj: any): string => {
                return obj.code;
            },
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Determina si el servicio grapql esta funcionado adecuadamente',
            resolve: (obj: any): string => {
                return obj.name;
            },
        },
        timesmap: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Fecha actual en formato ISO string',
            resolve: (obj: any): string => {
                return obj.timesmap.toISOString(); 
            },
        },
    }),
});

export default status;