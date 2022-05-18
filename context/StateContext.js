import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Fragment,
} from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { toastAn } from "../utils/transitionVariants";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
      JSON.parse(localStorage.getItem("cart")).map((item) => {
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + item.quantity
        );
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + item.price * item.quantity
        );
      });
    }
  }, []);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          const newQty = item.quantity + quantity;
          return {
            ...item,
            quantity: newQty,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartItems, { ...product }])
      );
    }
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setQty(1);
    if (qty === 1) {
      toast.success(`${qty} item added to cart.`);
    } else {
      toast.success(`${qty} items added to cart.`);
    }
  };

  const removeCartItem = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      foundProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      newCartItems.splice(index, 0, foundProduct);
      setCartItems([...newCartItems]);
      localStorage.setItem("cart", JSON.stringify([...newCartItems]));
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        newCartItems.splice(index, 0, foundProduct);
        setCartItems([...newCartItems]);
        localStorage.setItem("cart", JSON.stringify([...newCartItems]));
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        addToCart,
        toggleCartItemQty,
        removeCartItem,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
