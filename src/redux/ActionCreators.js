import * as ActionTypes from './ActionTypes';
//import { DISHES } from '../shared/dishes';
//import { Dishes } from './dishes';
import {baseURL} from '../shared/baseURL';
//import { Comments } from './comments';

export const addComment = (comment) => ({
     //function create action object. Tai yra arrow function
    type: ActionTypes.ADD_COMMENT,//turi tureti tipa
    payload: comment
     /*{//payload going to contain
        dishId: dishId,//defined action type
        rating: rating,
        author: author,
        comment: comment }*/
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment ={
        dishId: dishId,//defined action type
        rating: rating,
        author: author,
        comment: comment
    };

    newComment.date = new Date().toISOString();

    return fetch(baseURL + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })//request message defined
    
    .then(response => {//handling
        if(response.ok){
            return response;//jei ok tai response keliauja prie kito kreipimosi,
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);//error object, status tai skaiciai kurie apib error
            error.response = response;
            throw error;//kai throw, tai catch'ins apatiniai
        }
    },/*____Second part when dont hear back ianything from the server__*/
    error =>{
        var errmess = new Error(error.message);//contains some info about what error is related to
        throw errmess;
    })
    /*So, you will create a post message, send it to the server, and then when you receive the response,
that response should be the updated comment,and that'll be pushed into the redux store by doing the dispatch here.
If there is an error, you will just print the error inthe console log and then pop up an alert message for the user. */
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post comments', error.message);
     alert('Your comment could not be posted\nError:' + error.message)})
}
//-------------------DISHES----------------
export const fetchDishes = () => (dispatch) => //shpuld be used fetch dishes. "=> (dispatch)" gonna be returned". tai yra THUNK function
//which is containing an inner function in here. 
{
    dispatch(dishesLoading(true));

    /*setTimeout(() => {//simulation communication with the server
        dispatch(addDishes(DISHES));
    }, 2000);//delay*/

/*__receive a response from the server, but the reponse could be an error response from the server__*/
    return fetch(baseURL + 'dishes')//real communication with the server
    .then(response => {//handling
        if(response.ok){
            return response;//jei ok tai response keliauja prie kito kreipimosi,
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);//error object, status tai skaiciai kurie apib error
            error.response = response;
            throw error;//kai throw, tai catch'ins apatiniai
        }
    },/*____Second part when dont hear back ianything from the server__*/
    error =>{
        var errmess = new Error(error.message);//contains some info about what error is related to
        throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))/*That is it, so my fetchDishes is now set up to go and
    fetch the dishes and then, Once the dishes are obtained,
    then it'll push the dishes into
    the redux store here by dispatching that to the dishes.  */
    .catch(error => dispatch(dishesFailed(error.message)));//catch throwed promises
}
/*_______________________________________________________________________*/

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
export const fetchComments = () => (dispatch) =>  //shpuld be used fetch dishes. "=> (dispatch)" gonna be returned". tai yra THUNK function
//which is containing an inner function in here. 
{
    return fetch(baseURL + 'comments')//real communication with the server

    .then(response => {//handling
        if(response.ok){
            return response;//jei ok tai response keliauja prie kito kreipimosi,
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);//error object, status tai skaiciai kurie apib error
            error.response = response;
            throw error;//kai throw, tai catch'ins apatiniai
        }
    },/*____Second part when dont hear back ianything from the server__*/
    error =>{
        var errmess = new Error(error.message);//contains some info about what error is related to
        throw errmess;
    })

    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))/*That is it, so my fetchDishes is now set up to go and
    fetch the dishes and then, Once the dishes are obtained,
    then it'll push the dishes into
    the redux store here by dispatching that to the dishes. */
    .catch(error => dispatch(commentsFailed(error.message)));

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

    .then(response => {//handling
        if(response.ok){
            return response;//jei ok tai response keliauja prie kito kreipimosi,
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);//error object, status tai skaiciai kurie apib error
            error.response = response;
            throw error;//kai throw, tai catch'ins apatiniai
        }
    },/*____Second part when dont hear back ianything from the server__*/
    error =>{//output'ai neveikia serveris "Failed to fetch"
        var errmess = new Error(error.message);//contains some info about what error is related to
        throw errmess;
    })

    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));

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

/*-----------------LEADERS----------------------*/

export const fetchLeaders = () => (dispatch) => 
{
    dispatch(leadersLoading(true));


    return fetch(baseURL + 'leaders')//real communication with the server
    .then(response => {//handling
        if(response.ok){
            return response;//jei ok tai response keliauja prie kito kreipimosi,
        }
        else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);//error object, status tai skaiciai kurie apib error
            error.response = response;
            throw error;//kai throw, tai catch'ins apatiniai
        }
    },/*____Second part when dont hear back anything from the server__*/
    error =>{
        var errmess = new Error(error.message);//contains some info about what error is related to
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));//catch throwed promises
}
/*_______________________________________________________________________*/

export const leadersLoading = () => ({//going to return an action of the type
    type: ActionTypes.LEADERS_LOADING//inform somebody that the leaders are beggining to load so you need to wait, to be loaded
});

export const leadersFailed = (errmess) => ({//going to return an action of the type
    type:ActionTypes.LEADERS_FAILED,//
    payload:errmess
});

export const addLeaders = (leaders) => ({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
});

//*----------------FEEDBACK----------------- */

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType,message) => (dispatch) => {
   const newFeedback ={
       firstname: firstname,//defined action type
       lastname: lastname,
       telnum: telnum,
       email: email,
       agree:agree,
       contactType:contactType,
       message:message
   };

   return fetch(baseURL + 'feedback', {
       method: "POST",
       body: JSON.stringify(newFeedback),
       headers: {
         "Content-Type": "application/json"
       },
       credentials: "same-origin"
   })//request message defined
   
   .then(response => {//handling
       if(response.ok){
           return response;//jei ok tai response keliauja prie kito kreipimosi,
       }
       else{
           var error = new Error('Error' + response.status + ': ' + response.statusText);//error object, status tai skaiciai kurie apib error
           error.response = response;
           throw error;//kai throw, tai catch'ins apatiniai
       }
   },/*____Second part when dont hear back anything from the server__*/
   error =>{
       var errmess = new Error(error.message);//contains some info about what error is related to
       throw errmess;
   })
    .then(response => response.json())
    .then(function(response){
        alert('Thank you for your feedback! '+ JSON.stringify(response));
        return console.log(response)
    })
    .catch(error => {console.log("post feedbacks", error.message);
    alert("Your feedback could not be posted\nError: " + error.message);
});
};