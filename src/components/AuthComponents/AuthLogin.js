import React from "react"

import ModalCloseButton from "./ModalCloseButton"
import ForgotPasswordBtn from "./ForgotPasswordBtn"
import { Authorize } from "../api/ChatApi"

class AuthLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            password: "",

            error: "",
        }
    }

    getAuthToken = () => {
        if (this.props.user !== "") {
            this.setState({ error: `already logged as ${this.props.user}, logout first` })
            return;
        }
        Authorize({ user: this.state.user, password: this.state.password }, (data) => {
            this.props.login(data.user);
            this.props.close();
        }, (error) => {
            this.setState({ error: error.response.data.error })
        })
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
                            type="button"
                            className="btn"
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.change();
                            }}
                        >register?</button>
                        <button
                            type="submit"
                            className="float-right btn"
                            onClick={(e) => {
                                e.preventDefault();
                                this.getAuthToken();
                            }}
                        >login</button>
                    </div>
                    <ForgotPasswordBtn
                        onClick={() => {
                            this.props.close();
                            this.props.showResetPassModal();
                        }}
                    ></ForgotPasswordBtn>
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