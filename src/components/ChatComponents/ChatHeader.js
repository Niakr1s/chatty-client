import React from 'react'

import ChatHeaderAuth from './ChatHeader/ChatHeaderAuth'
import ChatHeaderNonAuth from './ChatHeader/ChatHeaderNonAuth'

class ChatHeader extends React.Component {
    getInnerComponent = () => {
        return (this.props.user !== "")
            ? <ChatHeaderAuth
                user={this.props.user}
                onLogout={this.props.onLogout}
                activeChat={this.props.activeChat}
            />
            : <ChatHeaderNonAuth
                onLogin={this.props.onLogin}
            />
    }


    render = () => {
        return this.getInnerComponent()
    }
}

export default ChatHeader;