import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();/*tik db available to me*/

class App extends Component {

  render() {  
    return (
      <Provider store={store}/*store db pasiekiama visiems komponentams*/>
        <BrowserRouter /*adding BrowserRouter. the application now is congigured to make use of the react router*/>
            <div className="App">
                <Main /> 
            </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;