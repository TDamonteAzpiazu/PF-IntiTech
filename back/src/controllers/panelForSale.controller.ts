import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { CreatePanelDto } from "src/dto/createPanel.dto";
import { panelForSaleService } from "src/services/panelForSale.service";

@Controller('panelForSale')
export class PanelForSaleController {
    constructor(private readonly panelForSaleService: panelForSaleService) {}

    @Get()
    async getAllPanelForSale(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        return await this.panelForSaleService.getAllPanelForSale(page , limit);
    }

    @Get(':id')
    async getPanelForSaleById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.panelForSaleService.getPanelForSaleById(id);
    }

    @Post()
    async createPanelForSale(@Body() panel: CreatePanelDto) {
        return await this.panelForSaleService.createPanelForSale(panel);
    }

    @Delete(':id')
    async deletePanelForSale(@Param('id', ParseUUIDPipe) id: string) {
        return await this.panelForSaleService.deletePanelForSale(id);
    }
}