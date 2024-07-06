import { Injectable } from "@nestjs/common";
import { OperatingPanels } from "src/entities/operatingPanels.entity";
import { OperatingPanelsRepository } from "src/repositories/operatingPanels.repository";

@Injectable()

export class OperatingPanelsService {

    constructor(
        private readonly OperatingPanelsRepository: OperatingPanelsRepository
    ) { }
    async readExcel(buffer: Buffer) {
        return await this.OperatingPanelsRepository.readExcel(buffer);
    }
    async extractDataByInversor(inversorName: string, data: any) {
        return await this.OperatingPanelsRepository.extracDataByInversor(inversorName, data);
    }

    async getAllOperatingPanels(): Promise<OperatingPanels[]> {
        return await this.OperatingPanelsRepository.getAllOperatingPanels();
    }

    async getOperatingPanelById(id: string): Promise<OperatingPanels> {
        return await this.OperatingPanelsRepository.getOperatingPanelById(id);
    }
}
