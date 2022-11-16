import { Injectable } from '@nestjs/common';
import { QuestionEntity } from '@interfaces/questions/entities/question.entity';
import { baseException } from '@api/core/base-exception';
import { UpdateQuestionDto } from '@interfaces/questions/dtos/update-question.dto';
import { CreateQuestionDto } from '@interfaces/questions/dtos/create-question.dto';
import { QuestionDto } from '@interfaces/questions/dtos/question.dto';

@Injectable()
export class QuestionsService {
  async find(): Promise<QuestionDto[]> {
    try {
      return (await QuestionEntity.find()).map((q) => this.mapToQuestionDto(q));
    } catch (error) {
      baseException('[QuestionsService] find: ', error);
    }
  }

  async create(category: CreateQuestionDto): Promise<QuestionDto> {
    try {
      return this.mapToQuestionDto(
        await QuestionEntity.create({ ...category }).save()
      );
    } catch (error) {
      baseException('[QuestionsService] create: ', error);
    }
  }

  async update(id, body: UpdateQuestionDto) {
    try {
      await QuestionEntity.update({ id }, body);
      return {};
    } catch (error) {
      baseException('[QuestionsService] update: ', error);
    }
  }

  async delete(id) {
    try {
      await QuestionEntity.delete(id);
      return {};
    } catch (error) {
      baseException('[QuestionsService] delete: ', error);
    }
  }

  mapToQuestionDto(entity: QuestionEntity) {
    return {
      id: entity.id,
      question: entity.question,
      answer: entity.answer,
    };
  }
}
