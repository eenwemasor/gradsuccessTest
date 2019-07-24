import React from 'react';
import sendIcon from "../../../images/send_icon.svg"

export default class leaveAMessageForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			dateSent:"24/07/2019",
			sender:"Bunner Speef",
			data:[
				{
					messageBody:"Welcome to Gradsucess... leave a for a message for an expert"
				}

				],
			typedText:"",

			}
			this.handleSendMessage = this.handleSendMessage.bind(this)
			this.submitMessage = this.submitMessage.bind(this)
		}

		handleSendMessage(e){
			const typedText = e.target.value;
			this.setState({
				typedText:typedText
			})
			console.log(this.state.typedText)
		}

		submitMessage(e){
			const m = {
				messageBody:this.state.typedText
			}
			this.setState(prevState => ({
	            data: [...prevState.data,m]
	        }))
		}

	render() {
		return (
			<div>
					<p className = "chat_header">Gradsuccess Chat Bot</p>
				<div className = "chat_component">
					{this.state.data.map((messageInstance,index) =>
                            <div className="container lighter">
							  	<span className="time-right">{this.state.sender}</span>
							  	<img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" />
							  	<p>{messageInstance.messageBody}</p>
							  	<span className="time-right">{this.state.dateSent}</span>
							</div>
                        )}
				</div>
				<form className = "chat_form">
						<input name = "chat_message" id = "chat_message" placeholder = "Type a message" onChange = {this.handleSendMessage}></input>

						<button type = "button" onClick = {this.submitMessage}>
							<img  src={sendIcon} alt="Logo" /> 
							<span>Send Message</span>
						</button>
				</form>
			</div>
		);
	}
}
