import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { PostureService } from './posture.service';
import { CreatePostureDto } from './dto/create-posture.dto';
import { UpdatePostureDto } from './dto/update-posture.dto';

@ApiTags('Postures')
@Controller('postures')
export class PostureController {
  constructor(private readonly postureService: PostureService) {}

  @Post()
  @ApiBody({ type: CreatePostureDto })
  create(@Body() createPostureDto: CreatePostureDto) {
    return this.postureService.create(createPostureDto);
  }

  @Get()
  findAll() {
    return this.postureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postureService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePostureDto })
  update(@Param('id') id: number, @Body() updatePostureDto: UpdatePostureDto) {
    return this.postureService.update(id, updatePostureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postureService.remove(id);
  }
}
