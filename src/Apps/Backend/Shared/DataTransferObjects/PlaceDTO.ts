import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class PlaceDTO {
    @IsNumber()
    readonly id!: number;

    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly dimension?: string;

    @IsString()
    readonly type!: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date) 
    readonly created?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date) 
    readonly updated?: Date;
}
