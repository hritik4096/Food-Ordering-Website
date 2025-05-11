import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Check if there's at least one item in the order
    if (orderItems.length === 0) {
      alert("Please add items to your cart before placing an order.");
      return;
    }

    // Ensure all fields are filled
    if (Object.values(data).some((value) => value === "")) {
      alert("Please fill in all the address fields.");
      return;
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Delivery fee of 2 added
    };

    try {
      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` } // Send token in the correct format
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing the order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("There was an error processing your order. Please try again later.");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.zipcode}
            name="zipcode"
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={data.phone}
          name="phone"
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
        </div>
        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
