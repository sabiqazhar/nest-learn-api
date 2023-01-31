import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const options = { useNewUrlParser: true, useUnifiedTopology: true };

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestdb', options),
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
