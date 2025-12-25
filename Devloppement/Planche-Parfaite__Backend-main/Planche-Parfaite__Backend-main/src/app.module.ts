import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';
import { PostureModule } from './posture/posture.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { Session } from './session/session.entity';
import { Posture } from './posture/posture.entity';
import { Feedback } from './feedback/feedback.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'PlancheParfaiteBd',
      entities: [User,Session,Posture,Feedback],
      synchronize: false, // Disable auto-sync
      migrations: ['dist/migrations/*.js'], // Enable migrations
      migrationsRun: true, // Automatically run pending migrations
      autoLoadEntities: true,
    }),
    UsersModule,
    SessionModule,
    PostureModule,
    FeedbackModule,
    AuthModule,

     // Module utilisateur
  ],
})
export class AppModule {}
