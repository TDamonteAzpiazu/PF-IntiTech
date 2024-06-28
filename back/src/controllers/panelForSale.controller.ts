import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CreatePanelDto } from "src/dto/createPanel.dto";
import { PanelForSaleService } from "src/services/panelForSale.service";

@Controller('panelForSale')
export class PanelForSaleController {
    constructor(private readonly panelForSaleService: PanelForSaleService) {}

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

    @Put(":id")
    async updatePanelForSale(@Param("id", ParseUUIDPipe) id:string,@Body() panel: Partial<CreatePanelDto>) {
        return await this.panelForSaleService.updatePanelForSale(id, panel);
    }

    @Delete(':id')
    async deletePanelForSale(@Param('id', ParseUUIDPipe) id: string) {
        return await this.panelForSaleService.deletePanelForSale(id);
    }
}