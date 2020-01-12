import cartReducer from './cartReducer'
import checkoutReducer from './checkoutReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    cart: cartReducer,
    checkout: checkoutReducer
})

export default rootReducer