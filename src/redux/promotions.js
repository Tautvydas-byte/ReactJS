//import { PROMOTIONS } from '../shared/promotions'; 
//PERDARYTA PAGAL FETCH LOGIKA
import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {//extend to 3 properties. trys pieces of infomation
    isLoading: true,
    errMess : null,//jei servers fail tai bus error message
    promotions:[]//jei viskas ok, tai loading info about dishes
}, action) => {
    switch(action.type){

        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, promotions:[]};

        default:
            return state;
    }
}