import { Repository } from './Repository';
import { Filter, PageInfo } from '../../Shared/generics';
import { PlaceDTO, TRANSFORM_FROM_ARRAY_TO_DTO, TRANSFORM_FROM_TO_DTO } from '../../Shared/DataTransferObjects/Index';
import Place from '../Models/place';
import { PaginationStrategy } from './Strategies/PaginationStrategy';
import { StringFilterStrategy } from './Strategies/FilterStrategy';


export interface PlaceContractRepository {
    get(page: number, filters: Filter[]): Promise<{ info: PageInfo, results: PlaceDTO[] }>;
    findById(id: number): Promise<PlaceDTO | null>;
    create(body: PlaceDTO): Promise<PlaceDTO>;
    update(id: number, body: PlaceDTO): Promise<PlaceDTO>;
    createOrUpdate(id: number | null, body: PlaceDTO): Promise<PlaceDTO>;
}

export class PlaceRepository extends Repository implements PlaceContractRepository {
    public async get(page: number = 0, filters: Filter[] = []): Promise<{ info: PageInfo, results: PlaceDTO[] }> {
        const data =  await this.paginateAndFilter(Place, page, filters, {
            pagination: new PaginationStrategy(),
            filter: new StringFilterStrategy(),
        });

        return {
            info: data.info,
            results: TRANSFORM_FROM_ARRAY_TO_DTO(PlaceDTO,data.results)
        }
    }

    public async findById(id: number): Promise<PlaceDTO | null> {
        const place = await Place.findByPk(id);
        return place ? TRANSFORM_FROM_TO_DTO(PlaceDTO, place.toJSON()) : null;
    }

    public async create(body: PlaceDTO): Promise<PlaceDTO> {
        const newPlaceData = {
            id          : body.id,
            name        : body.name,
            dimension   : body.dimension,
            type        : body.type,
            created     : body.created || new Date(),
            updated     : body.updated || new Date(),
        };

        const place = await Place.create(newPlaceData);

        return TRANSFORM_FROM_TO_DTO(PlaceDTO, place.toJSON());
    }

    public async update(id: number, body: PlaceDTO): Promise<PlaceDTO> {
        let place = await Place.findByPk(id);

        if (!place) {
            throw new Error('Place not found');
        }

        const updatedPlaceData = {
            name        : body.name,
            dimension   : body.dimension,
            type        : body.type,
            updated     : new Date(),
        };

        place = await place.update(updatedPlaceData);

        return TRANSFORM_FROM_TO_DTO(PlaceDTO, place.toJSON());
    }

    public async createOrUpdate(id: number | null, body: PlaceDTO): Promise<PlaceDTO> {
        if (id !== null) {
            const place = await Place.findByPk(id);

            if (place) {
                return  await this.update(id, body);
            }
        }
        
        
        return await this.create(body);
    }
}
