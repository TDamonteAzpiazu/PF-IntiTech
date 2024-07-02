import { Controller } from "@nestjs/common";

@Controller()

export class mercadoPagoController {

    constructor(private readonly mercadoPagoService: mercadoPagoService) { }
    

}