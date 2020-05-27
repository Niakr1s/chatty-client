import React from "react"

import AuthBtn from "./HeaderButtons/AuthBtn"
import UsersBtn from "./HeaderButtons/UsersBtn"
import ChatsBtn from "./HeaderButtons/ChatsBtn"

class HeaderButtons extends React.Component {
    render = () => {
        return (
            <div className="chat-header-prompt">
                <table>
                    <tr>
                        <td colSpan="100%">
                            <AuthBtn
                                onClick={() => this.props.onAuthClick()}
                            >auth</AuthBtn>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ChatsBtn
                                onClick={() => { this.props.onChatsClick() }}
                            >users</ChatsBtn>
                        </td>
                        <td>
                            <UsersBtn
                                onClick={() => { this.props.onUsersClick() }}
                            >users</UsersBtn>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default HeaderButtons