import React from "react"
import * as ChatLines from "./ChatLines";

class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        // it's holds {"chatname": {"scrollTop": number, "stickBottom": bool}
        this.scrolls = new Map()
        this.myRef = React.createRef();

        this.lastChatName = "";

        this.motd = [
            `Welcome to chatty!`,
            `You can freely login without authorization and start talking, but authorization gives feature to reserve your nickname only for you.`,
            `Note: chatty uses cookies to provide it's basic functionality, by using chatty you automatically agree with our cookie policy.`,
            `We have bot running, simply write "/help" command to learn about available commands.`,
        ]
    }

    componentDidUpdate = () => {
        if (!this.props.activeChat) return

        // clearing scrolls for non-existent chats
        for (let k of this.scrolls.keys()) {
            if (!this.props.chats.get(k)) {
                this.scrolls.delete(k);
            }
        }

        // removing stick botton if we switched chats and updating lastChatName
        if (this.lastChatName !== "" && this.props.activeChat != this.lastChatName) {
            let lastScrollStatus = this.getScrollStatus(this.lastChatName)
            lastScrollStatus.stickBottom = false;
            this.scrolls.set(this.lastChatName, lastScrollStatus)
        }
        this.lastChatName = this.props.activeChat

        // scrolling to last scroll height, it will call onScroll event, that will update scrollStatus
        let scrollStatus = this.getScrollStatus(this.props.activeChat)
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
        let chat = this.props.chats.get(this.props.activeChat)
        return (
            <div className="chatbox overflow-y blue-gradient" ref={this.myRef}
                onScroll={() => {
                    console.log("onScroll", chat)
                    if (!chat) return;
                    this.scrolls.set(chat.chat, {
                        scrollTop: this.myRef.current.scrollTop, //+ this.myRef.current.offsetHeight + 2,
                        stickBottom: this.myRef.current.scrollTop + this.myRef.current.offsetHeight + 2 >= this.myRef.current.scrollHeight
                    })
                }
                }>
                {
                    chat ? chat.messages.map((m, idx, arr) => {
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
                    }) : this.motd.map((contents) => {
                        return <ChatLines.Motd contents={contents}></ChatLines.Motd>
                    })
                }
            </div>
        )
    }
}

export default ChatBox
