import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionDto } from '@interfaces/questions/dtos/question.dto';
import { JwtGuard } from '@api/guards/jwt.guard';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDto } from '@interfaces/questions/dtos/create-question.dto';
import { UpdateQuestionDto } from '@interfaces/questions/dtos/update-question.dto';

@Controller('api/questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async findAll(): Promise<QuestionDto[]> {
    return await this.questionsService.find();
  }

  @Post()
  async create(@Body() body: CreateQuestionDto): Promise<QuestionDto> {
    console.log(body);

    return await this.questionsService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateQuestionDto
  ): Promise<unknown> {
    return await this.questionsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.questionsService.delete(id);
  }
}
