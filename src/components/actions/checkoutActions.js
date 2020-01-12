import { UPDATE_DETAILS } from './action-types/checkout-actions'

export const updateDetails = (id,val) => {
    return{
        type: UPDATE_DETAILS,
        id,
        val
    }
}