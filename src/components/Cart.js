import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      showCheckout: false,
      email: "",
      name: "",
      address: ""
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = e => {
      e.preventDefault();
      const order = {
          name: this.state.name,
          email: this.state.email,
          address: this.state.address,
          cartItems: this.props.cartItems
      }

      this.props.createOrder(order);
  }

  render() {
    const { cartItems } = this.props;
    console.log("cartjs", cartItems);
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in the cart{" "}
          </div>
        )}

        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((items) => (
              <li key={items._id}>
                <div>
                  <img src={items.image} alt={items.title} />
                </div>
                <div>
                  <div>{items.title}</div>
                  <div className="right">
                    {formatCurrency(items.price)} x {items.count} &nbsp;
                    <button onClick={() => this.props.removeFromCart(items)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {cartItems.length !== 0 ? (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total: &nbsp;
                  {/* Reduce telt alles op en toont één resultaat. a = 0 bij start, c = object in cart array */}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  className="button primary"
                  onClick={() => this.setState({ showCheckout: true })}
                >
                  Proceed
                </button>
              </div>
            </div>

            {this.state.showCheckout && (
              <div className="cart">
                <form action="" onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        //onChange={this.handleInput}
                        onBlur={this.handleInput}
                      />
                    </li>
                    <li>
                      <label htmlFor="">Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        //onChange={this.handleInput}
                        onBlur={this.handleInput}
                      />
                    </li>
                    <li>
                      <label htmlFor="">Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        //onChange={this.handleInput}
                        onBlur={this.handleInput}
                      />
                    </li>
                    <li>
                        <button className="button primary" type="submit" onClick={console.log(this.state)}>Checkout</button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
