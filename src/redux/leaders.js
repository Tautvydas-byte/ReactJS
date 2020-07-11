//import { LEADERS } from '../shared/leaders';
import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {//extend to 3 properties. trys pieces of infomation
    isLoading: true,
    errMess : null,//jei servers fail tai bus error message
    leaders:[]//jei viskas ok, tai loading info about leaders
}, action) => {/* */
    switch(action.type){//switch shoudl able to switch between  the 3 different action types, that going to receive here
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders:[]};

        default:
            return state;
    }
};