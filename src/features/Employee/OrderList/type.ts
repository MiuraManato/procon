type Order = {
  orderId: number;
  orderedAt: string;
  tableId: number;
  storeTable: {
    tableName: string;
  };
  orderDetail: Array<{
    orderDetailId: number;
    orderId: number;
    productId: number;
    quantity: number;
    orderStatus: string;
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

type payloadNew = {
  orderId: number;
  orderedAt: string;
  tableId: number;
};

type payloadType = {
  schema: string;
  comnmit_timestamp: string;
  errors?: string;
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: payloadNew;
  table: string;
};

export type { Order, GetOrdersReturnType, payloadType };
