import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateDetails } from '../actions/checkoutActions'


class Checkout extends Component {

  State = this.props.details

    handleBilling = (e) => {
      e.preventDefault()

      var elems = document.querySelectorAll(".collapsible");
      var instance = M.Collapsible.init(elems);
      instance[0].open(1)


    }

    handleSubmit = (e) => {
       e.preventDefault();
    }

    handleChange = (e) => {

      const id = e.target.id
      const val = e.target.value
      this.props.updateDetails(id,val)
    }

  componentDidMount = () => {
       var elemSelect = document.querySelectorAll("select");
       M.FormSelect.init(elemSelect);

       var elems = document.querySelectorAll(".collapsible");
       M.Collapsible.init(elems);

         var elemTool = document.querySelectorAll('.tooltipped');
         M.Tooltip.init(elemTool);

  };

  render() {
    const billingDetails = (
      <form onSubmit={this.handleBilling}>
        <div className="row">
          <div className="input-field col s12 m6 l6" style={{ margin: "0px" }}>
            <input id="first_name" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s12 m6 l6" style={{ margin: "0px" }}>
            <input id="last_name" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field inline col s12" style={{ margin: "0px" }}>
            <input id="email_inline" type="email" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="email_inline">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12" style={{ margin: "0px" }}>
            <input id="address_1" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="address_1">Address line 1</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12" style={{ margin: "0px" }}>
            <input id="address_2" type="text" onChange = {this.handleChange} />
            <label htmlFor="address_2">Address line 2 (optional)</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12" style={{ margin: "0px" }}>
            <input id="city" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="city">City</label>
          </div>
        </div>


        <div className="row">
          <div className="input-field col s12" style={{ margin: "0px" }}>
            <select id='country' onChange = {this.handleChange} >
              <option value="" disabled>
                Country
              </option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States of America">United States of America</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12 m6 l6" style={{ margin: "0px" }}>
            <input id="state" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="state">State/Province</label>
          </div>
          <div className="input-field col s12 m6 l6" style={{ margin: "0px" }}>
            <input id="zipcode" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="zipcode">Zip/Postal Code</label>
          </div>
        </div>

        <button className="btn teal darken-3 white-text billing" 
                >
                Continue to payment
              </button>

      </form>
    );

    const paymentDetails = (
      <form onSubmit={this.handleSubmit}>

        <div className="row">
          <div className="input-field col s10">
            <input id="card-number" type="text" className="validate" required onChange = {this.handleChange} />
            <label htmlFor="card-number">Card number</label>
          </div>
        </div>

        <div className="row">
            <div className="input-field col s5">
                <select id='month' onChange = {this.handleChange}>
                <option value="" disabled>Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
                </select>
                <label>Expiration Month/Year</label>
            </div>    

            <div className="input-field col s3">
                <select id='year' onChange = {this.handleChange}>
                <option value="" disabled>Year</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                </select>
            </div>      
  
                <div className="input-field col s4">
                <input id="security_code" type="password" className="validate" required onChange = {this.handleChange} />
                <label htmlFor="security_code">CVV
                <span className="tooltipped right" data-position="top" data-tooltip='The CVV Number ("Card Verification Value") on your credit card or debit card is a 3 digit number on VISA®, MasterCard® and Discover® branded credit and debit cards. On your American Express® branded credit or debit card it is a 4 digit numeric code.'>
                    <i className="material-icons">info</i>
                </span>

                </label>
                </div>
            </div>
            <Link to="/confirmation">
            <button className="btn teal darken-3 white-text" 
                >
                Place your order
              </button>
              </Link>
                
      </form>
    );

    const summaryCard = this.props.items.map(item => {
      return (
        <div
          className="card-content row"
          key={item.id}
          style={{ paddingTop: "0px", marginBottom: "0px" }}
        >
          <div className="col s8">
            <p>
              <b>
                {item.quantity} x {item.title}
              </b>
            </p>
            <p>{item.desc}</p>
          </div>
          <div className="col s4 right-align">
            <p>
              <b>${item.price*item.quantity}</b>
            </p>
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m7 l7">
            <ul className="collapsible" style={{ marginTop: "20px" }}>
              <li className="active">
                <div className="collapsible-header">
                  <h4 style={{ margin: "0px" }}>Billing Details</h4>
                </div>
                <div className="collapsible-body">{billingDetails}

                </div>
              </li>

              <li>
                <div className="collapsible-header">
                  <h4 style={{ margin: "0px" }}>Payment Details</h4>
                </div>
                <div className="collapsible-body">{paymentDetails}
                


                </div>
              </li>
            </ul>
          </div>
          <div className="col s12 m5 l5">
            <div className="card"> 
              <h4 style={{ padding: "20px" }}>Cart Summary</h4>
              {summaryCard}
              <div className="card-content row" style={{ marginBottom: "0px", paddingTop: "0px", paddingBottom: "0px" }}>
                  <div className="col s12">
                    <p>
                        <b>Total price</b>
                        <b className='right'>${this.props.total}</b>
                    </p>
                  </div>
              </div>
              <Link
                to="/cart"
                className="btn teal darken-3 white-text"
                style={{ margin: "20px" }}
              >
                Edit Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.cart.addedItems,
    total: state.cart.total,
    details: state.checkout
  };
};

const dispatchStateToProps = (dispatch) => {
  return{
    updateDetails: (id,val) => {dispatch(updateDetails(id,val))},
  }
}



export default connect(mapStateToProps,dispatchStateToProps)(Checkout);
