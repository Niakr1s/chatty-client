import React from 'react'
import { Icon } from 'semantic-ui-react'

export class ChatLine extends React.Component {
    render = () => {
        return (
            <div className="chatline lightblue">
                <div className="chatline-header">
                    <div
                        className="chatline-user"
                    >
                        {this.props.message.user}
                        {this.props.message.verified && <Icon name="check" className="green float-right" title="verified"></Icon>}
                    </div>
                    <div className="chatline-time">{timeStr(this.props.message.time)}</div>
                </div>
                <div className="chatline-message">{this.props.message.text}</div>
            </div>
        )
    };
}

export class SysMsgChatLine extends React.Component {
    render = () => {
        return (
            <div className="chatline pink">
                <div className="chatline-message inline-block">{this.props.message.text}</div>
                <div className="chatline-time float-right">{timeStr(this.props.message.time)}</div>
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