//import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {//extend to 3 properties. trys pieces of infomation
    isLoading: true,
    errMess : null,//jei servers fail tai bus error message
    dishes:[]//jei viskas ok, tai loading info about dishes
}, action) => {/* */
    switch(action.type){//switch shoudl able to switch between  the 3 different action types, that going to receive here
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes:[]};

        default:
            return state;
    }
};