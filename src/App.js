import React, { Component } from 'react'
import './App.css'
import data from './data.json'
import Products from './components/Products';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
  }

  render() {
    return (
      <div className="App grid-container">
      <header>
        <a href="/">React shopping cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main"><Products products={this.state.products}/></div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>
        foot
      </footer>
    </div>
    )
  }
}
