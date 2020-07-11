/*nebutinai taip daryti, bet jis taip pasirinko daryti su configureStore.js */
import {createStore, combineReducers, applyMiddleware } from 'redux';
//import { Reducer, initialState } from './reducer'
import { createForms } from 'react-redux-form';//forms.js
import { Dishes} from './dishes';
import { Comments} from './comments';
import { Promotions} from './promotions';
import { Leaders} from './leaders';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';
//import { PROMOTIONS } from '../shared/promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './forms'


export const ConfigureStore = () => {/*butonai reikia configuruoti  funkcija creatina redux store*/
    const store = createStore(
        //Reducer, // reducer /*sukuriami du parametrai*/
        //initialState, // our initialState
        combineReducers({/*apibreziam kaip reikia combineReducer, kuriuos defined here (importinom) */
/*Recomposed the global state for our application. Cia yra isskirti keturiuose skirtinguose failuose reduceriai ir sitoje funkcijoje sujungiame i viena */
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)//supplied into store as enhancers for our store 
    );

    return store;
}