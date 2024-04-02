
import { PageInfo } from '../Shared/generics';
import { CharacterGetter } from './CharacterGetter';
import { CharacterDTO } from '../Shared/DataTransferObjects/Index';

interface RemoteAPIContract {
    countCharacters(): Promise<{ info: PageInfo }>;
    getCharacters(page: number, filters: Record<string, string>): Promise<{ info: PageInfo, results: CharacterDTO[]}>;
}

class RemoteAPIRepository implements RemoteAPIContract {
    async countCharacters(filters: Record<string, string>  = {}): Promise<any> {
        return await (new CharacterGetter()).count(filters);
    }

    async getCharacters(page: number = 1, filters: Record<string, string>  = {}): Promise<{ info: PageInfo, results: CharacterDTO[]}> {
        return await (new CharacterGetter()).get(page, filters);
    }

    async getCharactersByIds(ids : number[]): Promise<CharacterDTO[]> {
        return await (new CharacterGetter).getByIds(ids);
    }
}

export { RemoteAPIRepository, RemoteAPIContract };
