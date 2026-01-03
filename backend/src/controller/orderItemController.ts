import { Request, Response, NextFunction } from 'express';
import { OrderItemService } from '../service/orderItemService.js';

export class OrderItemController {

  static async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { itemId, quantity } = req.body;

      const result = await OrderItemService.addItem(
        orderId,
        itemId,
        quantity
      );

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const result = await OrderItemService.getItemsByOrder(orderId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantity, price } = req.body;

      const result = await OrderItemService.updateItem(
        id,
        quantity,
        price
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await OrderItemService.deleteItem(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async clearOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      await OrderItemService.clearOrder(orderId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
