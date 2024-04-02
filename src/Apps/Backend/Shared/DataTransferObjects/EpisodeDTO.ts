import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class EpisodeDTO {
    @IsNumber()
    readonly id!: number;

    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly air_date?: Date;

    @IsOptional()
    @IsString()
    readonly episode?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly created?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly updated?: Date;

    constructor(partial: Partial<EpisodeDTO>) {
        Object.assign(this, partial);
    }
}
