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

    getActiveChat = () => {
        return this.props.chats.find((it) => it.name === this.props.activeChat)
    }

    render = () => {
        let activeChat = this.getActiveChat();
        return (
            <div className="chatbox overflow-y blue-gradient">
                {activeChat && activeChat.messages.map((m, idx, arr) => {
                    return <ChatLine
                        message={m}
                        key={activeChat.name + "_" + m.id.toString()}></ChatLine>
                })}
                <div id="anchor" ref={(el) => { this.messagesEnd = el; }}></div>
            </div>
        )
    }
}

export default ChatBox