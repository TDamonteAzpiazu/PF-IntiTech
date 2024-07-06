import { ItemDto } from './item.dto';

export class AllRecordDto {
    record: {
        id: string;
        totalPrice: number;
        items: ItemDto[];
    };
}