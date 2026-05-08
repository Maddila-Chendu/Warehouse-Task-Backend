import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Product } from "../Entity/schema/app/product.entity";
import { InventoryBatch } from "../Entity/schema/app/inventory_batch.entity";
import { InventoryLog } from "../Entity/schema/app/inventory_log.entity";
import { Order } from "../Entity/schema/app/order.entity";
import { ExpiryStock } from "../Entity/schema/app/expiry_stock.entity";
import { Users } from "../Entity/schema/app/users.entity";
import { BinEntity } from "../Entity/schema/app/bins.entity";

dotenv.config();

const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [Product, InventoryBatch, InventoryLog, Order, ExpiryStock, Users, BinEntity],
  synchronize: true,
});

export default database;