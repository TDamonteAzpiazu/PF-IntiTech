// faq.service.ts

import { Injectable } from '@nestjs/common';
import { ChatBotRepository } from 'src/repositories/chatbot.repository';



@Injectable()
export class ChatbotService {
    constructor(private readonly chatBotRepository: ChatBotRepository) {}

    findAnswer(question: string): string {
        const answer = this.chatBotRepository.findAnswerByQuestion(question);
        if (answer) {
            return answer;
        } else {
            return 'Para más consultas, por favor contáctenos en Ventas@Inti-Tech.com o llamanos al 809-123-4567';
        }
    }
}
