import React from "react"

import Layout from "./components/layout"
import SEO from "./components/seo"
import Modal from "react-modal"
import LoginForm from "./components/Forms/loginForm";

const customStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(255,255,255,0.3)'
  }
};

class NotFoundPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal:false
		}
		this.handleModal = this.handleModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleModal(){
		this.setState({
			showModal:true
		})
	}
	handleCloseModal () {
          this.setState({ showModal: false });
    }

	render(){

	return (
	  <Layout>
	    <SEO title="401: Unauthorized access" />
	    <div className = "unauthorized">
	    <h1>401!</h1>
	    <h2>UNAUTHORIZED ACCESS</h2>
	    <p>... please logged with appropriate logged details.</p>
	    <div className = "cartStyle">
			<button onClick = {this.handleModal}>Login</button>
		</div>
	     <div>
		        <Modal 
		           isOpen={this.state.showModal}
		           contentLabel="Minimal Modal Example"
		           style={customStyles}
		           ariaHideApp={false}
		        >
		          <LoginForm />
		          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
		        </Modal>
		</div>
		</div>
	  </Layout>
	)
	}
}
export default NotFoundPage
