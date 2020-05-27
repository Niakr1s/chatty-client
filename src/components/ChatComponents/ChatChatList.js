import React from "react"

class ChatChatList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                id="chat-left-modal"
                className="chat-modal"
                onClick={(event) => {
                    if (event.target.id === "chat-left-modal") { this.props.close() }
                }}
            >
                <div className="chat-left darkblue">
                    <div className="userlist-header blue">
                        <span className="userlist-header-text">Chat list</span>
                    </div>
                    <ul className="userlist overflow-y blue-gradient">
                        {this.props.chats.map((chat) => {
                            return <li className="userlist-item lightblue" key={chat}>{chat}</li>
                        })}
                    </ul>
                    <div className="userlist-footer darkblue"></div>
                </div>
            </div>
        )
    }
}

export default ChatChatList