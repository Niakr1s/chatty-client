import React from 'react'

import { Icon } from 'semantic-ui-react'

class ChatHeaderNonAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
        }
    }

    onUsernameSubmit = (event) => {
        event.preventDefault();

        if (!this.isUsernameValid(this.state.name)) return;

        if (this.props.onUsernameSubmit) this.props.onUsernameSubmit(this.state.name);
    }

    isUsernameValid = (name) => {
        if (!name) return false;

        return true;
    }

    updateName = (name) => {
        this.setState({
            name,
        })
    }

    render = () => {
        return <form className="chat-username blue" onSubmit={(event) => this.onUsernameSubmit(event)} >
            <div>
                <input
                    className="chat-username-text no-border lightblue"
                    placeholder="Please login"
                    onChange={(event) => this.updateName(event.target.value)}
                ></input>
                <button
                    className="no-border blue"
                    type="submit"
                    disabled={!this.state.name}
                ><Icon name="angle right"></Icon></button>
            </div>
        </form >
    }
}

export default ChatHeaderNonAuth;