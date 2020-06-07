import React from 'react'

class ForgotPasswordBtn extends React.Component {
    render = () => {
        return <button
            type="button"
            className="btn-a no-border"
            onClick={(event) => {
                event.preventDefault();
                this.props.onClick();
            }}
        >forgot password?</button>
    }
}

export default ForgotPasswordBtn