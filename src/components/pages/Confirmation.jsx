import React, { Component } from "react";
import { connect } from "react-redux";
import { emptyCart } from '../actions/cartActions'

class Confirmation extends Component {
  componentDidMount = () => {
    console.log(this.props.details);
    this.props.emptyCart();
  };

  render() {

    const randID = "SHSP" + Math.floor(Math.random()*1000000000)
    const summaryCard = this.props.orderSummary.map(item => {
      return (
        <div
          className="card-content row"
          key={item.id}
          style={{ paddingTop: "0px", marginBottom: "0px" }}
        >
          <div className="col s8">
            <p>
              <b>
                {item.title}
              </b>
            </p>
          </div>
          <div className="col s4 right-align">
            <p>
              <b>{item.quantity}</b>
            </p>
          </div>
        </div>
      );
    });

    const detailsInfo = (
      <div className="row">
        <div className="col s12 m6 l6">
          <h5 className="center">Shipping address</h5>
          <br />
          <p>
            <b>
              {this.props.details.first_name} {this.props.details.last_name}
            </b>
          </p>
          <p>{this.props.details.address_1}</p>
          <p>{this.props.details.address_2}</p>
          <p>
            {this.props.details.state} {this.props.details.zipcode}
          </p>
          <p>{this.props.details.country}</p>

          <p>
            <b>Email: {this.props.details.email_inline}</b>
          </p>
        </div>
        <div className="col s12 m6 l6 card">
          <h5 className="center">
            <b>Your order summary ({randID})</b>
          </h5>
          <br />
          <br />
          {summaryCard}
        </div>
      </div>
    );

    return (
      <div className="container">
        <h4 className="center" style={{ padding: "20px" }}>
          Congratulations! Your order has been confirmed.
        </h4>
        {detailsInfo}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //items: state.cart.addedItems,
    total: state.cart.total,
    details: state.checkout,
    orderSummary: state.cart.orderSummary
  };
};

const dispatchStateToProps = (dispatch) => {
  return {
    emptyCart: () => {dispatch(emptyCart())}
  }
}

export default connect(mapStateToProps,dispatchStateToProps)(Confirmation);
