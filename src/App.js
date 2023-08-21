import './App.css';
import {Product} from './components/Product/Product';
import {Cart} from './components/Cart/Cart';
import {useEffect, useState} from 'react';

function App() {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || []
    );
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);
    const filterProducts = () => {
        const filteredProducts = products.filter((product) => {
            const price = product.price;
            if (
                (minPrice === "" || price >= minPrice) &&
                (maxPrice === "" || price <= maxPrice) &&
                (searchQuery === "" ||
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()))
            ) {
                return true;
            }
            return false;
        });

        return filteredProducts;
    };
    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, {...product, quantity: 1}]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedItems = cartItems.map((item) =>
            item.id === productId ? {...item, quantity: parseInt(newQuantity)} : item
        );
        setCartItems(updatedItems);
    };

    const clearCart = () => {
        localStorage.removeItem('cartItems');
        setCartItems([]);
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="App">
            <h1>Shopping App</h1>
            <div className="filter">
                <label>Min Price: </label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                />
                <label>Max Price: </label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                />
                <label>Search by Name: </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="product-list">
                {filterProducts().map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        addToCart={() => addToCart(product)}
                    />
                ))}
            </div>
            <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            />
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
}

export default App;
