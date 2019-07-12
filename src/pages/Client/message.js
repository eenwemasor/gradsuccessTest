import {React,Component} from "react"
import Footer from '../components/Footer'

import MainLayout from "../components/ClientAccountComponents/mainLayout"

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    return (
      <div>
        <MainLayout />
          <div className = "main-content"> 
                  <p>Message</p>
          </div>
          <Footer />
      </div>
    )
  }
}
export default Message
