import { ADD_TO_CART, ADD_QUANTITY, SUBTRACT_QUANTITY, REMOVE_ITEM, FILTER_LOW_TO_HIGH, FILTER_HIGH_TO_LOW, FILTER_RECOMMENDED, EMPTY_CART } from './action-types/cart-actions'

export const addToCart = (id) => {
    return{
        type: ADD_TO_CART,
        id
    }
}

export const addQuantity = (id) => {
    return{
        type: ADD_QUANTITY,
        id
    }
}

export const subtractQuantity = (id) => {
    return{
        type: SUBTRACT_QUANTITY,
        id
    }
}

export const removeItem = (id) => {
    return{
        type: REMOVE_ITEM,
        id
    }
}

export const filterLowToHigh = () => {
    return{
        type: FILTER_LOW_TO_HIGH
    }
}

export const filterHighToLow = () => {
    return{
        type: FILTER_HIGH_TO_LOW
    }
}

export const filterRecommended = () => {
    return{
        type: FILTER_RECOMMENDED
    }
}

export const emptyCart = () => {
    return{
        type: EMPTY_CART
    }
}