import { Injectable } from "@nestjs/common";
import MercadoPagoConfig from "mercadopago";
import { Repository } from "typeorm";

@Injectable()

export class MercadoPagoRepository {
    constructor(
        private readonly repository : Repository<MercadoPagoConfig>,
    ) { }
}