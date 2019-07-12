import gql from 'graphql-tag';
import React from 'react';

export default class queries extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}


export const LOGGED_IN_USER = gql`
  {
    me{
	    form_id
	    package
	    email
  	}
  }
`;

export const COVER_LETTER_REVIEW_FORM = gql`
              query GetCoverLetterReviewForm($form_id: String!) {
                getCoverLetterReviewForm(form_id: $form_id) {
                  name
                  industry_applied_for
                  summary_of_interest
                  package
                  has_expert
                  form_id
                }
              }
            `;

export const RESUME_REVIEW_FORM = gql`
              query GetResumeReviewForm($form_id: String!) {
                getResumeReviewForm(form_id: $form_id) {
                  name
                  industry_applied_for  
                  summary_of_interest 
                  package 
                  has_expert  
                  form_id 
                }
              }
            `;

export const GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM = gql`
  query GetGraduateSchoolStatementReviewForm($form_id: String!) {
    getGraduateSchoolStatementReviewForm(form_id: $form_id) {
        name
        university_and_course_applied_for
        summary_of_interest
        package
        has_expert
        form_id
    }
  }
`;

export const GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM = gql`
              query GetGraduateSchoolEssayRedraftForm($form_id: String!) {
                getGraduateSchoolEssayRedraftForm(form_id: $form_id) {
                    name 
                    phone 
                    employment_most_relevant_to_you_masters_application 
                    typical_achievements
                    scholarships_and_award
                    undegraduate_level_courses_master 
                    project_dissertation_name_master 
                    most_recent_undergraduate 
                    undergraduate_level_grade 
                    result_ranking
                    undegraduate_level_courses_phd 
                    project_dissertation_name_phd 
                    leadership_experience 
                    interpersonal_skills
                    presentation_skills
                    programming
                    microsoft_excel
                    java
                    other_skills
                    extracurricular_activities
                    professional_workshops
                    academic_conferences_attended
                    certificate
                    english
                    french
                    german
                    spanish
                    nigeria_languages
                    other_languages
                    masters_intended_area_of_research 
                    university_of_choice_and_course
                    modules_interested 
                    teaching_personel_contacted 
                    summary_of_interest
                    post_study_goal 
                    referee 
                    curriculum_vitae 
                    package
                    has_expert 
                    form_id 
                }
              }
            `;

export const COVER_LETTER_REDRAFT = gql`
  query GetCoverLetterRedraft($form_id: String!) {
    getCoverLetterRedraft(form_id: $form_id) {
        name 
        address 
        phone 
        workplace_1 
        workplace_1_roles 
        workplace_1_recognized_job
        workplace_2
        workplace_2_roles 
        workplace_2_recognized_job 
        supervised_before 
        supervised_workplace 
        recent_tertiary_institute 
        number_of_employee_supervised_workplace_1 
        number_of_employee_supervised_workplace_2
        recent_tertiary_institute_name 
        scholarship_and_awards 
        final_grade_school_1 
        result_rank_school_1 
        top_courses_school_1 
        project_dissertation_name_school_1 
        next_most_recent_tertiary_education 
        final_grade_school_2  
        result_rank_school_2
        top_courses_school_2 
        leadership_experience 
        interpersonal_skills 
        presentation_skills  
        programming 
        microsoft_excel  
        java  
        other_skills 
        extracurricular_activities
        professional_workshops 
        certification_dates 
        organization_contacted_before_hand 
        summary_of_interest 
        curriculum_vitae 
        package 
        has_expert 
        form_id 
    }
  }
`;