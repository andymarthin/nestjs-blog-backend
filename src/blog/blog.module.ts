import { AuthenticationMiddleware } from 'src/common/authentication.middleware';
import { BlogSchema } from './schemas/blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/blog/post' },
        { method: RequestMethod.PUT, path: '/blog/edit' },
        { method: RequestMethod.DELETE, path: '/blog/delete' },
      );
  }
}
