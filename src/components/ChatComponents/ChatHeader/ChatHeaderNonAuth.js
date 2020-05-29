import React from 'react'

import { Icon } from 'semantic-ui-react'

class ChatHeaderNonAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
        }
    }

    onUsernameSubmit = (event) => {
        event.preventDefault();

        if (!this.isUsernameValid(this.state.user)) return;

        if (this.props.onLogin) this.props.onLogin(this.state.user);
    }

    isUsernameValid = (user) => { return user !== "" }

    updateName = (user) => {
        this.setState({ user })
    }

    render = () => {
        return <form className="chat-username blue" onSubmit={(event) => this.onUsernameSubmit(event)} >
            <div>
                <input
                    className="chat-username-text no-border lightblue"
                    placeholder="Login without password"
                    onChange={(event) => this.updateName(event.target.value)}
                ></input>
                <button
                    className="no-border blue"
                    type="submit"
                    disabled={!this.state.user}
                ><Icon name="angle right"></Icon></button>
            </div>
        </form >
    }
}

export default ChatHeaderNonAuth;