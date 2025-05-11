import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import PropTypes from "prop-types";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const quantity = cartItems?.[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={`${url}/images/${image}`} alt={name} className="food-item-image" />

        {quantity === 0 ? (
          <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add to cart" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove one" />
            <p>{quantity}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add one more" />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItem;
