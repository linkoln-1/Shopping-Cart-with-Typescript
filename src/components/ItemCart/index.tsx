import Button from "@material-ui/core/Button";
//types
import { CartItemType } from "../FetchQueryAndTypes/Types";
//styles
import { Wrapper } from "./Item.styles";
import React from "react";
import ScrollDialog from "../Modal";

type Props = {
  item: CartItemType;
  handleAddToCart: (clicked: CartItemType) => void;
};
const ItemCart: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <div className="Modal">
      <ScrollDialog item={item} />
    </div>
    <Button onClick={() => handleAddToCart(item)}>Добавить в Корзину</Button>
  </Wrapper>
);

export default ItemCart;
