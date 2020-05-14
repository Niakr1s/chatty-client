import React from "react"

class ChatUserList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [...new Array(100).keys()].map((it) => `User${it}`)
        }
    }

    render() {
        return (
            <div className="chat-right darkblue">
                <div className="userlist-header blue">
                    <span className="userlist-header-text">User list</span>
                </div>
                <ul className="userlist overflow-y blue-gradient">
                    {this.state.users.map((it, idx) => {
                        return <li className="userlist-item lightblue" key={idx}>{it}</li>
                    })}
                </ul>
                <div className="userlist-footer darkblue"></div>
            </div>
        )
    }
}

export default ChatUserList