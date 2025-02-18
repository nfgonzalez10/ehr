import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KeyReferenceModule } from './key-reference/key-reference.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { MappingsModule } from './mappings/mappings.module';
import { EhrsModule } from './ehrs/ehrs.module';
import { dbConfig } from './configs/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    AuthModule,
    UsersModule,
    KeyReferenceModule,
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    TenantModule,
    MappingsModule,
    EhrsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
