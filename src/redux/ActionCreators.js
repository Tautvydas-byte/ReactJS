import * as ActionTypes from './ActionTypes';

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


