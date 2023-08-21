import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // se o produto já estiver no carrinho 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // Se achar aumentar a quantidade no carrinho 
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // retornar o array de produtos do carrinho atualizado 

    return [...cartItems, {...productToAdd, quantity: 1}];

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { }
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };


    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}