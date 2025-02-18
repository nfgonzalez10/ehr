import { KeyReference } from 'src/key-reference/entities/key-reference.entity';
import { Mapping } from 'src/mappings/entities/mapping.entity';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export function dbConfig(): PostgresConnectionOptions {
  console.log(process.env.DB_HOST);
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [KeyReference, Tenant, Mapping],
    synchronize: true,
  };
}
