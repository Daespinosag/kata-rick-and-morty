import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLObjectTypeConfig,
    GraphQLFieldConfigMap,
    GraphQLResolveInfo,
} from 'graphql';
import PageInfoType from './PageInfo';

interface ResponseTypeConfig extends Omit<GraphQLObjectTypeConfig<any, any>, 'fields'> {
    resultType  : GraphQLObjectType<any, any>;
    isList?     : boolean;
    infoType?   : GraphQLObjectType<any, any>;
}

class ResponseType extends GraphQLObjectType {
    constructor(config: ResponseTypeConfig) {
        const { resultType, infoType = PageInfoType, isList = false } = config;

        const fields: GraphQLFieldConfigMap<any, any> = {
            info: { 
                type: infoType,
                resolve: (parent: any) => {
                return parent.info ? parent.info : null;
                }
            },
            
            results: { 
                type: isList ? new GraphQLList(resultType) : resultType,
                resolve: (parent: any, args: any, context: any, info: GraphQLResolveInfo) => {
                    return parent.results;
                }
            },
        };

        super({...config, fields: () => fields});
    }
}

export { ResponseType, ResponseTypeConfig };