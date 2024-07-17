import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger"
import { UpdateUserDto } from "src/dto/updateUser.dto"

export const GetAllUsersSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get all users divided in pages', description: 'Receives the page and the limit of elements per page as query parameters, and return an array of objects with all users.'}),
        ApiQuery({name: 'page', type: Number, description: 'The page that will be shown'}),
        ApiQuery({name: 'limit', type: Number, description: 'The ammount of elements per page'})
    )
}

export const GetUserByIdSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get user by ID', description: 'Receives the ID of a user as a parameter and returns an object with all their data.'})
    )
}

export const UpdateUserSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Updates a user', description: 'Receives the ID of a user as a parameter and the information to update their data in the body.'}),
        ApiBody({type: UpdateUserDto})
    )
}

export const DeleteUserSwagger = () => {
    return applyDecorators(
        ApiOperation({summary: 'Delete user', description: 'Receives the ID of a user as a parameter and changes their status to inactive in the database.'}),
        ApiResponse({status: 200, description: 'User deleted'})
    )
}

export const NotificationSwagger = () => {
    return applyDecorators(
        HttpCode(HttpStatus.NO_CONTENT),
        ApiOperation({summary: 'Send notification', description: 'Receives the email of a user as a parameter and sends an email with news from IntiTech.'}),
        ApiResponse({status: 204, description: 'Notification sent'}),
        ApiBody({
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  example: 'user@example.com',
                  description: 'The email of the user'
                }
              }
            }
          })
    )
}