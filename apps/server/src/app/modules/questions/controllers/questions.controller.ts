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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/questions')
@ApiTags('Question')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async findAll(): Promise<QuestionDto[]> {
    return await this.questionsService.find();
  }

  @Post()
  @ApiBearerAuth('JWT')
  async create(@Body() body: CreateQuestionDto): Promise<QuestionDto> {
    console.log(body);

    return await this.questionsService.create(body);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateQuestionDto
  ): Promise<unknown> {
    return await this.questionsService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return await this.questionsService.delete(id);
  }
}
