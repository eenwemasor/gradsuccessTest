import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {Link} from 'gatsby'


import discouted from "../../../images/logo.png"
import displayPicture from "../../../images/dan.jpeg"

//Men icon

import helpIcon from "../../../images/icons/help.png"
import messageIcon from "../../../images/icons/message.png"
import notificationsIcon from "../../../images/icons/notifications.png"
import settingIcon from "../../../images/icons/setting.png"


// Dropdown menu import
import Settings from './settings'
import RecentMessages from './recentMessages'
import Support from './support'
import Notifications from './notifications'



export default class mainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationMenu:false,
      showMessagesMenu:false,
      showSupportMenu:false,
      showSettings:false
    };  
  }

  handleDropDownMenu(type){
    if(type === "Notifications"){
      this.setState({
        showNotificationMenu:!this.state.showNotificationMenu,
        showMessagesMenu:false,
        showSupportMenu:false,
        showSettings:false
      })
    }else if(type === "Messages"){
      this.setState({
        showMessagesMenu:!this.state.showMessagesMenu,
        showNotificationMenu:false,
        showSupportMenu:false,
        showSettings:false
      })
    }else if(type === "Support"){
      this.setState({
        showSupportMenu:!this.state.showSupportMenu,
        showMessagesMenu:false,
        showNotificationMenu:false,
        showSettings:false
      })
    }else{
      this.setState({
        showSettings:!this.state.showSettings,
        showMessagesMenu:false,
        showSupportMenu:false,
        showNotificationMenu:false
      })
    }
  }


  render() {
    return (
      <div>
      <div className = "d-header">
         <div className = "d-header-inner">
            <div className = "logo-image"><img  src={discouted} alt="Logo" /></div>
            <div className = "d-menu-container">
              <ul>
                <li> <Link to="../">Home</Link></li>
                <li><Link to="Client/history">History</Link></li>
                <li><Link to="Client/message">Messages</Link></li>
                <li><Link to="Client/profile">Profile</Link></li>
              </ul>
            </div>

            <div className = "d-notifications-area-container" >
                <div></div>
                <div><img  onClick={this.handleDropDownMenu.bind(this,"Notifications")} src={notificationsIcon} alt="Logo" /></div>
                <div><img onClick={this.handleDropDownMenu.bind(this,"Messages")} src={messageIcon} alt="Logo" /></div>
                <div><img  onClick={this.handleDropDownMenu.bind(this,"Support")} src={helpIcon} alt="Logo" /></div>
                <div><img  onClick={this.handleDropDownMenu.bind(this,"Settings")} src={settingIcon} alt="Logo" /></div>
            </div>
         </div>

         </div>

          <div>
             
         </div>
          { this.state.showNotificationMenu && <Notifications /> }
          { this.state.showMessagesMenu && <RecentMessages /> }
          { this.state.showSupportMenu && <Support /> }
          { this.state.showSettings && <Settings /> }

      </div>
    )
  }
}
