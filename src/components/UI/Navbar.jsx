import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { connect } from "react-redux";

class Navbar extends Component {
  componentDidMount = () => {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, { edge: "right" });
    });
  };

  render() {
    return (
      <nav className="nav-wrapper teal darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">
            Sho(ep)ping
          </Link>

          <a
            href="/"
            data-target="mobile-demo"
            className="sidenav-trigger right"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Shop</Link>
            </li>
            
            <li style={{ paddingTop: "8px" }}>
              <Link to="/cart">
                <span
                  className="badge white-text"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "12px"
                  }}
                >
                  {this.props.quantity}
                </span>
                <span
                  className="material-icons"
                  style={{ display: "block", textAlign: "center" }}
                >
                  shopping_cart
                </span>
              </Link>
            </li>
          </ul>

          <ul className="sidenav" id="mobile-demo">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="material-icons">shopping_cart</i>
                <span className="new badge white-text" data-badge-caption="items">
                {this.props.quantity}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    quantity: state.cart.totalQuantity
  };
};

export default connect(mapStateToProps)(Navbar);
