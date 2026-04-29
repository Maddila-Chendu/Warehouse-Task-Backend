import express, { Request, Response } from 'express';
import database from '../database/connect';
import cors from 'cors';
import productRouter from '../API/V1/products/product.router';
import inventoryBatchRouter from '../API/V1/inventory/inventory_batch.router';
import ordersRouter from '../API/V1/orders/orders.router';

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

app.use('/product', productRouter);
app.use('/IBatch', inventoryBatchRouter);
app.use('/orders', ordersRouter);


app.get("/api", async (req: Request, res: Response) => {
  try {
    if (!database.isInitialized) {
      await database.initialize();
    }
    res.status(200).json({ message: "Database connected successfully!" });
  } catch (error) {
    const err = error as Error;
    console.error("Error during DataSource initialization:", err);
    res.status(500).json({ message: "Failed to connect to the database.", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});