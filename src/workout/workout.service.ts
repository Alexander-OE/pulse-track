import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, userId: number) {
    return this.prisma.workoutPlan.create({
      data: {
        ...createWorkoutDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.workoutPlan.findMany({
      where: { userId: userId },
    });
  }

  async findOne(userId: number, workoutId: number) {
    const result = await this.prisma.workoutPlan.findFirst({
      where: { userId: userId, id: workoutId },
      include: {
        WorkoutNotes: {
          where: {
            workoutId: workoutId,
          },
          select: {
            comment: true,
            createdAt: true,
          },
        },
      },
    });
    return result;
  }

  async update(
    userId: number,
    workoutId: number,
    updateWorkoutDto: UpdateWorkoutDto,
  ) {
    await this.prisma.workoutPlan.update({
      where: {
        id: workoutId,
        userId: userId,
      },
      data: {
        ...updateWorkoutDto,
      },
    });
    return { message: 'Workout successfully updated' };
  }

  async remove(userId: number, workoutId: number) {
    await this.prisma.workoutNotes.deleteMany({
      where: {
        workoutId: workoutId,
      },
    });

    await this.prisma.workoutPlan.delete({
      where: { userId: userId, id: workoutId },
    });

    return { message: 'Workout successfully deleted' };
  }
}
