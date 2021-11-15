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
import { MessageModule } from './message/message.module';
import { PostAttributesModule } from './post-attributes/post-attributes.module';
import { Category } from './post/entities/category.entity';
import { User } from './post/entities/user.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
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
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Category, User],
      },
      context: ({ req }) => ({
        jwt: req.headers.authorization,
        user: req.user,
      }),
    }),
    AuthModule,
    MessageModule,
    PostModule,
    PostAttributesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
