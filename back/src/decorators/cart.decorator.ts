import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export const GetCartItemsSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get cart items', description: 'Receives the ID of a cart as a parameter and returns an object with all its items.'}),
    )
}

export const AddItemToCartSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Add item to cart', description: 'Receives the ID of a cart by parameter and an object with the item\'s ID by body.'}),
    )
}

export const ClearCartSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Clear cart', description: 'Receives the ID of a cart by parameter and empties its items, putting the stock back and returns a string.'}),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'All items deleted successfully',
            schema: {
              type: 'string',
              example: 'All items deleted successfully',
            },
          })
    )
}

export const CreateRecordSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Create record', description: 'Receives the ID of a cart by parameter, creates a new record, empties its items and returns a string.'}),
        ApiResponse({
            status: 201,
            description: 'All items deleted successfully',
            schema: {
              type: 'string',
              example: 'All items deleted and record created successfully',
            },
          })
    )
}