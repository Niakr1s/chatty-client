import React from "react"

class ChatUserList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="chat-right darkblue">
                <div className="userlist-header blue">
                    <span className="userlist-header-text">User list</span>
                </div>
                <ul className="userlist overflow-y blue-gradient">
                    {this.props.activeUsers.map((username, idx) => {
                        return <li className="userlist-item lightblue" key={idx}>{username}</li>
                    })}
                </ul>
                <div className="userlist-footer darkblue"></div>
            </div>
        )
    }
}

export default ChatUserList