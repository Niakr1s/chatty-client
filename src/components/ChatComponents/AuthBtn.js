import React from "react"

class AuthBtn extends React.Component {
    render = () => {
        return (
            <div className="chat-header-prompt">
                <button
                    className="btn lightblue"
                    onClick={() => this.props.onAuthClick()}
                >auth</button>
            </div>
        )
    }
}

export default AuthBtn