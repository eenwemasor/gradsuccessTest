import React from 'react';
import { graphql } from 'gatsby';
import { Mutation } from 'react-apollo';
import axios, { post } from 'axios';
import gql from 'graphql-tag';
import { CREATE_GRADUATE_SCHOOL_STATEMENT_REVIEW } from '../../graphql/mutations';
import download from "../../../images/download.png"
import loader from "../../../images/loader.gif"
import ThankYou from "../formCompletePage"

export default class resumeReviewForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "empty",
                university_and_course_applied_for: "empty",
                summary_of_interest: "empty",
                curriculum_vitae: "empty",
                package: this.props.package,
                has_expert: "empty",
                form_id: "empty",
                status:"Vacant",
                completed:false
            },
            form_submit_success:false,
        }
        this.handleFormInput = this.handleFormInput.bind(this);
        this.onChange = this.onChange.bind(this);
        this.formSubmitted = this.formSubmitted.bind(this)
    }

    handleFormInput(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }

        }))
    }

componentDidMount() {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                form_id: localStorage.getItem("form_id")
            }

        }))
        localStorage.setItem("package",this.props.package);
    }


    formSubmitted() {
        document.getElementById("submittedSucces").style.display = "block"

        setTimeout(function() {
            if (document.getElementById("submittedSucces") != null) {
                document.getElementById("submittedSucces").style.display = "none"
            }
        }, 5000)
        this.setState({
          form_submit_success:true
        })

    }

        onChange(e) {
        const firebase = require("firebase")

          const config = {
          apiKey: 'AIzaSyB9uwinxn9jEKUmcz0_7rxgLDycAeGO2Fk',
          authDomain: 'gradsuccess-6c883.firebaseapp.com',
          databaseURL: 'https://gradsuccess-6c883.firebaseio.com',
          projectId: 'gradsuccess-6c883',
          storageBucket: 'gs://gradsuccess-6c883.appspot.com/',
          messagingSenderId: '153907721792',
          appID:"1:153907721792:web:ff681e47886cdbb7"
        }
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        
        const uploader = document.getElementById('uploader')
        const uploadingText = document.getElementById('uploading')
        const completeText = document.getElementById('complete')
        const errorText = document.getElementById('error')
        let CVName = this.state.data.name.replace(/\s+/g, '_')
        let timeSubmitted = new Date().getTime()
        var file = document.getElementById('file').files[0];
        let fileRef = 'CurriculumVitae/' + CVName + "_" + timeSubmitted + "_" + file.name
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                "curriculum_vitae": fileRef
            }
        }))
        console.log(this.state.data)
        var storageRef = firebase.storage().ref(fileRef)
        var task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot) {
                uploadingText.style.display = "block"
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                uploader.value = percentage
            },
            function error(err) {
                uploadingText.style.display = "none"
                errorText.style.display = "block"
            },
            function complete() {
                uploadingText.style.display = "none"
                errorText.style.display = "none"
                completeText.style.display = "block"
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').style.opacity = '1'
            })
    }


    render() {
      if(!this.state.form_submit_success){
        return (
            <div>
              <div className = "detail-form reviewModal">
                    <Mutation 
                        mutation={CREATE_GRADUATE_SCHOOL_STATEMENT_REVIEW}
                        onError={this.error} 
                        onCompleted={data=>{
                          this.formSubmitted()
                        }}
                        >
                        {(createGraduateSchoolStatementReviewData, { data,loading, error}) => (
                        <div className = "loader-wrapper">
                        <div id="submittedSucces" className="SuccessTagForm">
                        Success! Your Details was submitted...
                      </div>
                          <form 
                          onSubmit={e => {
                            e.preventDefault();
                            createGraduateSchoolStatementReviewData({ 
                              variables: this.state.data
                              });
                          }}
                          className = "checkout-form-container">
                          <h3 className = "form-header">Please Fill with correct details </h3>
                            <div className="row-full">

                              <input 
                              type="text"  
                              placeholder="Name (Surname First)"   
                              id = "name"
                              name = "name"
                              onChange = {this.handleFormInput}
                              required />
                              <br />

                              <input 
                              type="text"
                              placeholder="University and Course Applied for?"  
                              id = "university_and_course_applied_for" 
                              name = "university_and_course_applied_for" 
                              required onChange = {this.handleFormInput}
                              required/>
                              
                              <br />
                              <textarea type="text"  
                              placeholder="Summary of Interest in Course?"   
                              id = "summary_of_interest" 
                              name = "summary_of_interest"  
                              onChange = {this.handleFormInput}
                              rows = '4' required>
                              </textarea>
                            </div>
                            <br />
                            <input
                              type="file"
                              name="file"
                              id="file"
                              className = "file_upload"
                              onChange={this.onChange}/>
                              
                              <div className = "progressBar">
                                <label className = "uploading" id = "uploading">Uploading...</label>
                                <label className = "complete" id = "complete">Complete!</label>
                                <label className = "error" id = "error">Error!</label>
                              <progress value = "0" max= "100" id = "uploader">0%</progress>
                            </div>
                            <div className = "file_upload_label">
                              <label htmlFor="file" >Upload Curriculum Vitae</label>
                            </div>
                            <br />

                            <input type = "submit" className = "submit-details" value = "Submit" id = "submitBtn"/>
                                                  
                        </form>
                        {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                         {error && <div className="FailedTagForm"> Failed! Something is not right...</div>}
                    </div>
                    )}
                    



                    </Mutation>


                  <div className = "explainInput">
                      <h3>Graduate School Statement Review Form *</h3>
                        <p>
                            The information to be collected from this form would be used as a basis for your resume and cover letter. For experienced personnel with over 5 years professional experience, just upload your CV. the form is not required. 
                         </p>

                        <span className = "required">* Required</span>
                         <ul>
                            <li>
                                <h6>Name (Surname First) *</h6>
                                <p>Provide your full name. <i>Your Surname should come first</i></p>
                            </li>
                            <li>
                                <h6>Industry and Role Title Applied for? *</h6>
                                <p>State the University you are applying for and the name of the course. e.g Financial Analyst in a Manufacturing firm</p>
                            </li>
                            <li>
                                <h6>Summary of Interest in Course?</h6>
                                <p>In short words, why are you applying to this University and Course? e.g. I have recently discovered the company's energy management division and previous client services provided. I particularly feel inspired by their ability of reducing energy consumption in client a by 20% annually as reported in their case study section on their website. I want to be part of a team like this actively changing the world in energy!</p>
                            </li>
                         </ul>
                  </div>   
                </div>
              
              </div>
        );
        }else{
          return(
             <ThankYou />
          )
        }
    }
}