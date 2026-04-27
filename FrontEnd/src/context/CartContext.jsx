import { createContext, useState, useContext, useMemo, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (err) {
            console.error("Failed to parse cart from localStorage", err);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id && item.color === product.color);
            if (existingItem) {
                return prevCart.map((item) =>
                    (item.id === product.id && item.color === product.color) 
                    ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
                    : item
                );
            } else {
                return [...prevCart, { ...product, quantity: product.quantity || 1 }];
            }
        });
        setIsCartOpen(true); // Automatically open cart when adding
    };

    const removeFromCart = (productId, color) => {
        setCart((prevCart) => prevCart.filter(item => !(item.id === productId && item.color === color)));
    };

    const updateQuantity = (productId, color, delta) => {
        setCart((prevCart) => prevCart.map(item => {
            if (item.id === productId && item.color === color) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            return total + (price * (item.quantity || 1));
        }, 0);
    }, [cart]);

    const formatPrice = (amount) => {
        const formatted = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
        return formatted.replace('₹', '₹ ');
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        formatPrice,
        isCartOpen,
        toggleCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
