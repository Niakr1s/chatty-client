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
                {this.props.chat && [...this.props.chat.messages.keys()].map((k) => {
                    let m = this.props.chat.messages.get(k)
                    return <ChatLine
                        message={m}
                        key={k + "_" + m.id.toString()}></ChatLine>
                })}
                <div id="anchor" ref={(el) => { this.messagesEnd = el; }}></div>
            </div>
        )
    }
}

export default ChatBox