/*nebutinai taip daryti, bet jis taip pasirinko daryti su configureStoe.js */
import {createStore} from 'redux';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {/*butonai reikia configuruoti  funkcija cretina redux store*/
    const store = createStore(
        Reducer, // reducer /*sukuriami du parametrai*/
        initialState, // our initialState
    );

    return store;
}