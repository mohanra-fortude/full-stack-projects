import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { config } from './config';
import { Category } from './upload/entities/category.entity';
import { Group } from './upload/entities/group.entity';
import { Post } from './upload/entities/post.entity';
import { User } from './upload/entities/user.entity';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<ConnectionOptions>('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [User, Group, Category, Post],
      },
      context: ({ req }) => ({
        jwt: req.headers.authorization,
        user: req.user,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
