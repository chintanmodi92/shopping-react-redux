import { UPDATE_DETAILS } from '../actions/action-types/checkout-actions'

const initState = {
    first_name: '',
    last_name: '',
    email_inline: '',
    address_1: '',
    address_2: '',
    city: '',
    country: 'Canada',
    state: '',
    zipcode: '',
    card_number: '',
    month: 'January',
    year: '2020',
    security_code: ''
}

 const checkoutReducer = (state=initState, action) => {

    if(action.type === UPDATE_DETAILS) {
        return{
            ...state,
            [action.id]: action.val
        }
    }

    return state
 }

export default checkoutReducer