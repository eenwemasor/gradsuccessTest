import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../../images/loader.gif"
import {GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from "../../graphql/queries"






class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            state:""
        }
}


render() {
    return(  
          <div className >
            <h1>Graduate School Statement Review</h1>
        </div>
    )
}
}
export default Message