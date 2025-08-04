import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const dbConfiguration: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('db.host'),
    port: configService.get<number>('db.port'),
    username: configService.get<string>('db.user'),
    password: configService.get<string>('db.password'),
    database: configService.get<string>('db.name'),
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
  }),
}