import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Stats} from "src/entities/stats.entity";
import { OperatingPanelsController } from "src/controllers/operatingPanels.controller";
import { OperatingPanels } from "src/entities/operatingPanels.entity";
import { OperatingPanelsRepository } from "src/repositories/operatingPanels.repository";
import { OperatingPanelsService } from "src/services/operatingPanels.service";
import { Inversor } from "src/entities/inversor.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OperatingPanels , Stats , Inversor])],
    controllers: [OperatingPanelsController],
    providers : [OperatingPanelsService , OperatingPanelsRepository]
})

export class OperatingPanelsModule {}