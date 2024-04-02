import { Filter, PageInfo } from '../../../Shared/generics';
import { default as Character } from '../../Models/character';

export interface CharacterContractRepository {
    get(page: number, filters: Filter[]): Promise<{ info: PageInfo, results: Character[] }>;
    findById(id: number): Promise<Character | null>;
    create(body: any): Promise<Character>;
    update(id: number, body: Partial<any>): Promise<Character>;
    createOrUpdate(id: number | null, body: Partial<any>): Promise<Character>;
    getUpdatedBeforeOneDay(): Promise<Character[]>;
}