import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';

@Module({
  imports: [
              UsersModule, 
              ProductsModule, 
              DatabaseModule,
              ConfigModule.forRoot({
                envFilePath: enviroments[process.env.NODE_ENV] || '.env',
                isGlobal: true,
              }),
           ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
