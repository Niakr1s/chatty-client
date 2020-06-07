import React from 'react'

import * as ChatApi from '../api/ChatApi'
import ModalCloseButton from '../AuthComponents/ModalCloseButton'

class ResetPassModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            token: "",
            pass: "",
            passRe: "",

            err: ""
        }
    }

    requestResetPass = () => {
        if (this.state.user === "") { this.setError("empty user"); return; }
        ChatApi.RequestResetPass(this.state.user, () => {
            alert("Reset password token had been sent to your email, check it and enter it into this field")
        })
    }

    resetPass = () => {
        if (this.state.user === "") { this.setError("empty user"); return; }
        if (this.state.token === "") { this.setError("empty token"); return; }
        if (this.state.pass === "" || this.state.passRe === "") { this.setError("empty pass or passRe"); return; }
        if (this.state.pass !== this.state.passRe) { this.setError("pass and pass re mismatch"); return; }

        let userWithTokenAndPass = {
            user: this.state.user,
            passwordResetToken: this.state.token,
            password: this.state.pass
        }
        ChatApi.ResetPass(userWithTokenAndPass, () => {
            this.props.close();
        }, (error) => {
            this.setError("couldn't reset password")
        })
    }

    setError = (err) => {
        this.setState({ err })
    }

    error = () => {
        return <div className="modal-error">{this.state.err}</div>
    }

    innerComponent = () => {
        return <div className="modal-content">
            <div className="modal-content-header">Reset Password</div>
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
                                <span>Token:</span>
                            </td>
                            <td>
                                <input
                                    className="no-border"
                                    type="password"
                                    placeholder="token from email"
                                    value={this.state.password}
                                    onChange={(event) => this.setState({ token: event.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Pass:</span>
                            </td>
                            <td>
                                <input
                                    className="no-border"
                                    value={this.state.email}
                                    placeholder="Enter new password"
                                    onChange={(event) => this.setState({ pass: event.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Pass re:</span>
                            </td>
                            <td>
                                <input
                                    className="no-border"
                                    value={this.state.email}
                                    placeholder="Repeat new password"
                                    onChange={(event) => this.setState({ passRe: event.target.value })}
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
                            this.requestResetPass();
                        }}
                    >send token</button>
                    <button
                        type="submit"
                        className="float-right btn"
                        onClick={(event) => {
                            event.preventDefault();
                            this.resetPass();
                        }}
                    >reset pass</button>
                </div>
            </form>
            <div className="modal-error">
                {this.state.err}
            </div>
            <ModalCloseButton
                onClick={this.props.close}
            ></ModalCloseButton>
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

export default ResetPassModal