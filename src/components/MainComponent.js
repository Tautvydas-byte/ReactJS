import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps /*access to reducer.js initialState*/= state => {
    return {/* become available as props to main component*/
        dishes:state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders

    }
}

class Main extends Component {
  constructor(props) {
    super(props);

  
  }

 

  render() {

const HomePage = () => {
  return(
    <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
    /* {this.state.dishes.filter((dish)=>dish.featured)[0]}, bet keiciam i props kadangi komponentai po const mapStateToProps tapo pasiekiami kaip props*/
    promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
    leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
    />
  );
}

const DishWithId= ({match}) => {
  return(
    <DishDetail dish={this.props.dishes.filter((dish) => dish.id===parseInt(match.params.dishId,10 ))[0]}
      comments={this.props.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10 ))}/>
  );
};

    return (
      <div>
        <Header/>     
        <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders}/>}
              /*component nes about yra su props leaderiu vardai, todel reikia ir juos paimti, todel netink tiesiog  component={About} *//> 
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId}/>
              <Route exact path="/contactus" component={Contact}/>
              <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
/*connect component to Redux Store. Jei naudojama Router'iai tai butinai turi buti pradzioje withRouter*/