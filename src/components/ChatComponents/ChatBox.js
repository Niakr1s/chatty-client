import React from "react"
import ChatLine from "./ChatLine";

class ChatBox extends React.Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView()
    }

    componentDidMount = () => {
        this.scrollToBottom();
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    render = () => {
        return (
            <div className="chatbox overflow-y blue-gradient">
                {this.props.messages.map((m) => {
                    return <ChatLine
                        message={m}
                        key={m.id}></ChatLine>
                })}
                <div id="anchor" ref={(el) => { this.messagesEnd = el; }}></div>
            </div>
        )
    }
}

export default ChatBox