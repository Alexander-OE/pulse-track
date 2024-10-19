import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { AuthGuard, User } from 'src/auth/auth.guard';
import { UserEntity } from './interface/user.interface';

@UseGuards(AuthGuard)
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(@User() user: UserEntity, @Body() createWorkoutDto: CreateWorkoutDto) {
    console.log('user object', user);

    const userId = parseInt(user.id);

    console.log('user number ', userId);

    return this.workoutService.create(createWorkoutDto, userId);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    const userId = parseInt(user.id);
    return this.workoutService.findAll(userId);
  }

  @Get(':workoutPlanId')
  findOne(
    @User() user: UserEntity,
    @Param('workoutPlanId') workoutPlanId: string,
  ) {
    const userId = parseInt(user.id);
    const workoutId = parseInt(workoutPlanId);

    return this.workoutService.findOne(userId, workoutId);
  }

  @Patch(':workoutPlanId')
  update(
    @User() user: UserEntity,
    @Param('workoutPlanId') workoutPlanId: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    const userId = parseInt(user.id);
    const workoutId = parseInt(workoutPlanId);
    return this.workoutService.update(userId, workoutId, updateWorkoutDto);
  }

  @Delete(':workoutPlanId')
  remove(
    @User() user: UserEntity,
    @Param('workoutPlanId') workoutPlanId: string,
  ) {
    const userId = parseInt(user.id);
    const workoutId = parseInt(workoutPlanId);
    return this.workoutService.remove(userId, workoutId);
  }
}
