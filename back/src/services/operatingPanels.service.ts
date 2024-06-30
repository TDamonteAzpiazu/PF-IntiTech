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

    async extractData(data: string) {
        return await this.OperatingPanelsRepository.extractData(data);
    }



}