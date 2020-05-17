import React from "react"

import ModalCloseButton from "./ModalCloseButton"

class AuthRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            email: "",
            password: "",

            error: ""
        }
    }

    render = () => {
        return (
            <div className="modal-content">
                <div className="modal-content-header">Register</div>
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
                            <tr>
                                <td>
                                    <span>E-mail:</span>
                                </td>
                                <td>
                                    <input
                                        className="no-border"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({ email: event.target.value })}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="modal-buttons">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.change();
                        }}
                    >login</button>
                    <button
                        className="float-right"
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                    >register</button>
                </div>
                <div className="modal-error">
                    {this.state.error}
                </div>
                <ModalCloseButton onClick={() => this.props.close()}></ModalCloseButton>
            </div>
        )
    }
}

export default AuthRegister