import { Controller, Get, Query } from '@nestjs/common';
import { FaqService } from 'src/services/chatbot.service';



@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly faqService: FaqService) {}

    @Get('answer')
    getAnswer(@Query('question') question: string): string {
        return this.faqService.findAnswer(question);
    }
}