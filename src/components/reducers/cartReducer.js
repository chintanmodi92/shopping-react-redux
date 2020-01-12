import Item1 from "../../img/item1.jpg";
import Item2 from "../../img/item2.jpg";
import Item3 from "../../img/item3.jpg";
import Item4 from "../../img/item4.jpg";
import Item5 from "../../img/item5.jpg";
import Item6 from "../../img/item6.jpg";
import {
  ADD_TO_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  REMOVE_ITEM,
  FILTER_LOW_TO_HIGH,
  FILTER_HIGH_TO_LOW,
  FILTER_RECOMMENDED,
  EMPTY_CART
} from "../actions/action-types/cart-actions";
import { loadState, saveState } from '../localStorage'

const initState = {
  items: [
    {
      id: 1,
      title: "Yeezy 700 Wave",
      desc:
        "Developed by Kanye West, the Adidas Yeezy Boost 700 is a running sneaker-inspired model with a chunky sole. They also sport a combination of the upper, Boost cushioning, and a rubber outsole.",
      price: 350,
      img: Item1
    },
    {
      id: 2,
      title: "Nike Element 87",
      desc:
        "Adding vintage elements to a new silhouette, the Nike React Element 87 borrows design lines from heritage runners like the Nike Internationalist. It's all meant to add '90s graphics in bold colors.",
      price: 135,
      img: Item6
    },
    {
      id: 3,
      title: "Nike Airmax 270",
      desc:
        "The bold silhouette of Nike Air lifts the Nike Air Max 270 React to new heights, while the Nike React foam midsole delivers exceptional cushioning. Imagine all-day comfort with unstoppable style.",
      price: 165,
      img: Item2
    },
    {
      id: 4,
      title: "Puma RS x TOYS",
      desc:
        "X marks extreme. Exaggerated. The new RS-X tells stories of reinvention to the extreme. Design inspired by collectible vinyl toys, it celebrates the reinvention of toys in and beyond sneaker culture.",
      price: 120,
      img: Item3
    },
    {
      id: 5,
      title: "Adidas NMD CS2",
      desc:
        "Step into the NMD CS2 Primeknit from adidas Originals for the retro style. The sleek slip-on design and embroidered details ensure you’ll stand out, and the sock-like upper gives you a snug, secure fit.",
      price: 95,
      img: Item4
    },
    {
      id: 6,
      title: "Air Jordan 1",
      desc:
        "Continuing the legacy that goes back to 1985, the Men's Air Jordan 1 Mid Retro Basketball Shoes offers a look that ballers and sneakerheads everywhere just can't get enough of style and comfort wear.",
      price: 160,
      img: Item5
    },
  ],
  addedItems: [],
  totalQuantity: 0,
  total: 0,
  orderSummary: []
};

const cartReducer = (state = initState, action) => {

  switch (action.type) {
    case ADD_TO_CART:
      let addedItem = state.items.find(item => item.id === action.id);
     
      //console.log(addedItem);
      let existed_item = state.addedItems.find(item => action.id === item.id);
      let initQuantity = state.totalQuantity;

      //console.log(existed_item);
      if (existed_item) {
        addedItem.quantity += 1;
        initQuantity += 1;
        saveState({
          ...state,
          total: state.total + addedItem.price,
          totalQuantity: initQuantity
        })
        return {
          ...state,
          total: state.total + addedItem.price,
          totalQuantity: initQuantity
        };
      } else {
        addedItem.quantity = 1;
        initQuantity += 1;
        saveState({
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: state.total + addedItem.price,
          totalQuantity: initQuantity
        })
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: state.total + addedItem.price,
          totalQuantity: initQuantity
        };
      }

    case ADD_QUANTITY:
      let addItem = state.items.find(item => item.id === action.id);
      let addQuantity = state.totalQuantity
      addItem.quantity += 1
      addQuantity += 1
      saveState({
        ...state,
        total: state.total + addItem.price,
        totalQuantity: addQuantity
      })

      return{
        ...state,
        total: state.total + addItem.price,
        totalQuantity: addQuantity
      }

    case SUBTRACT_QUANTITY:
      let subItem = state.items.find(item => item.id === action.id);
      let subQuantity = state.totalQuantity
      subItem.quantity -= 1
      subQuantity -= 1
      if(subItem.quantity<=0){
        let selectedItem = state.items.find(item => item.id === action.id);
        let newItems  = state.addedItems.filter( item => !(item.id === action.id))
  
        saveState({
          ...state,
          addedItems: newItems,
          total: state.total - selectedItem.price,
          totalQuantity: subQuantity
        })
        
        return{
          ...state,
          addedItems: newItems,
          total: state.total - selectedItem.price,
          totalQuantity: subQuantity
        }
  
      } else{

        saveState({
          ...state,
          total: state.total - subItem.price,
          totalQuantity: subQuantity
        })
        return{
          ...state,
          total: state.total - subItem.price,
          totalQuantity: subQuantity
        }  
      }

    case REMOVE_ITEM:

      let selectedItem = state.items.find(item => item.id === action.id);
      let newItems  = state.addedItems.filter( item => !(item.id === action.id))
      let removeQuantity = state.totalQuantity
      
      removeQuantity -= selectedItem.quantity

      saveState({
        ...state,
        addedItems: newItems,
        total: state.total - (selectedItem.price*selectedItem.quantity),
        totalQuantity: removeQuantity
      })

      return{
        ...state,
        addedItems: newItems,
        total: state.total - (selectedItem.price*selectedItem.quantity),
        totalQuantity: removeQuantity
      }


    case FILTER_LOW_TO_HIGH:
      let filterLowItems = state.items.sort((a,b) => {
        if(a.price<b.price){
          return -1
        }
        if(a.price>b.price){
          return 1
        }
        return 0
      })
      //console.log(filterLowItems)

      return{
        ...state,
        items: filterLowItems
      }

      case FILTER_HIGH_TO_LOW:
        let filterHighItems = state.items.sort((a,b) => {
          if(a.price>b.price){
            return -1
          }
          if(a.price<b.price){
            return 1
          }
          return 0
        })
        //console.log(filterLowItems)
  
        return{
          ...state,
          items: filterHighItems
        }

        
        case FILTER_RECOMMENDED:
          let filterRecItems = state.items.sort((a,b) => {
            if(a.id<b.id){
              return -1
            }
            if(a.id>b.id){
              return 1
            }
            return 0
          })
          //console.log(filterLowItems)
    
          return{
            ...state,
            items: filterRecItems
          }
    

    case EMPTY_CART:
          console.log('cart emptied')
      const orderSummary = state.addedItems

      saveState({
        ...state,
        addedItems: [],
        total: 0,
        totalQuantity: 0,
        orderSummary
      })
      return {
        ...state,
        addedItems: [],
        total: 0,
        totalQuantity: 0,
        orderSummary
      };


    

    default:
      if(loadState()){
        return loadState();
      } else{
        return state
      }
      
      
  }
};

export default cartReducer;
