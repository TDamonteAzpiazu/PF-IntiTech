import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger"
import { CreatePanelDto } from "src/dto/createPanel.dto"


export const GetAllPanelsForSaleSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get all panels for sale divided in pages', 
            description: 'Receives the page and the limit of elements per page as query parameters, and return an array of objects with all panels for sale.'
        }),
        ApiQuery({
            name: 'page', 
            type: Number, 
            description: 'The page that will be shown'
        }),
        ApiQuery({
            name: 'limit', 
            type: Number, 
            description: 'The ammount of elements per page'
        })
    )
}
export const GetPanelForSaleByIdSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get panel by ID', 
            description: 'Receives the ID of a panel as a parameter and returns an object with all of its data.'
        })
    )
}

export const UpdatePanelForSaleSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Updates a panel', 
            description: 'Receives the ID of a panel as a parameter and the information to update its data in the body.'
        }),
        ApiBody({type: CreatePanelDto})
    )
}

export const CreatePanelForSaleSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new panel for sale',
            description: 'Gets by body the information needed to create a new panel.'
        }),
        ApiBody({type: CreatePanelDto})
    )
}

export const DeletePanelForSaleSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete panel', 
            description: 'Receives the ID of a panel as a parameter and deletes it from the database.'
        }),
        ApiResponse({status: 200, description: 'Panel deleted'})
    )
}
