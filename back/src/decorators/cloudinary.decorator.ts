import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger"


export const UploadUserImageSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: "Upload the user's profile image", 
            description: 'Receives the ID of a user as a parameter and the image to upload in the body.'
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    )
}

export const UploadPanelImageSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: "Upload a panel image", 
            description: 'Receives the ID of a product as a parameter and the image to upload in the body.'
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    )
}