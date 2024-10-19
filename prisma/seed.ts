import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const workouts = [
    {
      category: 'Strength',
      name: 'Deadlift',
      repetitions: 8,
      sets: 4,
      weight: 120.0,
      scheduledAt: new Date('2024-11-10T08:30:00.000Z'),
    },
    {
      category: 'Cardio',
      name: 'Running',
      repetitions: 0,
      sets: 1,
      weight: null,
      scheduledAt: new Date('2024-11-15T07:00:00.000Z'),
    },
    {
      category: 'Flexibility',
      name: 'Yoga Stretch',
      repetitions: 5,
      sets: 3,
      weight: null,
      scheduledAt: new Date('2024-12-01T06:00:00.000Z'),
    },
    {
      category: 'Strength',
      name: 'Bench Press',
      repetitions: 10,
      sets: 4,
      weight: 80.5,
      scheduledAt: new Date('2024-11-20T09:00:00.000Z'),
    },
    {
      category: 'Cardio',
      name: 'Cycling',
      repetitions: 0,
      sets: 1,
      weight: null,
      scheduledAt: new Date('2024-11-25T10:30:00.000Z'),
    },
  ];

  for (const workout of workouts) {
    await prisma.workoutPlan.create({ data: workout });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
