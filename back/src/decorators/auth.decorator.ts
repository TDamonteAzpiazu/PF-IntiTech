import { applyDecorators } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger"
import { CreateUserDto } from "src/dto/createUser.dto"
import { CredentialsDto } from "src/dto/credentials.dto"

export const RegisterSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Creates a new account',
            description: 'Gets by body the information needed to create a new account.'
        }),
        ApiBody({
            type: CreateUserDto
        })
    )
}

export const LoginSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Logs into an already existing account',
            description: 'Gets by body username and password.'
        }),
        ApiBody({
            type: CredentialsDto
        })
    )
}

export const googleLoginSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: "Logs into a Google account  (Can't be tested in swagger)",
            description: 'Redirects the user to Google authentication.'
        }),
        ApiBearerAuth()
    )
}

export const googleCallbackSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: "Google authentication callback  (Can't be tested in swagger)",
            description: 'Redirects the user to the home page.'
        }),
        ApiBearerAuth()
    )
}