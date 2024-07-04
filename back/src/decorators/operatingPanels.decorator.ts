import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, getSchemaPath } from "@nestjs/swagger"
import { StatsDto } from "src/dto/stats.dto"

export const GetAllOperatingPanelsSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get all operating panels', description: 'Returns an array with all operating panels.'})
    )
}

export const GetOperatingPanelByIdSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get panel by ID', description: 'Receives the ID of a panel as a parameter and returns an object with all of its data.'})
    )
}

export const UploadFileSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: "Upload a user's file", 
            description: 'Receives the ID of a user as a parameter and the file (CSV or XLS) to upload in the body.'
        }),
        ApiConsumes('multipart/form-data'),
        ApiExtraModels(StatsDto),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'The file to upload (CSV or XLS)',
                    },
                    inversorName: {
                        type: 'string',
                        description: 'The name of the investor',
                        example: 'SunRoof',
                    }
                }
            }
        }),
        ApiResponse({
            status: 201,
            description: 'File processed successfully',
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'File processed successfully',
                    },
                    stats: {
                        $ref: getSchemaPath(StatsDto),
                    }
                }
            }
        }),
    )
}