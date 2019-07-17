import { React, Component } from "react"
import Footer from '../components/Footer'
import RegisteredAccount from './registeredExperts'
import { Query } from "react-apollo";
import { LOGGED_IN_USER } from "../graphql/queries"
import loader from "../../images/loader.gif"

import ResumeReviewForm from "./TableQueryData/resumeReviewForm"
import GraduateSchoolRedraftForm from "./TableQueryData/graduateSchoolEssayRedraftForm"
import GraduateSchoolReviewForm from "./TableQueryData/graduateSchoolStatementReviewForm"
import CoverLetterReviewForm from "./TableQueryData/coverLetterReviewForm"
import CoverLetterRedraftForm from "./TableQueryData/coverLetterRedraft"
import LogoutForm from "../components/Forms/logoutForm"

import MainLayout from "../components/ClientAccountComponents/mainLayout"

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRequest:true,
            resumeReview:false,
            graduateSchoolRedraft:false,
            graduateSchoolReview:false,
            coverLetterReview:false,
            coverLetterRedraft:false,
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
            allRequest:false,
            resumeReview:false,
            graduateSchoolRedraft:false,
            graduateSchoolReview:false,
            coverLetterReview:false,
            coverLetterRedraft:false,
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
                                    <button id = "allRequest" onClick = {this.handleDisplayComponent}>All Request</button>
                                    <button id = "resumeReview" onClick = {this.handleDisplayComponent}>Resume Review</button>
                                    <button id = "graduateSchoolRedraft" onClick = {this.handleDisplayComponent}>Graduate School Redraft</button>
                                    <button id = "graduateSchoolReview" onClick = {this.handleDisplayComponent}>Graduate School Review</button>
                                    <button id = "coverLetterReview" onClick = {this.handleDisplayComponent}>Cover Letter Review</button>
                                    <button id = "coverLetterRedraft" onClick = {this.handleDisplayComponent}>Cover Letter Redraft</button>
                                    <LogoutForm />
                                </div>
                                <div>
                                    <div className="client_main_area_content_area">
                                        {this.state.resumeReview && <ResumeReviewForm />}
                                        {this.state.graduateSchoolRedraft && <GraduateSchoolRedraftForm />}
                                        {this.state.graduateSchoolReview && <GraduateSchoolReviewForm />}
                                        {this.state.coverLetterReview && <CoverLetterReviewForm />}
                                        {this.state.coverLetterRedraft && <CoverLetterRedraftForm />}
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