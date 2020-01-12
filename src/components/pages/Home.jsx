import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, filterLowToHigh, filterHighToLow, filterRecommended } from '../actions/cartActions'
import M from 'materialize-css'

class Home extends Component {
  state = {
    items: this.props.items
  }

  componentDidMount = () => {
      var elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
  }

  handleFilter = (e) => {
    console.log(e.target.value)
    switch(e.target.value) {
      case 'low-high':
        this.props.filterLowToHigh()
        this.setState({
          items: this.props.items
        })
        break;

      case 'high-low':
        this.props.filterHighToLow()
        this.setState({
          items: this.props.items
        })

        break;

      default:
        console.log('recommended is selected')
        this.props.filterRecommended()
        this.setState({
          items: this.props.items
        })


    }
  }

    handleClick = (id,title) => {
      M.toast({html: `${title} added to cart`})
        this.props.addToCard(id)
    }
  render() {
    const itemList = this.state.items.map(item => {
      return (
        <div className="col s12 m6 l4" key={item.id} >
            <div className="card" style={{width: 'auto', height: 'auto'}}>
              <div className="card-image">
                <img src={item.img} alt={item.title} />
                <h6 className="white grey-text text-darken-3 card-content" ><b>{item.title}</b></h6>
                <a className="btn-floating halfway-fab waves-effect waves-light teal darken-3" onClick={() => {this.handleClick(item.id,item.title)}}>
                  <i className="material-icons">add</i>
                </a>
              </div>

              <div className="card-content grey darken-3 white-text">
                <p>{item.desc}</p>
                <br />
                <p>
                  <b>Price: ${item.price}</b>
                </p>
              </div>
            </div>
            </div>
     ) });

    return (
      <div className="container">
        <h3 className="center">Product List</h3>
        <div className="row">
        <div className="input-field col s8 m4 l3 right">
        
          <select onChange={this.handleFilter}>
            <option value="" disabled>filter by</option>
            <option value="recommended">Recommended</option>
            <option value="low-high">Price: low to high</option>
            <option value="high-low">Price: high to low</option>
          </select>       
          <label>Filter by</label> 
          </div>


        </div>


        <div className="row">
          {console.log('x')}
        {itemList}
        
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.cart.items
  };
};

const mapDispatchToProps = (dispatch) => {
    return{
        addToCard: (id) => {dispatch(addToCart(id))},
        filterLowToHigh: () => {dispatch(filterLowToHigh())},
        filterHighToLow: () => {dispatch(filterHighToLow())},
        filterRecommended: () => {dispatch(filterRecommended())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
