import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import ItemCart from "../ItemCart";
import Cart from "../Cart/index";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
//styles
import { Wrapper, StyledButton } from "./App.styles";
import { CartItemType } from "../FetchQueryAndTypes/Types";
//fetch
import { getProduct } from "../FetchQueryAndTypes";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );

  const getTotalItem = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  //Функция добавления товара в корзину
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItem((prev) => {
      // 1.Если товар был уже добавлен в Корзину, то при повторном клике мы добавляем лишь стоимость товара
      // к уже существующему товару в Корзине.
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // Если е мы кликаем первый раз на кнопку, то мы просто добавляем товар в корзину с его ценой
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  //Функция удаления товаров из корзины
  const handleRemoveFromCart = (id: number) => {
    setCartItem((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItem}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItem(cartItem)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <ItemCart item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
