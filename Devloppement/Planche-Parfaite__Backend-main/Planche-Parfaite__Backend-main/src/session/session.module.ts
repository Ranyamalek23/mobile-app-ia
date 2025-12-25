import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { User } from '../users/users.entity';
import { Posture } from '../posture/posture.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, User, Posture])
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
