import React from "react"
import * as ChatLines from "./ChatLines";

class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        // it's holds {"chatname": {"scrollTop": number, "stickBottom": bool}
        this.scrolls = new Map()
        this.myRef = React.createRef();

        this.lastChatName = "";
    }

    componentDidUpdate = () => {
        if (!this.props.chat) return

        // removing stick botton if we switched chats and updating lastChatName
        if (this.lastChatName !== "" && this.props.chat.chat != this.lastChatName) {
            let lastScrollStatus = this.getScrollStatus(this.lastChatName)
            lastScrollStatus.stickBottom = false;
            this.scrolls.set(this.lastChatName, lastScrollStatus)
        }
        this.lastChatName = this.props.chat.chat

        // scrolling to last scroll height, it will call onScroll event, that will update scrollStatus
        let scrollStatus = this.getScrollStatus(this.props.chat.chat)
        if (scrollStatus.stickBottom) {
            this.myRef.current.scrollTop = this.myRef.current.scrollHeight
        } else { this.myRef.current.scrollTop = scrollStatus.scrollTop; }
    }

    getScrollStatus = (chatname) => {
        let scrollStatus = this.scrolls.get(chatname);
        if (scrollStatus === undefined) scrollStatus = {
            scrollTop: this.myRef.current.scrollHeight,
            stickBottom: true
        }
        this.scrolls.set(chatname, scrollStatus)
        return scrollStatus
    }

    render = () => {
        return (
            <div className="chatbox overflow-y blue-gradient" ref={this.myRef}
                onScroll={() => {
                    if (!this.props.chat) return;
                    this.scrolls.set(this.props.chat.chat, {
                        scrollTop: this.myRef.current.scrollTop, //+ this.myRef.current.offsetHeight + 2,
                        stickBottom: this.myRef.current.scrollTop + this.myRef.current.offsetHeight + 2 >= this.myRef.current.scrollHeight
                    })
                }
                }>
                {this.props.chat && this.props.chat.messages.map((m, idx, arr) => {
                    return m.user
                        ? <ChatLines.ChatLine
                            message={m}
                            key={idx.toString()}
                        ></ChatLines.ChatLine>
                        : <ChatLines.SysMsgChatLine
                            message={m}
                            key={idx.toString()}
                        >
                        </ChatLines.SysMsgChatLine>
                })}
            </div>
        )
    }
}

export default ChatBox
