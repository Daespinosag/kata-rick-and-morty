import {
    GraphQLInputObjectType,
    GraphQLInputFieldConfigMap,
} from 'graphql';

import { FilterDefinition } from '../../Shared/generics'; 

interface FilterInputTypeConfig {
    name: string; 
    definitions: Record<string, FilterDefinition>;
}

class FilterInputType extends GraphQLInputObjectType {
    constructor(config: FilterInputTypeConfig) {
        const { name, definitions } = config;

        const fields = Object.keys(definitions).reduce<GraphQLInputFieldConfigMap>((acc, key) => {
            const { type } = definitions[key];
            acc[key] = { type };
            return acc;
        }, {});

        super({
            name,
            fields: () => fields,
        });
    }
}

export { FilterInputType, FilterInputTypeConfig }
