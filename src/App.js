import React, { Component } from "react";
import "./App.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: []
    };
  }

  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(item => item._id !== product._id)})
  }

  addToCart = (product) => {
    // de .slice() maakt een copy
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      // Check if item is already in cart
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({
        ...product, count: 1
      })

      console.log(cartItems)
    }

    console.log(this.state)
    this.setState({
       ...this.state,
       cartItems: cartItems
     })
     console.log(cartItems)

  }



  sortProducts = (e) => {
    const sort = e.target.value; //highest or lowest
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) => // slice makes a copy to make "latest" possible!!!
      sort === 'lowest' ? a.price > b.price ? 1:-1: sort === 'highest' ? a.price < b.price ? 1 : -1 : a._id > b.id ? 1 : -1)
    })
    )
    console.log(e.target.value, "sort");
  };

  filterProducts = (e) => {
    console.log(e.target.value, "sort");
    console.log(data)
    if(e.target.value ===''){
      this.setState({
        ...this.state,
        size: e.target.value,
        products: data.products
      })
    }else{
      console.log(e.target.value)
      this.setState({
        ...this.state,
        size: e.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(e.target.value)>=0)
      })
    }
    
  };

  render() {
    console.log(this.state)
    return (
      <div className="App grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar"><Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/></div>
          </div>
        </main>
        <footer>foot</footer>
      </div>
    );
    }}