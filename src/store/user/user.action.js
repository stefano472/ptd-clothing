import { USER_ACTION_TYPES } from "./user.types"
// import { createAction } from '../../utils/reducer/reducer.utils'

// export const setCurrentUser = (user) => {
//     createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
// }
export const setCurrentUser = (user) => {
    return {
        type: USER_ACTION_TYPES.SET_CURRENT_USER,
        payload: user
    }
}