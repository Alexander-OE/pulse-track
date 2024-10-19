import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard, User } from 'src/auth/auth.guard';
import { UserEntity } from 'src/workout/interface/user.interface';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post(':workoutPlanId')
  create(
    @User() user: UserEntity,
    @Body() createNoteDto: CreateNoteDto,
    @Param('workoutPlanId') workoutPlanId: string,
  ) {
    const userId = parseInt(user.id);
    const workoutId = parseInt(workoutPlanId);
    return this.notesService.create(userId, workoutId, createNoteDto);
  }

  @Delete(':workoutPlanId/:workoutNoteId')
  remove(
    @User() user: UserEntity,
    @Param('workoutPlanId') workoutPlanId: string,
    @Param('workoutNoteId') workoutNoteId: string,
  ) {
    const userId = parseInt(user.id);
    const workoutIdParsed = parseInt(workoutPlanId);
    const noteId = parseInt(workoutNoteId);

    return this.notesService.remove(userId, workoutIdParsed, noteId);
  }
}
