import { React, Component } from "react"
import Footer from '../components/Footer'
import RegisteredAccount from './registeredExperts'
import loader from "../../images/loader.gif"

import AllApplications from "./TableQueryData/allApplications"
import LogoutForm from "../components/Forms/logoutForm"

import MainLayout from "../components/ExpertAccountComponents/mainLayout"

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AllApplicationsComponent:true,
            ExpertsComponent:false,
            
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

        this.setState({
            AllApplicationsComponent:false,
            ExpertsComponent:false,
        })

        this.setState({
            [Component]:true
        })
    }


    render() {
            return (
                <div>
                    <MainLayout />
                    <div className = "main-content">
                            <div className = "client_main_area">
                                <div className = "client_main_area_menu">
                                    <button id = "AllApplicationsComponent" onClick = {this.handleDisplayComponent}>All Request</button>
                                    <button id = "ExpertsComponent" onClick = {this.handleDisplayComponent}>Experts</button>
                                    <LogoutForm />
                                </div>
                                <div>
                                    <div className="client_main_area_content_area">
                                        {this.state.AllApplicationsComponent && <AllApplications />}
                                        {this.state.ExpertsComponent && <RegisteredAccount />}
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