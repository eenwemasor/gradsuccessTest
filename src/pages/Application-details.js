import { React, Component } from 'react';
import Layout from "./components/layout";

import CoverLetterRedraft from "./components/Forms/coverLetterRedraft"
import CoverLetterReviewForm from "./components/Forms/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "./components/Forms/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "./components/Forms/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "./components/Forms/resumeReviewForm"


export default class ApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCoverLetterRedraft:false,
            showCoverLetterReviewForm:false,
            showGraduateSchoolEssayRedraftForm:false,
            showGraduateSchoolStatementReviewForm:false,
            showResumeReviewForm:false,
            package: localStorage.getItem("package")
        }
    }

    componentDidMount(){
        if(localStorage.getItem("yshKSMCis129_#&NISis") === null){
            window.location = '/';
        }else{
            if(this.state.package === "coverLetterRedraft"){
              this.setState({ showCoverLetterRedraft: true });
            }
            else if(this.state.package === "coverLetterReviewForm"){
              this.setState({ showCoverLetterReviewForm: true });
            }
            else if(this.state.package === "graduateSchoolEssayRedraftForm"){
              this.setState({ showGraduateSchoolEssayRedraftForm: true });
            }
             else if(this.state.package === "graduateSchoolStatementReviewForm"){
              this.setState({ showGraduateSchoolStatementReviewForm: true });
            }else{
              this.setState({ showResumeReviewForm: true });
            }
        }
    }

    render() {
        return (
            <Layout>
              <div
                  css={{
                    background: "white",
                    padding: "3em 1em",
                  }}
                    >
                   <div className = "content">
                        {this.state.showCoverLetterReviewForm && <CoverLetterReviewForm package={this.state.package}/>}
                        {this.state.showCoverLetterRedraft && <CoverLetterRedraft package={this.state.package}/>}
                        {this.state.showGraduateSchoolEssayRedraftForm && <GraduateSchoolEssayRedraftForm package={this.state.package} />}
                        {this.state.showGraduateSchoolStatementReviewForm && <GraduateSchoolStatementReviewForm package={this.state.package} />}
                        {this.state.showResumeReviewForm && <ResumeReviewForm package={this.state.package} />}
                    </div>
                </div>
        </Layout>

           
        )
	}
	}
	