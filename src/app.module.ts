import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from './brands/brands.module';
import { CarsModule } from './cars/cars.module';
import { ModelsModule } from './models/models.module';
import { UsersModule } from './users/users.module';
import { OtpCodesModule } from './otp-codes/otp-codes.module';
import { RepairRecordsModule } from './repair-records/repair-records.module';
import { RepairRecordServicesModule } from './repair-record-services/repair-record-services.module';
import { ServicesModule } from './services/services.module';
import { PartRemindersModule } from './part-reminders/part-reminders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //TODO: read the data from env file
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'repair-shop',
      entities: [],
      synchronize: true,
    }),
    BrandsModule,
    CarsModule,
    ModelsModule,
    UsersModule,
    OtpCodesModule,
    RepairRecordsModule,
    RepairRecordServicesModule,
    ServicesModule,
    PartRemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
