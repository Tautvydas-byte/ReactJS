import React, {
  Component
} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {addComment, fetchDishes, fetchComments, fetchPromos} from "../redux/ActionCreators";
import {actions} from 'react-redux-form';

const mapStateToProps /*access to reducer.js initialState*/ = state => {
  return {
      /* become available as props to main component*/
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  /*These four are passed as parameters to the add comment, that will dispatch.
this function call where we're calling
the action creator will return the action object for adding a comment,
that action object is then given as a parameter to the dispatch function here.
So the dispatch function obtains that as a parameter,
and that we are supplying as a function here,
and this can be used within our component here.
So, going down to the connect we'll say mapDispatchToProps.
So when you connect to that,
then those that we define in the mapDispatchToProps will become available,
  so this addComment function will become available within my main component.*/
  fetchDishes: () => {dispatch(fetchDishes())},//thunk, 
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},//thunk,  fetch logika
  fetchPromos: () => {dispatch(fetchPromos())},//thunk,  fetch logika
});

class Main extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();//when main component is being mounted into view by the act application.
    //after it gets mounted the fetchDishes will be called and this will resultin a call to fetch the dishes and load it into redux's store
    //when become available, tai tampa available to my application
    this.props.fetchComments();//kai bus components mounted then it will go fetch all these from that server
    this.props.fetchPromos();
  }  

  render() {
      const HomePage = () => {
          return (//dishes.js
              <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}//dishes.js is cia info
                dishesLoading={this.props.dishes.isLoading}//marked separatly, because same thing will also apply for a promotion and leader 
                dishesErrMess={this.props.dishes.errMess}
/* {this.state.dishes.filter((dish)=>dish.featured)[0]}, bet keiciam i props kadangi komponentai po const mapStateToProps tapo pasiekiami kaip props*/
                promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}//pagal fetch logika promotions.promotions
                  promosLoading={this.props.promotions.isLoading}// 
                  promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
/>
          );
      }
      const DishWithId = ({
          match
      }) => {
          return (
              <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id===parseInt(match.params.dishId,10 ))[0]}
                  isLoading={this.props.dishes.isLoading}//marked separatly, because same thing will also apply for a promotion and leader 
                  errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10 ))}
                  CommentsErrMess={this.props.comments.errMess}
                addComment={this.props.addComment}/*used in the main component, will be passed as atribute to the DishDetail component,
                where dispatch the action to my store, nes DishDetail has access to the comment that the user submitted*//>
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
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Redirect to="/home" />
    </Switch>
    <Footer/>
  </div>
      );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
/*connect component to Redux Store. Jei naudojama Router'iai tai butinai turi buti pradzioje withRouter*/