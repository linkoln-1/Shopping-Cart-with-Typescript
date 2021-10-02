import { CartItemType } from "./Types";

export const getProduct = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();
