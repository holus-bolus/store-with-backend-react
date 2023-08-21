import './Product.css'
export const Product = ({ product, addToCart }) => {
    return (
        <div className="product">
            <img src={product.image} alt={product.name} className="product__image"/>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};
