import React, {
    Component
} from 'react';
import {
    BreadcrumbItem,
    Breadcrumb,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback
} from 'reactstrap';
import {
    Link
} from 'react-router-dom';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {
                ...this.state.touched,
                [field]: true
            }
        })
    }
    validate(firstname, lastname, telnum, email) {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        };
        if (this.state.touched.firstname && firstname.length < 3) //error message jei per mazai raidziu
        {
            errors.firstname = 'First Name shppuld be >=3 characters';
        } //jei per daug
        else if (this.state.touched.firstname && firstname.length > 10) {
            errors.firstname = 'First Name shppuld be <=10 characters';
        }
        if (this.state.touched.lastname && lastname.length < 3) //error message jei per mazai raidziu
        {
            errors.lastname = 'Last Name shppuld be >=3 characters';
        } //jei per daug
        else if (this.state.touched.lastname && lastname.length > 10) {
            errors.lastname = 'Last Name shppuld be <=10 characters';
        }
        //telefono nr
        const reg = /^\d+$/; //Regex tipo nurodo kad visi turi buti skaiciai
        if (this.state.touched.telnum && !reg.test(telnum)) {
            /*testina ar tik skaiciai*/
            errors.telnum = "Tel. number should contain only numbers";
        }
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) {
            /*testina ar bent vienas is simboliu yra @ simbolis*/
            errors.email = "Email should contain a @";
        }
        return errors;
    }
    render() {
        //kvieciam funkcija
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return (
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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlfor="firstname" md={2}>First name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name" 
                                    value={this.state.firstname} 
                                    valid={errors.firstname===''} 
                                    invalid={errors.firstname!==''}
                                    onBlur={this.handleBlur('firstname')} onChange={this.handleInputChange}></Input>
                                    <FormFeedback /*atvaizduoja viska apacioje*/> 
                                        {errors.firstname}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlfor="lastname" md={2}>Last name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name" 
                                    value={this.state.lastname}
                                    valid={errors.lastname===''} //jei error tai automatiskai i tuscia langeli
                                    invalid={errors.lastname!==''} //jei error nera tai automatiskai nekeicia i tuscia langeli
                                    onBlur={this.handleBlur('lastname')} onChange={this.handleInputChange}></Input>
                                    <FormFeedback /*atvaizduoja viska apacioje*/> 
                                        {errors.lastname}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlfor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum" placeholder="Tel. number" 
                                    value={this.state.telnum}  
                                    valid={errors.telnum===''} //jei error tai automatiskai i tuscia langeli
                                    invalid={errors.telnum!==''} //jei error nera tai automatiskai nekeicia i tuscia langeli
                                    onBlur={this.handleBlur('telnum')} onChange={this.handleInputChange}></Input>
                                    <FormFeedback /*atvaizduoja viska apacioje*/> 
                                        {errors.telnum}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlfor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email" 
                                    value={this.state.email} 
                                    valid={errors.email===''} //jei error tai automatiskai i tuscia langeli
                                    invalid={errors.email!==''} //jei error nera tai automatiskai nekeicia i tuscia langeli 
                                    onBlur={this.handleBlur('email')} onChange={this.handleInputChange}></Input>
                                    <FormFeedback /*atvaizduoja viska apacioje*/> 
                                        {errors.email}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6, offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree}
                                            onChange={this.handleInputChange}/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3, offset:1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType}
                                    onChange={this.handleInputChange}> 
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlfor="message" md={2}>Your feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" placeholder=" " 
                                    row="12" value={this.state.message} onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Contact;