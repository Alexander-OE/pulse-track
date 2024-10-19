import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect()
      .then(() =>
        console.log(
          `[${new Date().toISOString()}] Successfully connected to the database at localhost`,
        ),
      )
      .catch((err) =>
        console.log(
          `[${new Date().toISOString()}] Failed to connect to the database:`,
          err,
        ),
      );
  }
}
