import React, { Component } from "react";
import "./App.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>foot</footer>
      </div>
    );
    }}