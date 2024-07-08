import { Controller, Get, Query } from '@nestjs/common';
import { ChatbotService } from 'src/services/chatbot.service';



@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}

    @Get('answer')
    getAnswer(@Query('question') question: string): string {
        return this.chatbotService.findAnswer(question);
    }
}