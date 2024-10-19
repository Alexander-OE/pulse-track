import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    workoutId: number,
    createNoteDto: CreateNoteDto,
  ) {
    const workout = await this.prisma.workoutPlan.findFirst({
      where: { userId: userId, id: workoutId },
    });

    if (!workout) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.workoutNotes.create({
      data: {
        ...createNoteDto,
        userId,
        workoutId,
      },
    });
  }

  async remove(userId: number, workoutId: number, noteId: number) {
    await this.prisma.workoutNotes.delete({
      where: { id: noteId, userId: userId, workoutId: workoutId },
    });

    return {
      message: `Workout note deleted successfully.`,
    };
  }
}
