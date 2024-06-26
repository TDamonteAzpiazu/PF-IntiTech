import { IsOptional } from "class-validator";

export class CreatePanelDto {
    brand : string;
    model : string;
    price : number;
    description: string;
    size : string;
    @IsOptional()
    image?: string;
    dailyGeneration : number;
}