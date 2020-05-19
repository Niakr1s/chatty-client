import React from "react"

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

export default AuthBtn