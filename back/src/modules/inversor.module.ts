import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inversor } from "src/entities/inversor.entity";
import { InversorRepository } from "src/repositories/inversor.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Inversor])],
    providers: [InversorRepository],
    
})

export class inversorModule {}