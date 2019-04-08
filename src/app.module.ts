import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { entityContext } from "./entity.context";
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "grandhika",
      entities: [
        ...entityContext.keys().map(id => {
          const entityModule = entityContext(id);
          // We must get entity from module (commonjs)
          // Get first exported value from module (which should be entity class)
          const [entity] = Object["values"](entityModule);
          return entity;
        })
      ],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    PhotoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}