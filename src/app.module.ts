import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workout/workout.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, AuthModule, WorkoutModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
