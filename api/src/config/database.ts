import { ConnectionOptions } from "typeorm";
import { User, Auction, Message, Mailbox } from '../models';

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User, Auction, Message, Mailbox],
  synchronize: true,
};

export default config;
