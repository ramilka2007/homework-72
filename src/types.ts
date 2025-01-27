export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface DishMutation {
  title: string;
  price: string;
  image: string;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface OrderDish {
  [id: string]: number;
}

export interface ApiAllOrders {
  id: string;
  orders: OrderDish[];
}
