import React from "react"


class HeaderButtons extends React.Component {
    render = () => {
        return (
            <div className="chat-header-prompt">
                <AuthBtn
                    onClick={() => this.props.onAuthClick()}
                >auth</AuthBtn>
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

export default HeaderButtons