import { plainToInstance } from 'class-transformer';

import { CharacterDTO  } from './CharacterDTO';
import { PlaceDTO } from './PlaceDTO';
import { EpisodeDTO } from './EpisodeDTO';

export function TRANSFORM_FROM_TO_DTO<T, V>(dtoClass: new () => T, plainObject: V): T {
    return plainToInstance(dtoClass, plainObject);
}

export function TRANSFORM_FROM_ARRAY_TO_DTO<T, V>(dtoClass: new () => T, plainArray: V[]): T[] {
    return plainArray.map(obj => TRANSFORM_FROM_TO_DTO(dtoClass, obj));
}


export { CharacterDTO, PlaceDTO, EpisodeDTO}
