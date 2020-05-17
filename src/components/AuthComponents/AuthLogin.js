import React from "react"

import ModalCloseButton from "./ModalCloseButton"
import { Modal } from "semantic-ui-react";

class AuthLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            password: "",

            error: "",
        }
    }

    render = () => {
        return (
            <div className="modal-content">
                <div className="modal-content-header">Login</div>
                <form className="modal-form">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <span>User:</span>
                                </td>
                                <td>
                                    <input
                                        className="no-border"
                                        value={this.state.user}
                                        onChange={(event) => this.setState({ user: event.target.value })}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Password:</span>
                                </td>
                                <td>
                                    <input
                                        className="no-border"
                                        type="password"
                                        value={this.state.password}
                                        onChange={(event) => this.setState({ password: event.target.value })}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="modal-buttons">
                        <button
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.change();
                            }}
                        >register</button>
                        <button
                            className="float-right"
                            onClick={(e) => e.preventDefault()}
                        >login</button>
                    </div>
                    <div className="modal-error">
                        {this.state.error}
                    </div>
                </form>
                <ModalCloseButton onClick={() => this.props.close()}></ModalCloseButton>
            </div>
        )
    }
}

export default AuthLogin