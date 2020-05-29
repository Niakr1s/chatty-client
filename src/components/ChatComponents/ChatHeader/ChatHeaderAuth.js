import React from 'react'

import { Icon } from 'semantic-ui-react'

class ChatHeaderAuth extends React.Component {
    onLogoutClick = (event) => {
        event.preventDefault();
        if (this.props.onLogout !== undefined) this.props.onLogout();
    }

    render = () => {
        return <div className="chat-username blue">
            <div className="chat-username-text no-border lightblue">{this.props.user}
            </div>
            <button
                className="no-border blue"
                onClick={(event) => this.onLogoutClick(event)}
            ><Icon name="log out"></Icon></button>
        </div>
    }
}

export default ChatHeaderAuth;