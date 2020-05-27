import React from "react"

class ChatsBtn extends React.Component {
    render = () => {
        return (
            <button
                className="btn lightblue w100"
                onClick={() => this.props.onClick()}
            >chats</button>
        )
    }
}

export default ChatsBtn