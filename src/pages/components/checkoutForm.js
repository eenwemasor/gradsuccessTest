import { React, Component } from 'react';
import CheckoutSummary from './checkoutSummary'
import { Link } from "gatsby"
import { Mutation } from 'react-apollo';
import { CREATE_CLIENT_ACCOUNT } from '../graphql/mutations';
import loader from "../../images/loader.gif"
import PaystackButton from 'react-paystack';

export default class checkoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "pk_test_33a9728f0c72c40804064e98287220d2353d2083", //PAYSTACK PUBLIC KEY
            amount: 100000, //equals NGN100,
            success: false,
            password: "",
            email: '', // customer email
            first_name: "",
            last_name: '',
            phone: '',
            account_type:'Client',
            submitForm: true,
        }
        this.handleForm = this.handleForm.bind(this)
        this.verifyFormSubmit = this.verifyFormSubmit.bind(this)
        this.formSubmitted = this.formSubmitted.bind(this)

        this.paystackPaymentSuccess = this.paystackPaymentSuccess.bind(this);
    }

    componentDidMount() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var string_length = 8;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        let amount = localStorage.getItem("CheckoutAmount")
        
        this.setState({
            amount: amount * 100,
            password: randomstring
        })
    }

    verifyFormSubmit() {
        this.setState({
            submitForm: true
        })
    }

    handleForm(e) {
        const {name, value} = e.target
        this.setState(prevState =>({
            ...prevState.data,
            [name]:value
        }))
    }

    paystackPaymentSuccess(response){
        this.setState({
            success: "success"
        })
        localStorage.setItem("yshKSMCis129_#&NISis", this.state.password);
        setTimeout(function(){
        window.location = '/Application-details'
        localStorage.removeItem("ItemsInCart");
        localStorage.removeItem("CheckoutAmount");
            },4000)
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    formSubmitted(data) {
        document.getElementById("submittedSucces").style.display = "block"
        setTimeout(function() {
            if (document.getElementById("submittedSucces") != null) {
                document.getElementById("submittedSucces").style.display = "none"
            }
        }, 2000)
        this.setState({
            success: "checkout"
        })
    }

    render() {
        if (this.state.success === "success") {
            return (
                <div className = 'thank-you'>
                    <div className = "thank-you-inner-left">
                        <h1>Thank You <i>!</i></h1>
                        <span>Thank you, Your Payment was successful.</span><br />
                        <span>
                            An Email was sent to your e-mail wih details for the transaction, please keep for references
                        </span>
                    </div>
                	<div className = "loader-wrapper">
                        <br />
                        <br />
                        <div>
                            <div className = " loader"><img className="loader-img" src={loader} alt="gradsuccess" />
                            </div>
                        </div>
                        <div> redirecting... </div>
                        
                	</div>
                </div>
            )
        } else if (this.state.success === "checkout") {
            return (
                <div>
                	<div className = "co-container">
                		<div className = "co-inner">
                			<div>
                				<ul className = "paymentDetails">
                					<li><strong>Name:</strong>   <i>{this.state.first_name + " " + this.state.last_name}</i></li>
                					<li><strong>Email Address:</strong>  <i>{this.state.email}</i></li>
                					<li><strong>Phone Number: </strong>  <i>{this.state.phone}</i></li>
                				</ul>
                				<div>
                					<div className = "cartStyle">
                						<PaystackButton
                							text="Proceed to payment"
                							className= ""
                							callback={this.paystackPaymentSuccess}
                							close={this.close}
                							disabled={false}/*disable payment button*/
                							embed={false} /*payment embed in your app instead of a pop up*/
                							reference={this.getReference()}
                							email={this.state.email}
                							amount={this.state.amount}
                							paystackkey={this.state.key}
                							tag="button"/*it can be button or a or input tag */
                							/>
                					</div>
                						
                				</div>
                				</div>
                				<CheckoutSummary />
                			</div>
                	</div>
                </div>
	)
	}else{
	return (
	<div>
		<div className = "co-container">
			<div className = "co-inner">
				<div>
					<Mutation
					mutation={CREATE_CLIENT_ACCOUNT}
					onError={this.error}
					onCompleted={data=>{
					this.formSubmitted(data)
					}}>
					{(createClientAccount, { data,loading, error}) => (
					<div className = "loader-wrapper">
						<div id="submittedSucces" className="SuccessTagForm">
							Success!...
						</div>
						<form
							onSubmit={e => {
							e.preventDefault();
							createClientAccount({
							variables: {
                                first_name:this.state.first_name,
                                last_name:this.state.last_name,
                                phone:this.state.phone,
    							form_id:localStorage.getItem('form_id') || "no form",
    							package:localStorage.getItem('package') || "no form",
    							email:this.state.email,
                                password:this.state.password || "nothing",
    							account_type:this.state.account_type
							}
							});
							}}
							className = "checkout-form-container"
							id = "cartForm">
							
							<h3>Personal Details</h3>
							<div className="row">
							    <div className="col">
								    <input type="text" required placeholder="First name"  onChange = {this.handleForm} id = "first_name" name = "first_name"/>
                                </div>
								<div className="col">
									<input type="text" required  placeholder="Last name"  onChange = {this.handleForm}  id = "last_name" name = "last_name"/>
								</div>
							</div>
							<div className="row-full">
								<input type="text" required  placeholder="Phone" onChange = {this.handleForm}  id = "phone"  name = "phone"/>
							</div>
							<div className="row-full">
								<input type="email" required  placeholder="Email Address" onChange = {this.handleForm}   id = "email" name = "email"/>
							</div>
							<br />
							<input type = "submit" className = "submit-details" value = "Proceed to payment"/>
							
						</form>
						{loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
						{error && <div className="FailedTagForm">Failed!... Something is not right</div>}
					</div>
					)}
					</Mutation>
					
				</div>
				<CheckoutSummary />
			</div>
		</div>
	</div>
	);
	}
	}
	}