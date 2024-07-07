// faq.repository.ts

import { Injectable } from '@nestjs/common';
import { faqData } from 'src/utils/faq-data';


@Injectable()
export class FaqRepository {
    findAnswerByQuestion(question: string): string | null {
        const faqItem = faqData.find(item => item.question.toLowerCase() === question.toLowerCase());
        if (faqItem) {
            return faqItem.answer;
        } else {
            return null;
        }
    }
}