import React from "react"

import AuthBtn from "./HeaderButtons/AuthBtn"
import UsersBtn from "./HeaderButtons/UsersBtn"

class HeaderButtons extends React.Component {
    render = () => {
        return (
            <div className="chat-header-prompt">
                <table>
                    <tr>
                        <AuthBtn
                            onClick={() => this.props.onAuthClick()}
                        >auth</AuthBtn>
                    </tr>
                    <tr>
                        <UsersBtn
                            onClick={() => { }}
                        >users</UsersBtn>
                    </tr>
                </table>
            </div>
        )
    }
}

export default HeaderButtons