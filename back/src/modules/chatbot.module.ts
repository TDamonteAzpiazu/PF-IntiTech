// src/chatbot/chatbot.module.ts

import { Module } from '@nestjs/common';
import { ChatbotController } from 'src/controllers/chatbot.controller';
import { ChatBotRepository } from 'src/repositories/chatbot.repository';
import { ChatbotService } from 'src/services/chatbot.service';


@Module({
    controllers: [ChatbotController],
    providers: [ChatbotService, ChatBotRepository],
})
export class ChatbotModule {}
