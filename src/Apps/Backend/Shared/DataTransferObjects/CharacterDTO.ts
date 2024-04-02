import { Type } from 'class-transformer';

import {
    IsInt,
    IsOptional,
    IsString,
    Min,
    IsDate,
    ValidateNested,
} from 'class-validator';
import { PlaceDTO } from './PlaceDTO';

export class CharacterDTO {
    @IsInt()
    @Min(0)
    readonly id!: number;

    @IsInt()
    @Min(0)
    readonly location_id?: number;

    @IsInt()
    @Min(0)
    readonly origin_id?: number;

    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly status?: string;

    @IsOptional()
    @IsString()
    readonly species?: string;

    @IsOptional()
    @IsString()
    readonly type?: string;

    @IsOptional()
    @IsString()
    readonly image?: string;

    @IsOptional()
    @IsString()
    readonly gender?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly created?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly updated?: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => PlaceDTO)
    readonly location?: PlaceDTO;

    @IsOptional()
    @ValidateNested()
    @Type(() => PlaceDTO)
    readonly origin?: PlaceDTO;
}