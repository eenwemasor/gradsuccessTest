import { React, Component } from "react"
import { Query } from "react-apollo";
import CoverLetterRedraft from "./TableQueryData/coverLetterRedraft"
import CoverLetterReviewForm from "./TableQueryData/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "./TableQueryData/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "./TableQueryData/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "./TableQueryData/resumeReviewForm"





class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
}


render() {
    if(this.props.table === "coverLetterRedraft"){
        return(
            <CoverLetterRedraft userID = {this.props.userID}/>
        )
    }
    else if(this.props.table === "coverLetterReviewForm"){
       return(
            <CoverLetterReviewForm userID = {this.props.userID}/>
        )
    }
    else if(this.props.table === "graduateSchoolEssayRedraftForm"){
        return(
            <GraduateSchoolEssayRedraftForm userID = {this.props.userID}/>
        )
    }
    else if(this.props.table === "graduateSchoolStatementReviewForm"){
        return(
            <GraduateSchoolStatementReviewForm userID = {this.props.userID}/>
        )
    }
    else{
        return(
            <ResumeReviewForm userID = {this.props.userID}/>
        )
    }
}
}
export default Account