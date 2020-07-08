import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { Dishes } from './dishes';
import {baseURL} from '../shared/baseURL';
import { Comments } from './comments';

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
//-------------------DISHES----------------
export const fetchDishes = () => (dispatch) => //shpuld be used fetch dishes. "=> (dispatch)" gonna be returned". tai yra THUNK function
//which is containing an inner function in here. 
{
    dispatch(dishesLoading(true));

    /*setTimeout(() => {//simulation communication with the server
        dispatch(addDishes(DISHES));
    }, 2000);//delay*/

    return fetch(baseURL + 'dishes')//real communication with the server
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));/*That is it, so my fetchDishes is now set up to go and
    fetch the dishes and then, Once the dishes are obtained,
    then it'll push the dishes into
    the redux store here by dispatching that to the dishes.  */

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
// --------------COMMENTS-----------------
export const fetchComments = () => (dispatch) => //shpuld be used fetch dishes. "=> (dispatch)" gonna be returned". tai yra THUNK function
//which is containing an inner function in here. 
{
    return fetch(baseURL + 'comments')//real communication with the server
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));/*That is it, so my fetchDishes is now set up to go and
    fetch the dishes and then, Once the dishes are obtained,
    then it'll push the dishes into
    the redux store here by dispatching that to the dishes. */
}

export const commentsFailed = (errmess) => ({//going to return an action of the type
    type:ActionTypes.COMMENTS_FAILED,//
    payload:errmess
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});
//---------------------PROMOS------------------
export const fetchPromos = () => (dispatch) => 
{
    dispatch(promosLoading(true));

    return fetch(baseURL + 'promotions')//real communication with the server
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));

}

export const promosLoading = () => ({//going to return an action of the type
    type: ActionTypes.PROMOS_LOADING//inform somebody that the dishes are beggining to load so you need to wait, to be loaded
});

export const promosFailed = (errmess) => ({//going to return an action of the type
    type:ActionTypes.PROMOS_FAILED,//
    payload:errmess
});

export const addPromos = (promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});