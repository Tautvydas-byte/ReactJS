import React, {
    Component
} from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    BreadcrumbItem,
    Breadcrumb,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Col,
    Row
} from 'reactstrap';
import {
    Link
} from 'react-router-dom';
import {
    Control,
    Errors,
    LocalForm
} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length; //value > 0 tikrina
const maxLength = (len) => (val) => !(val) || (val.length <= len); //
const minLength = (len) => (val) => (val) && (val.length >= len); //
class CommentForm extends Component {
    /*Klase kvieciu funkcijoje function RenderComments({comments})*/
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false //kai ijungsi tinklapi modal neveiks, jei true tai iskart isoksta be mygtuko paspaudimo modal
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author,values.comment);
    }
    render() {
        return (
            <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil"/> Submit Comment
                    </Button>
                    <Modal 
                        isOpen={this.state.isModalOpen} 
                        toggle={this.toggleModal}
                    >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit} >
                            
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select 
                                        model=".rating" 
                                        name="rating" 
                                        className="form-control">

                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="yourName" md={12}>Your Name</Label>
                                <Col md={12}>
                                 <Control.text 
                                    model=".yourName" 
                                    id="yourName" 
                                    name="yourName" 
                                    placeholder="Your Name"  
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)//jei required true, same su min ir max
                                    }}/>
                                <Errors
                                        className="text-danger" 
                                        model=".yourName" 
                                        show="touched" 
                                        messages={{
                                        required:'Required! ', /*jei required true tai ismes 'Required, same su min ir max'*/
                                        minLength:'Must be greater than 2 charachters',
                                        maxLength:'Must be 15 character or less'
                                        }}
                                    />
                                 </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlfor="SubmitComment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea 
                                        model=".SubmitComment"
                                        id="SubmitComment"
                                        name="SubmitComment" 
                                        placeholder=" "
                                        rows={6} 
                                        className="form-control"
                                    />
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({
    dish
}) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
        )
    } else {
        return (<div></div>)
    }
}

function RenderComments({
    comments,
    addComment, 
    dishId
}) {
    if (comments == null) {
        return (<div></div>)
    }
    const cmnts = comments.map(comment => {
        return (
            <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts} 
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/*pasiekiami nes jau extractini kaip props*//>
            </div>
    )
}
const DishDetail = (props) => {
    if(props.isLoading){
        return(//imported "Loading component"
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(//render "Error message"
        <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
        );
    }
    
    //const dish=this.props.dish
    else if (props.dish != null) {
        // const dishItem = this.renderDish(this.props.dish)
        // const commentItem = this.renderComments(this.props.dish.comments)
        return (
            <div className='container'>
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to='/menu'>Menu</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3> <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}//came as parameter
                        dishId = {props.dish.id}//
                        />
                    </div>
                </div>
        );
    } 
    else {
        return (<div></div>);
    }
}
export default DishDetail;