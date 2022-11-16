import { BaseService } from './_base.service';
import { QuestionDto } from '@interfaces/questions/dtos/question.dto';
import { UpdateQuestionDto } from '@interfaces/questions/dtos/update-question.dto';

export class QuestionsService extends BaseService<
  QuestionDto,
  UpdateQuestionDto
> {
  serviceUrl = '/questions';

  constructor(isServer = false) {
    super(isServer);
  }
}
