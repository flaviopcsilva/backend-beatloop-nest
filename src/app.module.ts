import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImageModule } from './profile-image/profile-image.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
      ,
      ssl: {
        ca: fs.readFileSync('src/ca.pem').toString(),
      },
    }),

    ProfileImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Diretório para servir as imagens
      serveRoot: '/uploads', // URL base para acessar as imagens
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
