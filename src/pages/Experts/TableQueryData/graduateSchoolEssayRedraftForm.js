import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../../images/loader.gif"

import LeaveAMessageForm from "../../components/Forms/leaveAMessageForm"
import ComplainForm from "../../components/Forms/complainForm"
import { GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM } from "../../graphql/queries"

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            state: ""
        }
    }
    render() {
        return (
              <div className >
            <h1>Graduate School Essay Redrafts</h1>
        </div>
        )
    }
}
export default Message