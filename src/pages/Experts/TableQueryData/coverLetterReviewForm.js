import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../../images/loader.gif"
import {COVER_LETTER_REVIEW_FORM} from "../../graphql/queries"






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
           <h1>Cover Letter Reviews</h1>
        </div>
    )
}
}
export default Message
