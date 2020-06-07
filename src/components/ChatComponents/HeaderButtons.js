import React from "react"


class HeaderButtons extends React.Component {
    render = () => {
        return (
            <div className="chat-header-prompt">
                <AuthBtn
                    onClick={() => this.props.onAuthClick()}
                ></AuthBtn>
                {this.props.admin && <AdminBtn
                    onClick={() => this.props.onAdminClick()}
                ></AdminBtn>}
            </div>
        )
    }
}

class AuthBtn extends React.Component {
    render = () => {
        return (
            <button
                className="btn lightblue w100"
                onClick={() => this.props.onClick()}
            >auth</button>
        )
    }
}

class AdminBtn extends React.Component {
    render = () => {
        return (
            <button
                className="btn lightblue w100"
                onClick={() => this.props.onClick()}
            >admin</button>
        )
    }
}

export default HeaderButtons