import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils'



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

    return [...cartItems, { ...productToAdd, quantity: 1 }];

};


const removeCartItem = (cartItems, cartItemToRemove) => {
    //achar o item para remover
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //checar se a quantidade é igual a zero então remover
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    };

    //retornar a cartitems atualizado 
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0,
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartTotal: 0,
    cartCount: 0,
    cartItems: [],
};

const cartReducer = (state, action) => {
    const { type, payload } = action;


    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cart Reducer`);
    }

}

export const CartProvider = ({ children }) => {


    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, cartCount, cartTotal, isCartOpen } = state;


    const updateCartItemsReducer = (newCartItems) => {

        /*  Atualizar NewCartTotal */
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        );
        /* Atualizar NEwCartCount */
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );


        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount,
                }
            )
        )


    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItem(cartItems, productToAdd));
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = (clearCartItem(cartItems, cartItemToClear));
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool ));
    }



    const value = {
        isCartOpen,
        setIsCartOpen: setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemToCart,
        clearItemFromCart,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}