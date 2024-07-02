import { Injectable } from "@nestjs/common";

@Injectable()

export class mercadoPagoService {

    constructor(private readonly mercadoPagoRepository: mercadoPagoRepository) {}
}