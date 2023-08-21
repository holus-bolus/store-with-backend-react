import React from "react";
import './Cart.css'

export const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const getTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x{" "}
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                        /> = ${item.price * item.quantity}
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p className="total">Total: ${getTotal()}</p>
        </div>
    );
};


