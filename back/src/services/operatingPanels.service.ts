import { Injectable } from "@nestjs/common";
import { OperatingPanelsRepository } from "src/repositories/operatingPanels.repository";

@Injectable()

export class OperatingPanelsService {

    constructor(
        private readonly OperatingPanelsRepository: OperatingPanelsRepository
    ){}
    async readExcel(buffer: Buffer) {
       return await this.OperatingPanelsRepository.readExcel(buffer);
    }

    async extractData(data: string , inversorName : string) {
        return await this.OperatingPanelsRepository.extractData(data , inversorName);
    }

    async extractDataSunnyPortal(data: any) {
        return await this.OperatingPanelsRepository.extractDataSunnyPortal(data);
    }

    async getAllOperatingPanels() {
        return await this.OperatingPanelsRepository.getAllOperatingPanels();
    }

    async getOperatingPanelById(id : string) {
        return await this.OperatingPanelsRepository.getOperatingPanelById(id);
    }
}