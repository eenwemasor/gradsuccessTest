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
            lastName: "",
            firstName: '',
            password: "",
            email: '', // customer email
            phone: '',
            VERIFY_INPUTS: {
                v_first_name: true,
                v_last_name: true,
                v_phone: true,
                v_email: true,
            },
            submitForm: true,
            success: false

        }
        this.handleForm = this.handleForm.bind(this)
        this.verifyFormSubmit = this.verifyFormSubmit.bind(this)
        this.formSubmitted = this.formSubmitted.bind(this)
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
        if (e.target.value === "") {
            let element = e.target.id;

            switch (element) {
                case "v_first_name":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: false,
                                v_last_name: true,
                                v_phone: true,
                                v_email: true,
                            }
                        })
                        this.verifyFormSubmit()
                        break
                    }
                case "v_last_name":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: false,
                                v_phone: true,
                                v_email: true,
                            }
                        })
                        this.verifyFormSubmit()
                        break
                    }
                case "v_phone":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: true,
                                v_phone: false,
                                v_email: true,
                            }
                        })
                        this.verifyFormSubmit()
                        break
                    }
                case "v_email":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: true,
                                v_phone: true,
                                v_email: false,
                            }
                        })
                        this.verifyFormSubmit()
                        break
                    }
                default:
                    return false

            }

        } else {
            let element = e.target.id;
            switch (element) {
                case "v_first_name":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: true,
                                v_phone: true,
                                v_email: true,
                            },
                            firstName: e.target.value
                        })
                        this.verifyFormSubmit()
                        break
                    }
                case "v_last_name":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: true,
                                v_phone: true,
                                v_email: true,
                            },
                            lastName: e.target.value
                        })
                        this.verifyFormSubmit()
                        break
                    }
                case "v_phone":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: true,
                                v_phone: true,
                                v_email: true,
                            },
                            phone: e.target.value
                        })
                        this.verifyFormSubmit()
                        break
                    }
                case "v_email":
                    {
                        this.setState({
                            VERIFY_INPUTS: {
                                v_first_name: true,
                                v_last_name: true,
                                v_phone: true,
                                v_email: true
                            },
                            email: e.target.value
                        })
                        this.verifyFormSubmit()
                        break
                    }
                default:
                    return false

            }

        }

    }
    callback = (response) => {
        localStorage.removeItem('ItemsInCart');
        localStorage.removeItem("form_id")
        this.setState({
            success: "success"
        })
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
                    	<h1>Thank You <i>!</i></h1>
                    	<div >
                    		<span>Thank you, Your Payment was successful.</span><br />
                    		<span>An Email was sent to your e-mail wih details for the transaction, please keep for references</span>
                    		<div className = "passwordCard">This is your login password: <h1>{this.state.password}</h1></div>
                    		<div className = "cartStyle">
                    			
                    			<Link to="/" activeStyle={{color: 'white'}}><button>checkout other services</button></Link>
                    		</div>
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
                        					<li><strong>Name:</strong>   <i>{this.state.lastName + " " + this.state.firstName}</i></li>
                        					<li><strong>Email Address:</strong>  <i>{this.state.email}</i></li>
                        					<li><strong>Phone Number: </strong>  <i>{this.state.phone}</i></li>
                        				</ul>
                        				<div>
                        					<div className = "cartStyle">
                        						<PaystackButton
                        							text="Proceed to payment"
                        							className= ""
                        							callback={this.callback}
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
							form_id:localStorage.getItem('form_id') || "no form",
							package:localStorage.getItem('package') || "no form",
							email:this.state.email,
							password:this.state.password || "nothing"
							}
							});
							}}
							className = "checkout-form-container"
							id = "cartForm">
							
							<h3>Personal Details</h3>
							<div className="row">
								<div className="col">
									<input type="text" className={this.state.VERIFY_INPUTS.v_first_name ? "" : "required"} placeholder="First name"  onChange = {this.handleForm} id = "v_first_name"/>
									<span className={this.state.VERIFY_INPUTS.v_first_name ? "show" : ""}>This field is required</span>
								</div>
								<div className="col">
									<input type="text" className={this.state.VERIFY_INPUTS.v_last_name ? "" : "required"} placeholder="Last name"  onChange = {this.handleForm}  id = "v_last_name"/>
									<span className={this.state.VERIFY_INPUTS.v_last_name ? "show" : ""}>This field is required</span>
								</div>
							</div>
							<div className="row-full">
								<input type="text" className={this.state.VERIFY_INPUTS.v_phone ? "" : "required"} placeholder="Phone" onChange = {this.handleForm}  id = "v_phone" />
								<span className={this.state.VERIFY_INPUTS.v_phone ? "show" : ""}>This field is required</span>
							</div>
							<div className="row-full">
								<input type="email" required className={this.state.VERIFY_INPUTS.v_email ? "" : "required"} placeholder="Email Address" onChange = {this.handleForm}   id = "v_email"/>
								<span className={this.state.VERIFY_INPUTS.v_email ? "show" : ""}>This field is required</span>
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