import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Product } from "../Entity/schema/app/product.entity";
import { InventoryBatch } from "../Entity/schema/app/inventory_batch.entity";
import { InventoryLog } from "../Entity/schema/app/inventory_log.entity";
import { Order } from "../Entity/schema/app/order.entity";
import { ExpiryStock } from "../Entity/schema/app/expiry_stock.entity";

dotenv.config();

const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [Product, InventoryBatch, InventoryLog, Order, ExpiryStock],
  synchronize: true,
});

if (!database.isInitialized) {
  database.initialize()
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((error) => {
      console.error("Error initializing database:", error);
    });
}

export default database;