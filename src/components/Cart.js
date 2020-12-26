import React, { Component } from "react";
import formatCurrency from "../util";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    console.log('cartjs', cartItems)
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

        {cartItems.length !== 0 ?  <div className="cart">
            <div className="total">
                <div>
                    Total: &nbsp;
                    {/* Reduce telt alles op en toont één resultaat. a = 0 bij start, c = object in cart array */}
                    {formatCurrency( cartItems.reduce((a, c) =>a + c.price * c.count, 0 ))}
                </div>
                <button className="button primary">Proceed</button>
            </div>
            </div> :
            ""}

       
      </div>
    );
  }
}
