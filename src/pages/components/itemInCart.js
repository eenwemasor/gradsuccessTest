import React, { Component } from "react"
import PropTypes from "prop-types"
import SingleCartItem from "./SingleCartItem"
import { Link } from "gatsby"
import discouted from "../../images/10-discount.ico"

export default class itemInCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Items: [],
      totalAmount: 0,
      discountedAmount: 0,
      cartItem: 0,
      ItemInCar:null

    }

    this.DeleteItem = this.DeleteItem.bind(this)
    this.addFormLS = this.addFormLS.bind(this)
  }

  reCalcTotal = num => {
    this.setState(preState => {
      return {
        totalAmount:
          preState.totalAmount + Number(num.Price.replace(/\D/g, "")),
      }
    })
  }

  DeleteItem(item) {
    let list = JSON.parse(localStorage.getItem("ItemsInCart"))
    var newList = list.splice(item, 1)

    localStorage.setItem("ItemsInCart", JSON.stringify(list))
    this.setState({
      Items: list,
      totalAmount: 0,
    })

    list.forEach(this.reCalcTotal)
  }

  addFormLS = num => {
    let amt = 0
    let _items = this.state.Items
    _items.push(num)

    this.setState(preState => {
      return {
        totalAmount:
          preState.totalAmount + Number(num.Price.replace(/\D/g, "")),
      }
    })
  }

  componentDidMount() {
    let _item = localStorage.getItem("ItemsInCart")
    let cartItem = JSON.parse(localStorage.getItem("ItemsInCart")) || []

    if (_item) {
      _item = JSON.parse(_item)
      _item.forEach(this.addFormLS)
    }
    this.setState({
      cartItem: cartItem.length,
      ItemInCart: "itemExist"
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let cartItem = JSON.parse(localStorage.getItem("ItemsInCart")) || []

    if (cartItem.length >= 3) {
      if (
        prevState.totalAmount != this.state.totalAmount ||
        this.state.discountedAmount === 0
      ) {
        let discountedPrice = this.state.totalAmount * 0.9
        this.setState({
          discountedAmount: discountedPrice,
          cartItem: cartItem.length,
        })
      }
    }else{
      if(this.state.cartItem != 2){
           this.setState({
          cartItem: 2
          })
      }
    }
  }

  componentWillUnmount() {

    let cartItem = JSON.parse(localStorage.getItem("ItemsInCart")) || []
    if (cartItem.length >= 3) {
      localStorage.setItem("CheckoutAmount", this.state.discountedAmount)
    } else {
      localStorage.setItem("CheckoutAmount", this.state.totalAmount)
    }
  }

  render() {
    return (
      <div>
       {this.state.ItemInCart === null ? <div className = "emptyCart">Nothing in Cart</div>:
        <div className="cart-container">
          {this.state.cartItem >= 3 && (
            <img className="discounted" src={discouted} alt="Promo Discount" />
          )}
          <div className="cart-container-inner">
            <h1>Cart</h1>
            <div className="cart-header-wrapper">
              <div className="cart-header cart-layout">
                <div>S/N</div>
                <div>Item Description</div>
                <div>Price (N) </div>
                <div />
              </div>
            </div>
            {this.state.Items.map((item, index) => (
              <SingleCartItem
                key={index}
                index={index}
                price={item.Price}
                desc={item.IitemDescription}
                delFunc={this.DeleteItem}
              />
            ))}

            <div className="cart-footer-wrapper">
              <div className="cart-footer cart-layout">
                <div />
                <div>Total</div>

                {this.state.cartItem >= 3 && (
                  <div className  = "priceContainer">
                    <span className="strikedPrice">
                      N
                      {this.state.totalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span className  = "disPrice">
                      N
                      {this.state.discountedAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                )}

                {this.state.cartItem < 3 && (
                  <div>
                    <span>
                      N
                      {this.state.totalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btn-wrap">
            <Link to="/Checkout">
              <button className="checkout-button">Checkout</button>
            </Link>
          </div>
        </div>
      }
      </div>
    )
  }
}
