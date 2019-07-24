import { React, Component } from "react"
import Footer from '../components/Footer'
import RegisteredAccount from './registeredExperts'
import loader from "../../images/loader.gif"

import NewApplications from "./TableQueryData/newApplications"
import AssignedApplication from "./TableQueryData/assignedApplication"
import InProgressApplication from "./TableQueryData/inProgressApplication"
import CompletedApplication from "./TableQueryData/completedApplication"
import ExpertsComponent from "./registeredExperts"

import LogoutForm from "../components/Forms/logoutForm"

import MainLayout from "../components/ExpertAccountComponents/mainLayout"

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            NewApplications:true,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            ExpertsComponent:false,
            currentComponent:"New Applications",
            currentMenu:"NewApplications"
            
        }
         this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
    }
    componentDidMount(){
        this.setState({
            loggedIn:localStorage.getItem('auth-token') || ""
        })
    }

    componentWillMount() {
        if (this.state.loggedIn === "") {
            window.location = '/'
        }
    }

    handleDisplayComponent(event){
        let Component =  event.target.id;
        let currentComponent =  event.target.name;

        this.setState({
            NewApplications:false,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            ExpertsComponent:false,
        })

        this.setState({
            [Component]:true,
            currentComponent:currentComponent,
            currentMenu:Component
        })
    }


    render() {
            return (
                <div>
                    <MainLayout />
                    <div className = "main-content">
                            <div className = "client_main_area">
                                <div className = "client_main_area_menu">
                                    <button 
                                        className = {this.state.currentMenu === "NewApplications"? "currentMenu":""} 
                                        name = "New Applications" 
                                        id = "NewApplications" 
                                        onClick = {this.handleDisplayComponent}>New Applications
                                    </button>

                                    <button 
                                        className = {this.state.currentMenu === "AssignedApplication" ? "currentMenu":""} 
                                        name = "Assigned Applications" 
                                        id = "AssignedApplication" 
                                        onClick = {this.handleDisplayComponent}>Assigned Applications
                                    </button>

                                    <button 
                                        className = {this.state.currentMenu === "InProgressApplication" ? "currentMenu":""} 
                                        name = "In Progress Applications" 
                                        id = "InProgressApplication" 
                                        onClick = {this.handleDisplayComponent}>In Progress Applications
                                    </button>

                                    <button 
                                        className = {this.state.currentMenu === "CompletedApplication" ? "currentMenu":""} 
                                        name = "Completed Applications" 
                                        id = "CompletedApplication" 
                                        onClick = {this.handleDisplayComponent}>Completed Applications
                                    </button>

                                    <button 
                                        className = {this.state.currentMenu === "ExpertsComponent" ? "currentMenu":""} 
                                        name = "Experts List" 
                                        id = "ExpertsComponent" 
                                        onClick = {this.handleDisplayComponent}>Experts
                                    </button>
                                    <LogoutForm />
                                </div>
                                <div>
                                    <div><h3 className = "form-header-main" >{this.state.currentComponent}</h3></div>
                                    <div className="client_main_area_content_area">
                                        {this.state.NewApplications && <NewApplications />}
                                        {this.state.AssignedApplication && <AssignedApplication />}
                                        {this.state.InProgressApplication && <InProgressApplication />}
                                        {this.state.CompletedApplication && <CompletedApplication />}
                                        {this.state.ExpertsComponent && <ExpertsComponent />}
                                        <div className = "spacing"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
               
                    <Footer />
                </div>
            );
    }
}
export default IndexPage