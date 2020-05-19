import React from "react"

class AuthPrompt extends React.Component {
    render = () => {
        return (
            <div className="chat-header-prompt">
                <button
                    className="btn"
                    onClick={() => this.props.onAuthClick()}
                >auth</button>
            </div>
        )
    }
}

export default AuthPrompt