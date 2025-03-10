import { createContext, useState } from "react";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = ({ id, price, name, img }) => {
    const productoEcontradoIndex = carrito.findIndex((p) => p.id === id);
    const producto = { id, price, name, img, count: 1 };

    if (productoEcontradoIndex >= 0) {
      carrito[productoEcontradoIndex].count++;
      setCarrito([...carrito]);
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const increment = (i) => {
    carrito[i].count++;
    setCarrito([...carrito]);
  };

  const emptyCart = () => {
    setCarrito([])
  }

  const decrement = (i) => {
    const { count } = carrito[i];
    if (count === 1) {
      carrito.splice(i, 1);
    } else {
      carrito[i].count--;
    }
    setCarrito([...carrito]);
  };

  const total = carrito.reduce((a, { count, price }) => a + price * count, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        addToCart,
        increment,
        decrement,
        emptyCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;