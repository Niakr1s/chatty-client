import React from 'react'

import ModalCloseButton from '../AuthComponents/ModalCloseButton'

class AdminModel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addChatText: "",
            delChatText: "",
            err: ""
        }
    }

    addChatSubmit = (event) => {
        event.preventDefault();
        let chatname = this.state.addChatText;
        if (chatname === "" || this.props.chats.get(chatname)) {
            this.setErrorEmptyInput();
            return;
        }
        this.props.addChat(chatname, () => {
            this.props.close()
        }, () => {
            this.setError("couldn't add chat")
        })
    }

    delChatSubmit = (event) => {
        event.preventDefault();
        let chatname = this.state.delChatText;
        if (this.chatname === "" || !this.props.chats.get(chatname)) {
            this.setErrorEmptyInput();
            return;
        }
        this.props.delChat(chatname, () => {
            this.props.close()
        }, () => {
            this.setError("couldn't del chat")
        })
    }

    setError = (err) => {
        this.setState({ err })
    }

    setErrorEmptyInput = () => {
        this.setState({ err: "empty chat" })
    }

    error = () => {
        return <div className="modal-error">{this.state.err}</div>
    }

    innerComponent = () => {
        return <div className="modal-content">
            <table>
                <tr>
                    <td colSpan="100%">
                        <div className="center">Chats</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <form onSubmit={this.addChatSubmit}                        >
                            <input className="w80"
                                onChange={(event) => this.setState({ addChatText: event.target.value })}></input>
                            <button type="submit" className="no-border float-right">
                                add
                            </button>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td>
                        <form onSubmit={this.delChatSubmit}  >
                            <input className="w80"
                                onChange={(event) => this.setState({ delChatText: event.target.value })}></input>
                            <button type="submit" className="no-border float-right">
                                del
                            </button>
                        </form>
                    </td>
                </tr>
            </table>
            {this.state.err && this.error()}
            <ModalCloseButton onClick={this.props.close}></ModalCloseButton>
        </div >
    }

    render = () => {
        return (
            <div className="modal" >
                {this.innerComponent()}
            </div>
        )
    }
}

export default AdminModel