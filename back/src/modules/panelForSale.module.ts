import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PanelForSaleController } from "src/controllers/panelForSale.controller";
import { PanelForSale } from "src/entities/panelForSale.entity";
import { PanelForSaleRepository } from "src/repositories/panelForSale.repository";
import { PanelForSaleService } from "src/services/panelForSale.service";

@Module({
    imports : [TypeOrmModule.forFeature([PanelForSale])],
    controllers : [PanelForSaleController],
    providers : [PanelForSaleService , PanelForSaleRepository]
})

export class PanelForSaleModule {}