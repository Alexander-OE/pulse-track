-- DropForeignKey
ALTER TABLE `workoutplan` DROP FOREIGN KEY `WorkoutPlan_userId_fkey`;

-- AlterTable
ALTER TABLE `workoutplan` MODIFY `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `WorkoutNotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `workoutId` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkoutPlan` ADD CONSTRAINT `WorkoutPlan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutNotes` ADD CONSTRAINT `WorkoutNotes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutNotes` ADD CONSTRAINT `WorkoutNotes_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `WorkoutPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
