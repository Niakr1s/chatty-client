import React from "react"

import { Icon } from "semantic-ui-react"

class ChatInfo extends React.Component {
    render = () => {
        return (
            this.props.activeChat && 
            <div className="float-right chatinfo">
                <span>{"Chat: " + this.props.activeChat}</span>
                <button 
                    className="no-border blue"
                    onClick={() => {this.props.leaveChat(this.props.activeChat);}}
                ><Icon name="log out"></Icon></button>
            </div>
        )
    }

}

export default ChatInfo
