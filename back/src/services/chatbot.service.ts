// faq.service.ts

import { Injectable } from '@nestjs/common';
import { FaqRepository } from 'src/repositories/faq.repository';


@Injectable()
export class FaqService {
    constructor(private readonly faqRepository: FaqRepository) {}

    findAnswer(question: string): string {
        const answer = this.faqRepository.findAnswerByQuestion(question);
        if (answer) {
            return answer;
        } else {
            return 'For further inquiries, please contact us at contact@yourcompany.com';
        }
    }
}
