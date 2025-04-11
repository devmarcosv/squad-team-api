import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateTeamDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    memberIds: number[];
}
