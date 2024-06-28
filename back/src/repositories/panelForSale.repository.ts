import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePanelDto } from "src/dto/createPanel.dto";
import { PanelForSale } from "src/entities/panelForSale.entity";
import { Repository } from "typeorm";

@Injectable()
export class PanelForSaleRepository {
    
    constructor( 
        @InjectRepository(PanelForSale) private readonly panelForSaleRepository: Repository<PanelForSale>,
    ) {}


    async createPanelForSale(panelForSale : CreatePanelDto): Promise<PanelForSale> {
        return this.panelForSaleRepository.save(panelForSale);
    }

    async getAllPanelForSale(page : number, limit : number): Promise<PanelForSale[]> {
        const [panels] = await this.panelForSaleRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
          });

          if (panels.length == 0) { 
            throw new NotFoundException(
              "Any panel for sale was found.",
            );
            
          }
          return panels;
    }

    async getPanelForSaleById(id: string): Promise<PanelForSale> {
        const panel = await this.panelForSaleRepository.findOneBy({ id });
        if (!panel) {
          throw new NotFoundException("Panel not found.");
        }

        return panel;
    }

    async updatePanelForSale(id:string, panel: Partial<CreatePanelDto >) : Promise<PanelForSale> {
      const panelToUpdate = await this.panelForSaleRepository.findOne({where: { id: id }});
      if (!panelToUpdate) {
        throw new NotFoundException("Panel not found");
      }
      const updatedPanel = this.panelForSaleRepository.merge(panelToUpdate, panel);
      await this.panelForSaleRepository.save(updatedPanel);
      return updatedPanel;
    }


    async deletePanelForSale(id: string): Promise<string> {
        const panel = await this.panelForSaleRepository.findOneBy({ id });
        if (!panel) {
          throw new NotFoundException("Panel not found.");
        }
        await this.panelForSaleRepository.remove(panel);
        return "Panel deleted successfully.";
    }
}