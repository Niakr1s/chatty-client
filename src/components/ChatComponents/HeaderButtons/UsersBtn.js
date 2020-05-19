import React from "react"

class UsersBtn extends React.Component {
    render = () => {
        return (
            <button
                className="btn lightblue w100"
                onClick={() => this.props.onClick()}
            >users</button>
        )
    }
}

export default UsersBtn