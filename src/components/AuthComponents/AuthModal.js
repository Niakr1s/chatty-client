import React from "react"

import AuthLogin from "./AuthLogin"
import AuthRegister from "./AuthRegister"


class AuthModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: true,
        }
    }

    changeToRegister = () => {
        this.setState({ showLogin: false })
    }

    changeToLogin = () => {
        this.setState({ showLogin: true })
    }

    innerComponent = () => {
        return this.state.showLogin
            ? <AuthLogin
                change={this.changeToRegister}
                user={this.props.user}
                close={this.props.close}
                login={this.props.login}
                showResetPassModal={this.props.showResetPassModal}
            ></AuthLogin>
            : <AuthRegister
                change={this.changeToLogin}
                close={this.props.close}
            ></AuthRegister>
    }

    render = () => {
        return (
            <div className="modal" >
                {this.innerComponent()}
            </div>
        )
    }
}

export default AuthModal