import React, {Component} from 'react';
import {BreadcrumbItem, Breadcrumb, Button, Form, FormGroup, Label, Input, Col, FormFeedback,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;//value > 0 tikrina
const maxLength = (len) => (val) => !(val) || (val.length <= len);//
const minLength = (len) => (val) => (val) && (val.length >= len);//
const isNumber = (val) => !isNaN(Number(val));// tikrina kad tai butu numeris
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);//tikrina email ar tinkamai suvesta. {2,4} tai asd@fgh.COM nuo 2 iki max 4, po tasko simboliu



class Contact extends Component {
    
    constructor(props){
        super(props);

        /*this.state={ nereikia nes pakeisim i react-redux-form naudojima
            firstname:'',
            lastname:'',
            telnum:'',
            email:'',
            agree:false,
            contactType:'Tel.',
            message:'',
            touched:{
                firstname: false,
                lastname: false,
                telnum: false,
                email:false
            }
        }*/

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);nereikia nes pakeisim i react-redux-form naudojima
        //this.handleBlur = this.handleBlur.bind(this); nereikia nes pakeisim i react-redux-form naudojima
    }
    /*handleInputChange(event){nereikia nes pakeisim i react-redux-form naudojima
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
          });
    }*/
    /*handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }*/
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    /*handleBlur=(field)=>(evt)=>{nereikia nes pakeisim i react-redux-form naudojima
        this.setState({
            touched:{...this.state.touched, [field]:true}
        })
    }*/

   /* validate(firstname, lastname, telnum,email) {
        const errors = {
            firstname:'',
            lastname:'',
            telnum:'',
            email:''
        };

        if(this.state.touched.firstname && firstname.length<3)//error message jei per mazai raidziu
        {
            errors.firstname = 'First Name shppuld be >=3 characters';
        }//jei per daug
        else if(this.state.touched.firstname && firstname.length> 10){
            errors.firstname = 'First Name shppuld be <=10 characters';
        }
        if(this.state.touched.lastname && lastname.length<3)//error message jei per mazai raidziu
        {
            errors.lastname = 'Last Name shppuld be >=3 characters';
        }//jei per daug
        else if(this.state.touched.lastname && lastname.length> 10){
            errors.lastname = 'Last Name shppuld be <=10 characters';
        }

        //telefono nr
        const reg=/^\d+$/;//Regex tipo nurodo kad visi turi buti skaiciai
        if(this.state.touched.telnum && !reg.test(telnum)){/*testina ar tik skaiciai*/
            /* errors.telnum ="Tel. number should contain only numbers";
        }
        if(this.state.touched.email && email.split('').filter(x=>x ==='@').length !==1)
        { testina ar bent vienas is simboliu yra @ simbolis
            errors.email ="Email should contain a @";
        }

        return errors;
    }*/
    
    render(){
        //kvieciam funkcija (nereikia nes pakeisim i react-redux-form naudojima)
       // const errors = this.validate(this.state.firstname,this.state.lastname,this.state.telnum,this.state.email);
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Contact US</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact us</h3> <hr/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)/*values ,nes redux-form ir passed handle automatically by the aplication*/}>
                            
                            <Row className="form-group">
                                <Label htmlfor="firstname" md={2}>First name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname" placeholder="First Name" 
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)//jei required true, same su min ir max
                                    }}/>
                                    <Errors
                                        className="text-danger" model=".firstname" show="touched" messages={{
                                            required:'Required', /*jei required true tai ismes 'Required, same su min ir max'*/
                                            minLength:'Must be greater than 2 charachters',
                                            maxLength:'Must be 15 character or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group" /*Formgroup row*/>
                                <Label htmlfor="lastname" md={2}>Last name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" placeholder="Last Name" 
                                    className="form-control"
                                     validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)//jei required true, same su min ir max
                                    }}/>
                                      <Errors
                                        className="text-danger" model=".lastname" show="touched" messages={{
                                            required:'Required', /*jei required true tai ismes 'Required, same su min ir max'*/
                                            minLength:'Must be greater than 2 charachters',
                                            maxLength:'Must be 15 character or less'
                                        }}/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlfor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum" placeholder="Tel. number" 
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15),isNumber//jei required true, same su min ir max
                                    }}/>
                                     <Errors
                                        className="text-danger" model=".telnum" show="touched" messages={{
                                            required:'Required', /*jei required true tai ismes 'Required, same su min ir max'*/
                                            minLength:'Must be greater than 2 numbers',
                                            maxLength:'Must be 15 numbers or less',
                                            isNumber:'Must be a number'
                                        }}/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlfor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" placeholder="Email"
                                    className="form-control"
                                    validators={{
                                        required, validEmail //jei required true, 
                                    }}/>
                                      <Errors
                                        className="text-danger" model=".email" show="touched" messages={{
                                            required:'Required', /*jei required true tai ismes 'Required, same su min ir max'*/
                                            minLength:'Must be greater than 2 numbers',
                                            maxLength:'Must be 15 numbers or less',
                                            validEmail:'Invali Email Adress'
                                        }}/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:6, offset:2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" className="form-check-input"/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size:3, offset:1}}>
                                    <Control.select model=".contactType" name="contactType" 
                                    className="form-control">
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlfor="message" md={2}>Your feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" placeholder=" "
                                    row="12" className="form-control"/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;