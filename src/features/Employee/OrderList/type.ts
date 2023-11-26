// OrderStatus enum from Prisma schema
enum ORDERSTATUS {
  COOKING,
  COOKED,
  SERVED,
}

// Order type
type Order = {
  orderId: number;
  orderedAt: Date;
  tableId: number;
  storeTable: {
    tableName: string;
  };
  orderDetail: Array<{
    orderDetailId: number;
    orderId: number;
    productId: number;
    quantity: number;
    orderStatus: ORDERSTATUS;
    product: {
      productId: number;
      productName: string;
      price: number;
      description: string;
    };
  }>;
};

// Function return type
type GetOrdersReturnType = Promise<Order[]>;

export type { Order, GetOrdersReturnType };
