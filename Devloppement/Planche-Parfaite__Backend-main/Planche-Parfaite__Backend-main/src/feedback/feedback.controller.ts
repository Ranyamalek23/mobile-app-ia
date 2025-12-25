import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
  import { FeedbackService } from './feedback.service';
  import { CreateFeedbackDto } from './dto/create-feedback.dto';
  import { UpdateFeedbackDto } from './dto/update-feedback.dto';
  
  @ApiTags('Feedback')
  @Controller('feedback')
  export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}
  
    @Post()
    @ApiBody({ type: CreateFeedbackDto })
    create(@Body() createFeedbackDto: CreateFeedbackDto) {
      return this.feedbackService.create(createFeedbackDto);
    }
  
    @Get()
    findAll() {
      return this.feedbackService.findAll();
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID du feedback' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.feedbackService.findOne(id);
    }
  
    @Put(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID du feedback' })
    @ApiBody({ type: UpdateFeedbackDto })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateFeedbackDto: UpdateFeedbackDto,
    ) {
      return this.feedbackService.update(id, updateFeedbackDto);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID du feedback' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.feedbackService.remove(id);
    }
  }
  
  