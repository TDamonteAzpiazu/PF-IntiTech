import { Injectable } from "@nestjs/common";
import { CreatePanelDto } from "src/dto/createPanel.dto";
import { PanelForSale } from "src/entities/panelForSale.entity";
import { PanelForSaleRepository } from "src/repositories/panelForSale.repository";

@Injectable()
export class panelForSaleService {

    constructor(private readonly panelForSaleRepository: PanelForSaleRepository) {}

    async createPanelForSale(panelForSale: CreatePanelDto) {
        return await this.panelForSaleRepository.createPanelForSale(panelForSale);
    }

    async getAllPanelForSale(page : number, limit : number) {
        return await this.panelForSaleRepository.getAllPanelForSale(page , limit);
    }

    async getPanelForSaleById(id: string) {
        return await this.panelForSaleRepository.getPanelForSaleById(id);
    }

    async deletePanelForSale(id: string) {
        return await this.panelForSaleRepository.deletePanelForSale(id);
    }
}