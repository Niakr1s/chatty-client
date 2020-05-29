import React from 'react'

class ChatLine extends React.Component {
    render = () => {
        return (
            <div className="chatline lightblue">
                <div className="chatline-header">
                    <div className="chatline-user">{this.props.message.user}</div>
                    <div className="chatline-time">{timeStr(this.props.message.time)}</div>
                </div>
                <div className="chatline-message">{this.props.message.text}</div>
            </div>
        )
    };
}

function timeStr(unixTime) {
    let date = new Date(unixTime * 1000)
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map((n) => {
        return ("00" + n).slice(-2)
    }).join(":")
}

export default ChatLine