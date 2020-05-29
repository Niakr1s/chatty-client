import React from "react"
import { SortedSet } from "immutable-sorted"

class ChatUserList extends React.Component {
    constructor(props) {
        super(props)
    }

    makeUserList = () => {
        let res = this.props.chat && this.props.chat.users && [...this.props.chat.users].map((username) => {
            return <li className="userlist-item lightblue" key={username}>{username}</li>
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