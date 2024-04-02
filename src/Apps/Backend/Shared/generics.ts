import { GraphQLScalarType } from "graphql";

export type Status = {
    code: string;
    name: string;
}

export type Filter = {
    key: string;
    value: string;
    type: string;
};

export type FilterInput = {
    key: string;
    value: string;
};

export type PageInfo = {
    count: number;
    pages: number | null;
    prev: number | null;
    next: number | null;
};

export interface FilterDefinition {
    type: GraphQLScalarType; 
    strategy: string;
}