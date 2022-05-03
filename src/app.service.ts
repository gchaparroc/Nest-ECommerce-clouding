import { Injectable, Inject } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {

  constructor(
    //@Inject('API_KEY') private apikey: string,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Estas en el ambiente de: ${apiKey} ${dbName}`;
  }
}
