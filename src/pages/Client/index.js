import { React, Component } from "react"
import Modal from "react-modal"
import Footer from '../components/Footer'
import { Query } from "react-apollo";
import { LOGGED_IN_USER } from "../graphql/queries"
import loader from "../../images/loader.gif"
import MainLayout from "../components/ClientAccountComponents/mainLayout"
import AccountInfo from "./account"
import LoginForm from "../components/Forms/loginForm"
import LogoutForm from "../components/Forms/logoutForm"

import LeaveAMessageForm from "../components/Forms/leaveAMessageForm"
import ComplainForm from "../components/Forms/complainForm"
import ChangeCV from "../components/Forms/changeCV"

import account_info from "../../images/icons/account_info.png"
import leave_a_message from "../../images/icons/leave_a_message.png"
import change_cv from "../../images/icons/change_cv.png"
import complaint from "../../images/icons/complaint.png"

const customStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(255,255,255,0.3)'
  }
};

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: "",
            leaveAMessage:false,
            leaveAComplain:false,
            changeCV:false,
            accountInfo:true,
            showModal:false

        }
        this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
        this.logoutClient = this.logoutClient.bind(this);
    }
    componentDidMount(){
        this.setState({
            loggedIn:localStorage.getItem('auth-token') || ""
        })

        if (this.state.loggedIn === "") {
           this.setState({ showModal: true });
        }

        
    }

    handleDisplayComponent(event){
       let Component =  event.target.id;

       this.setState({
            leaveAMessage:false,
            leaveAComplain:false,
            changeCV:false,
            accountInfo:false
       })

       this.setState({
            [Component]:true
       })
    }

    logoutClient(){

    }

    render() {
        if (this.state.loggedIn != "") {
            return (
                <Query query={LOGGED_IN_USER}>
                    {({ loading, error, data }) => {
                    if (loading) return (
                    <div className = "loader">
                        <div className="loader_client_account">
                            <img  src={loader} alt="gradsuccess" />
                            <h1>Just a moment...</h1>
                        </div>
                    </div>
                    )
                if (error) return `Error! ${error.message}`;
                return (
                <div>
                    <MainLayout  userID = {data.me}/>
                        <div className = "main-content">
                            <div className = "client_main_area">
                                <div className = "client_main_area_menu">
                                    <button id = "accountInfo" onClick = {this.handleDisplayComponent}>Account Info</button>
                                    <button id = "leaveAMessage" onClick = {this.handleDisplayComponent}>Leave a Message</button>
                                    <button id = "leaveAComplain" onClick = {this.handleDisplayComponent}>Have a Complain ?</button>
                                    <button id = "changeCV" onClick = {this.handleDisplayComponent}> Change CV</button>
                                    <LogoutForm />
                                </div>

                                <div className = "client_main_area_menu_icon">
                                   <img  id = "accountInfo" onClick={this.handleDisplayComponent} src={account_info} alt="account info" />
                                   <img  id = "leaveAMessage" onClick={this.handleDisplayComponent} src={leave_a_message} alt="leave a essage" />
                                   <img  id = "leaveAComplain" onClick={this.handleDisplayComponent} src={complaint} alt="Complaint" />
                                   <img  id = "changeCV" onClick={this.handleDisplayComponent} src={change_cv} alt="change cv" />
                                    <LogoutForm />
                                </div>


                                <div>
                                    <div className="client_main_area_content_area">
                                    {this.state.accountInfo && <AccountInfo table = {data.me.package} userID = {data.me.form_id}/>}
                                    {this.state.leaveAMessage && <LeaveAMessageForm />}
                                    {this.state.leaveAComplain && <ComplainForm />}
                                    {this.state.changeCV && <ChangeCV />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    <Footer />
                </div>
                    );
                    }}
                </Query>
            );
        } else {
            return (
                <div>
                        <Modal 
                           isOpen={this.state.showModal}
                           contentLabel="Minimal Modal Example"
                           style={customStyles}
                           ariaHideApp={false}
                        >
                          <LoginForm />
                        </Modal>
                </div>
            )
        }
    }
}
export default IndexPage