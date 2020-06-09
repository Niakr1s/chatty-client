import React from "react"
import { Icon } from 'semantic-ui-react'

class ChatUserList extends React.Component {
    constructor(props) {
        super(props)
    }

    makeUserList = () => {
        console.log("make user list", this.props.chat)
        let res = this.props.chat && this.props.chat.users && [...this.props.chat.users.values()].map((user) => {
            return <li
                className="userlist-item lightblue"
                key={user.user}
            >
                {user.user}{user.verified && <Icon name="check" className="green float-right" title="verified"></Icon>}
            </li>
        })
        return res
    }

    render() {
        return (
            <div
                id="chat-right-modal"
                // className="chat-modal"
                onClick={(event) => {
                    if (event.target.id === "chat-right-modal") { this.props.close() }
                }}
            >
                <div className="chat-right darkblue">
                    <div className="userlist-header blue">
                        <span className="userlist-header-text">User list</span>
                    </div>
                    <ul className="userlist overflow-y blue-gradient">
                        {this.makeUserList()}
                    </ul>
                    <div className="userlist-footer darkblue"></div>
                </div>
            </div>
        )
    }
}

export default ChatUserList