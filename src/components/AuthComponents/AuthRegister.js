import React from "react"

import ModalCloseButton from "./ModalCloseButton"

import { UserRegister } from "../api/ChatApi"

class AuthRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",

            error: ""
        }
    }

    register = () => {
        UserRegister({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }, (data) => {
            alert(`registration succesful, activation link sent to ${data.email}`)
            this.props.close();
        }, (error) => {
            this.setState({ error: error.response.data })
        })
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
                                        value={this.state.name}
                                        onChange={(event) => this.setState({ name: event.target.value })}
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
                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="btn"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.change();
                            }}
                        >login?</button>
                        <button
                            type="submit"
                            className="float-right btn"
                            onClick={(event) => {
                                event.preventDefault();
                                this.register();
                            }}
                        >register</button>
                    </div>
                </form>
                <div className="modal-error">
                    {this.state.error}
                </div>
                <ModalCloseButton onClick={() => this.props.close()}></ModalCloseButton>
            </div>
        )
    }
}

export default AuthRegister