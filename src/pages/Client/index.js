import { React, Component } from "react"
import Footer from '../components/Footer'
import Account from './account'
import { Query } from "react-apollo";
import { LOGGED_IN_USER } from "../graphql/queries"
import loader from "../../images/loader.gif"
import MainLayout from "../components/ClientAccountComponents/mainLayout"
import AccountInfo from "./account"


import LeaveAMessageForm from "../components/Forms/leaveAMessageForm"
import ComplainForm from "../components/Forms/complainForm"
import ChangeCV from "../components/Forms/changeCV"

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: null,
            leaveAMessage:false,
            leaveAComplain:false,
            changeCV:false,
            accountInfo:true

        }
        this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
    }
    componentWillMount() {
        if (this.state.loggedIn === "") {
            window.location = '/'
        }
    }

    componentDidMount(){
        this.setState({
            loggedIn:localStorage.getItem('auth-token') || ""
        })
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
                                    
                                    <button onClick = {this.handleDisplayComponent}>View Request Details</button>
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
            
        </div>
            )
        }
    }
}
export default IndexPage