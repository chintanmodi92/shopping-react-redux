import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addQuantity, subtractQuantity, removeItem } from '../actions/cartActions'

class Cart extends Component {

    handleAddQuantity = (id) => {
        this.props.addQuantity(id)
    }

    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id)
    }

    handleRemove = (id) => {
        this.props.removeItem(id)
    }


  render() {
    const addedItems = this.props.items.map(item => {
      return (
        <div className="card z-depth-2" key={item.id}>
        <div className="row">
          
            <div className="col s12 m4 l4">
              <div className="card-image">
                <img src={item.img} alt={item.title} />
              </div>
            </div>

            <div className="col s12 m8 l8">
              <div className="card-content">
                <span className="card-title">  {item.title}</span>
                <p>
                  {item.desc}
                </p>
                <p>
                  <b>Price: ${item.price}</b>
                </p>
                <p>
                  <b>Quantity: {item.quantity}</b>
                </p>
                <div className="add-remove">
                    <Link to='/cart' onClick={()=>{this.handleAddQuantity(item.id)}}><i className="material-icons small">arrow_drop_up</i></Link>
                    <Link to='/cart' onClick={()=>{this.handleSubtractQuantity(item.id)}}><i className="material-icons small">arrow_drop_down</i></Link>
                </div>
                <button className="waves-effect waves-light btn red darken-4 remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    const checkoutButton = (this.props.total !== 0) ? ( <button className="btn teal darken-3 right" type="submit" style={{marginTop: "12px"}}>Checkout
    </button> ): ( <button className="btn teal darken-3 right disabled" type="submit" style={{marginTop: "12px"}}>Checkout
            </button> )

    return (
      <div className="container">
        <div className="row" style={{marginTop: "12px"}}>
          <div className="col s8">
            <h5>Total Price: <strong>${this.props.total}</strong></h5>
          </div>
          <div className="col s4">
          <Link to='/checkout'>{checkoutButton}</Link>
          </div>
        </div>

        {addedItems}
        
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    items: state.cart.addedItems,
    total: state.cart.total
  };
};

const mapDispatchToProps = dispatch => {
    return{
        removeItem: (id) => {dispatch(removeItem(id))},
        addQuantity: (id) => {dispatch(addQuantity(id))},
        subtractQuantity: (id) => {dispatch(subtractQuantity(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
