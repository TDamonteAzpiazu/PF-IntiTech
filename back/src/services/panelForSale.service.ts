import { Injectable } from '@nestjs/common';
import { CreatePanelDto } from 'src/dto/createPanel.dto';
import { PanelForSale } from 'src/entities/panelForSale.entity';
import { PanelForSaleRepository } from 'src/repositories/panelForSale.repository';
// import { PanelForSale } from "src/entities/panelForSale.entity"; Utilizar mas adelante

@Injectable()
export class PanelForSaleService {
  constructor(
    private readonly panelForSaleRepository: PanelForSaleRepository,
  ) { }

  async createPanelForSale(panelForSale: CreatePanelDto): Promise<PanelForSale> {
    return await this.panelForSaleRepository.createPanelForSale(panelForSale);
  }

  async getAllPanelForSale(page: number, limit: number): Promise<PanelForSale[]> {
    return await this.panelForSaleRepository.getAllPanelForSale(page, limit);
  }

  async getPanelForSaleById(id: string): Promise<PanelForSale> {
    return await this.panelForSaleRepository.getPanelForSaleById(id);
  }

  async updatePanelForSale(id: string, panelForSale: Partial<CreatePanelDto>): Promise<PanelForSale> {
    return await this.panelForSaleRepository.updatePanelForSale(id, panelForSale)


  }

  async deletePanelForSale(id: string): Promise<string> {
    return await this.panelForSaleRepository.deletePanelForSale(id);
  }
}
