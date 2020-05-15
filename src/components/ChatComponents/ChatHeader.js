import React from 'react'

import ChatHeaderAuth from './ChatHeader/ChatHeaderAuth'
import ChatHeaderNonAuth from './ChatHeader/ChatHeaderNonAuth'

class ChatHeader extends React.Component {
    render = () => {
        return this.props.user.name !== ""
            ? <ChatHeaderAuth
                user={this.props.user}
                onLogout={this.props.onLogout}
            />
            : <ChatHeaderNonAuth
                onUsernameSubmit={this.props.onUsernameSubmit}
            />
    }
}

export default ChatHeader;