import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { Dishes } from './dishes';

export const addComment = (dishId, rating, author, comment) => ({
     //function create action object. Tai yra arrow function
    type: ActionTypes.ADD_COMMENT,//turi tureti tipa
    payload: {//payload going to contain
        dishId: dishId,//defined action type
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => //shpuld be used fetch dishes. "=> (dispatch)" gonna be returned". tai yra THUNK function
//which is containing an inner function in here. 
{
    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);//delay

}

export const dishesLoading = () => ({//going to return an action of the type
    type: ActionTypes.DISHES_LOADING//inform somebody that the dishes are beggining to load so you need to wait, to be loaded
});

export const dishesFailed = (errmess) => ({//going to return an action of the type
    type:ActionTypes.DISHES_FAILED,//
    payload:errmess
});

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});
