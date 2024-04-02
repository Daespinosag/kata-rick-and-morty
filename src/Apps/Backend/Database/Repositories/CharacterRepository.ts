import { Repository } from './Repository';
import { Filter, PageInfo } from '../../Shared/generics';
import { default as Character} from '../Models/character';
import { StringFilterStrategy } from './Strategies/FilterStrategy';
import { PaginationStrategy } from './Strategies/PaginationStrategy';
import { CharacterContractRepository } from './contracts/CharacterContractRepository';
import { Op } from 'sequelize';

export class CharacterRepository extends Repository implements CharacterContractRepository {
    public async get(page: number = 0, filters: Filter[] = []): Promise<{ info: PageInfo, results: Character[] }> {
        return this.paginateAndFilter(Character, page, filters, {
            pagination: new PaginationStrategy(),
            filter: new StringFilterStrategy(),
        });
    }

    public async findById(id: number): Promise<Character | null> {
        return await Character.findByPk(id);
    }

    public async create(body: any): Promise<Character> {
        const newCharacterData = {
            id: parseInt(body.id),
            location_id: body.location?.id ? parseInt(body.location.id) : null,
            origin_id: body.origin?.id ? parseInt(body.origin.id) : null,
            name: body.name,
            status: body.status,
            species: body.species,
            type: body.type,
            gender: body.gender,
            image: body.image,
            created: body.created ? new Date(body.created) : new Date(),
            updated: new Date()
        };

        const character = await Character.create(newCharacterData);

        if (character){
            return character;
        }

        throw new Error('Character not found');
    }

    public async update(id: number, body: Partial<any>): Promise<Character> {
        const character = await Character.findByPk(id);
        
        if (!character) {
            throw new Error('Character not found');
        }

        const updatedCharacterData = {
            id: body.id,
            name: body.name,
            status: body.status,
            species: body.species,
            type: body.type,
            image: body.image,
            gender: body.gender,
            location_id: body.location_id,
            origin_id: body.origin_id,
            updated: new Date()
        };

        const updatedCharacter = await character.update(updatedCharacterData);

        if (updatedCharacter){
            return updatedCharacter;
        }

        throw new Error('Character not found');
    }

    public async createOrUpdate(id: number | null, body: Partial<any>): Promise<Character> {
        if (id !== null) {
            let character = await this.findById(id);

            if (character) {
                return await character.update(id, body);
            }
        }

        return await this.create(body);
    }

    public async getUpdatedBeforeOneDay(): Promise<Character[]> {
        const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

        const characters = await Character.findAll({
            where: {
                updated: {
                    [Op.lt]: oneDayAgo,
                },
            },
        });

        return characters;
    }
}
