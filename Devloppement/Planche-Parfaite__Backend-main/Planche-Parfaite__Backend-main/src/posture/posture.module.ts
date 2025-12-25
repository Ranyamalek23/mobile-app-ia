import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posture } from './posture.entity';
import { PostureService } from './posture.service';
import { PostureController } from './posture.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Posture])],
  controllers: [PostureController],
  providers: [PostureService],
  exports: [PostureService],
})
export class PostureModule {}
