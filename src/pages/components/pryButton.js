import React from "react"
import { jsx } from "@emotion/core"
import "./layout.css"
import Modal from "react-modal"
import CoverLetterRedraft from "./Forms/coverLetterRedraft"
import CoverLetterReviewForm from "./Forms/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "./Forms/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "./Forms/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "./Forms/resumeReviewForm"



const customStyles = {
  content : {
    top                   : '0%', 
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(255,255,255,0.3)'
  }
};


class PryButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addItem: false,
      show: false,
      showModal: false,
      showCoverLetterRedraftModal:false,
      showCoverLetterReviewFormModal:false,
      showGraduateSchoolEssayRedraftFormModal:false,
      showGraduateSchoolStatementReviewFormModal:false,
      showResumeReviewFormModal:false,
      form: this.props.form,
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }


     async handleOpenModal () {
      
      await this.getItem();

      if(this.state.form === "coverLetterRedraft"){
        this.setState({ showCoverLetterRedraftModal: true });
      }
      else if(this.state.form === "coverLetterReviewForm"){
        this.setState({ showCoverLetterReviewFormModal: true });
      }
      else if(this.state.form === "graduateSchoolEssayRedraftForm"){
        this.setState({ showGraduateSchoolEssayRedraftFormModal: true });
      }
       else if(this.state.form === "graduateSchoolStatementReviewForm"){
        this.setState({ showGraduateSchoolStatementReviewFormModal: true });
      }else{
        this.setState({ showResumeReviewFormModal: true });
      }

      this.setState({ loading: false })
      
    }
  
     handleCloseModal () {
      
      if(this.state.form === "coverLetterRedraft"){
        this.setState({ showCoverLetterRedraftModal: false });
      }
      else if(this.state.form === "coverLetterReviewForm"){
        this.setState({ showCoverLetterReviewFormModal: false });
      }
      else if(this.state.form === "graduateSchoolEssayRedraftForm"){
        this.setState({ showGraduateSchoolEssayRedraftFormModal: false });
      }
       else if(this.state.form === "graduateSchoolStatementReviewForm"){
        this.setState({ showGraduateSchoolStatementReviewFormModal: false });
      }else{
        this.setState({ showResumeReviewFormModal: false });
      }
    }

  getItem = () => {
    if (typeof this.props.itemDescription === "undefined") {
    } else {
      let list = localStorage.getItem("ItemsInCart")
      let itemArr = []

      if (list) {
        itemArr = JSON.parse(list)
        itemArr.push({
          IitemDescription: this.props.itemDescription,
          Price: this.props.price,
        })
        itemArr = Array.from(new Set(itemArr))

        localStorage.setItem("ItemsInCart", JSON.stringify(itemArr))

        this.setState({
          addItem: true,
        })

        document.getElementById("the").style.display = "block"
        setTimeout(function() {
          if (document.getElementById("the") != null) {
            document.getElementById("the").style.display = "none"
          }
        }, 2000)

        var counter = document.getElementById("counter").innerHTML
        var counter = parseInt(counter, 10) + 1
        document.getElementById("counter").innerHTML = counter
      } else {
        itemArr = []
        itemArr.push({
          IitemDescription: this.props.itemDescription,
          Price: this.props.price,
        })
        localStorage.setItem("ItemsInCart", JSON.stringify(itemArr))

        this.setState({
          addItem: true,
        })

        document.getElementById("the").style.display = "block"

        setTimeout(function() {
          document.getElementById("the").style.display = "none"
        }, 2000)

        var counter = document.getElementById("counter").innerHTML
        var counter = parseInt(counter, 10) + 1
        document.getElementById("counter").innerHTML = counter
      }
    }
  }

  render() {
    return (
      <div>
      
        <button
          css={this.props.small ? SmallButtonStyles : BigButtonStyles}
          onClick={this.handleOpenModal}
        >
          {this.props.text}
        </button>

        <div id="the" className="SuccessTag">
          Item added to Cart successfully
        </div>

        <Modal 
           isOpen={this.state.showCoverLetterRedraftModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
          <CoverLetterRedraft package={this.state.form}/>
          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.showCoverLetterReviewFormModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
          <CoverLetterReviewForm package={this.state.form}/>
          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>


        <Modal 
           isOpen={this.state.showGraduateSchoolEssayRedraftFormModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
          <GraduateSchoolEssayRedraftForm package={this.state.form} />
          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.showGraduateSchoolStatementReviewFormModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
          <GraduateSchoolStatementReviewForm package={this.state.form} />
          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.showResumeReviewFormModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
          <ResumeReviewForm package={this.state.form} />
          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>
      </div>
    )
  }
}

const BigButtonStyles = {
  color: "#111",
  textAlign: "center",
  minWidth: "200px",
  minHeight: "50px",
  fontSize: "17px",
  background: "yellow",
  border: "none",
  margin: "0px auto",
  fontFamily: `"Poppins", sans-serif`,
  fontWeight: "700",
  cursor: "pointer",
  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  ":hover": {
    background: "#47dcbc",
    color: "yellow",
  },
  transition: "all .2s ease-out",
  boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
}

const SmallButtonStyles = {
  color: "#111",
  textAlign: "center",
  minWidth: "100px",
  minHeight: "30px",
  fontSize: "12px",
  background: "yellow",
  border: "none",
  margin: "0px auto",
  fontFamily: `"Poppins", sans-serif`,
  fontWeight: "700",
  cursor: "pointer",
  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  ":hover": {
    background: "#47dcbc",
    color: "yellow",
    boxShadow: "0 1px 10px rgba(0,0,0,0.2)",
  },
  transition: "all .2s ease-out",
  boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
}

export default PryButton
