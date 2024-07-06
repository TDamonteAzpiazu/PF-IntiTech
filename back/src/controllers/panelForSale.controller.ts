import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePanelForSaleSwagger, DeletePanelForSaleSwagger, GetAllPanelsForSaleSwagger, GetPanelForSaleByIdSwagger, UpdatePanelForSaleSwagger } from "src/decorators/panelForSale.decorator";
import { CreatePanelDto } from "src/dto/createPanel.dto";
import { PanelForSale } from "src/entities/panelForSale.entity";
import { PanelForSaleService } from "src/services/panelForSale.service";

@ApiTags('Panels for sale')
@Controller('panelForSale')
export class PanelForSaleController {
    constructor(private readonly panelForSaleService: PanelForSaleService) { }

    @Get()
    @GetAllPanelsForSaleSwagger()
    async getAllPanelForSale(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<PanelForSale[]> {
        return await this.panelForSaleService.getAllPanelForSale(page, limit);
    }

    @Get(':id')
    @GetPanelForSaleByIdSwagger()
    async getPanelForSaleById(@Param('id', ParseUUIDPipe) id: string): Promise<PanelForSale> {
        return await this.panelForSaleService.getPanelForSaleById(id);
    }

    @Post()
    @CreatePanelForSaleSwagger()
    async createPanelForSale(@Body() panel: CreatePanelDto): Promise<PanelForSale> {
        return await this.panelForSaleService.createPanelForSale(panel);
    }

    @Put(":id")
    @UpdatePanelForSaleSwagger()
    async updatePanelForSale(@Param("id", ParseUUIDPipe) id: string, @Body() panel: Partial<CreatePanelDto>): Promise<PanelForSale> {
        return await this.panelForSaleService.updatePanelForSale(id, panel);
    }

    @Delete(':id')
    @DeletePanelForSaleSwagger()
    async deletePanelForSale(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
        return await this.panelForSaleService.deletePanelForSale(id);
    }
}