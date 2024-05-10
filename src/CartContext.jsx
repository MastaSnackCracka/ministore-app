import { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext({
  items: [],
  getProductQuantity: (id) => 0,
  addOneToCart: (id) => {},
  removeOneFromCart: (id) => {},
  deleteFromCart: (id) => {},
  getTotalCost: () => 0,
  isLoading: false,
  error: null,
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        const initializedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          size: item.size,
          image1: item.image1,
          image2: item.image2,
          image3: item.image3,
          images: [item.image1, item.image2, item.image3].filter((img) => img),
          charClass: item.char_Class,
          charRace: item.char_Race,
          quantity: 0, // Initialize quantity to zero for all items initially
        }));
        setCartProducts(initializedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const getProductQuantity = (id) => {
    return cartProducts.find((product) => product.id === id)?.quantity || 0;
  };

  const addOneToCart = (id) => {
    setCartProducts((prevProducts) => {
      const index = prevProducts.findIndex((product) => product.id === id);
      if (index !== -1) {
        const newProducts = [...prevProducts];
        newProducts[index] = {
          ...newProducts[index],
          quantity: newProducts[index].quantity + 1,
        };
        return newProducts;
      } else {
        console.log("Product not found in cartProducts, adding new", id);
        const newProduct = {
          id,
          name: "New Product", // Placeholder
          price: 10, // Placeholder
          quantity: 1,
        };
        return [...prevProducts, newProduct];
      }
    });
  };

  const removeOneFromCart = (id) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      )
    );
  };

  const deleteFromCart = (id) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: 0 } : product
      )
    );
  };

  const getTotalCost = () => {
    return cartProducts.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  };

  const contextValue = useMemo(
    () => ({
      items: cartProducts,
      getProductQuantity,
      addOneToCart,
      removeOneFromCart,
      deleteFromCart,
      getTotalCost,
      isLoading,
      error,
    }),
    [cartProducts, isLoading, error]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
