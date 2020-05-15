import React from 'react'
import { Icon } from "semantic-ui-react"

class ChatInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
        }
    }

    setText = (text) => {
        this.setState({
            text: text,
        })
    }

    highlightEnterButton = () => {
        this.chatEnterEl.classList.add("red")
        this.chatEnterEl.classList.remove("blue")
    }


    unHighlightEnterButton = () => {
        this.chatEnterEl.classList.add("blue")
        this.chatEnterEl.classList.remove("red")
    }

    render() {
        return (
            <form
                className="chatinput darkblue"
                onSubmit={(event) => {
                    event.preventDefault();
                    this.props.onPostMessage(this.state.text);
                    this.setText("");
                }}
            >
                <input
                    className="chatinput-input no-border lightblue"
                    value={this.state.text}
                    onChange={(event) => { this.setText(event.target.value) }}
                />
                <button
                    type="submit"
                    className="chatinput-enter no-border lightblue"
                    ref={(el) => { this.chatEnterEl = el; }}
                    onMouseEnter={() => { this.highlightEnterButton(); }}
                    onMouseLeave={() => { this.unHighlightEnterButton(); }}
                    disabled={!this.state.text}
                ><Icon name="send"></Icon></button>
            </form >
        )
    }
}

export default ChatInput