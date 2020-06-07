import React from "react"
import * as ChatLines from "./ChatLines";

class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        // it's holds ["chatname", "scrollTop"]
        this.scrolls = new Map()
        this.myRef = React.createRef();
    }

    componentDidUpdate = () => {
        if (!this.props.chat) return
        let lastScrollTop = this.scrolls.get(this.props.chat.chat);
        if (lastScrollTop === undefined) lastScrollTop = this.myRef.current.scrollHeight;
        this.myRef.current.scrollTop = lastScrollTop;
    }

    render = () => {
        return (
            <div className="chatbox overflow-y blue-gradient" ref={this.myRef}
                onScroll={() => {
                    if (!this.props.chat) return;
                    this.scrolls.set(this.props.chat.chat, this.myRef.current.scrollTop);
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
