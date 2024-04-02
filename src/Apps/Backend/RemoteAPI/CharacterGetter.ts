import { PageInfo } from "../Shared/generics";
import { GraphQLClient } from "./GraphQLClient";
import { QueryFormatter } from "./QueryFormatter";
import { CharacterDTO, TRANSFORM_FROM_ARRAY_TO_DTO } from "../Shared/DataTransferObjects/Index";

class CharacterGetter {
    async count(filters: Record<string, string>  = {}): Promise<{ info: PageInfo }> {
        const queryFormatter = new QueryFormatter()
            .defineFunction('characters')
            .addArgs({ filter: filters })
            .addInfo(["count", "pages", "prev", "next"]);

        const client = new GraphQLClient();

        const result = await client.query(queryFormatter.build());

        return {
            info: result.data?.characters?.info as PageInfo
        };
    }

    async get(page: number = 1, filters: Record<string, string>  = {}): Promise<{ info: PageInfo, results: CharacterDTO[] }> {

        const queryFormatter = new QueryFormatter()
            .defineFunction('characters')
            .addArgs({ page: page, filter: filters })
            .addInfo(["count", "pages", "prev", "next"])
            .addResults([
                "id",
                "image",
                "name",
                "species",
                "status",
                "type",
                "gender",
                "created",
                { "origin": ["id", "name", "dimension", "type", "created"] },
                { "location": ["id", "name", "type", "dimension", "created"] },
                { "episode": ["id", "name", "air_date", "episode", "created"] },
            ]);

        const client = new GraphQLClient();

        const result = await client.query(queryFormatter.build());

        return {
            info: result.data.characters.info as PageInfo,
            results: TRANSFORM_FROM_ARRAY_TO_DTO(CharacterDTO, result.data.characters.results)
        };
    }

    async getByIds(ids: number[]): Promise<CharacterDTO[]> {

        const queryFormatter = new QueryFormatter()
            .defineFunction('charactersByIds')
            .addArgs({ ids: ids })
            .addResults([
                "id",
                "image",
                "name",
                "species",
                "status",
                "type",
                "gender",
                "created",
                { "origin": ["id", "name", "dimension", "type", "created"] },
                { "location": ["id", "name", "type", "dimension", "created"] },
                { "episode": ["id", "name", "air_date", "episode", "created"] },
            ]);

        const client = new GraphQLClient();

        const result = await client.query(queryFormatter.build());

        return TRANSFORM_FROM_ARRAY_TO_DTO(CharacterDTO, result.data.characters.results);
    }
}

export { CharacterGetter };