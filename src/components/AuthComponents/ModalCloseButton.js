import React from "react"

import { Icon } from "semantic-ui-react";

class ModalCloseButton extends React.Component {
    render = () => {
        return (
            <button
                className="modal-close no-border"
                onClick={() => this.props.onClick()}
            ><Icon fitted={true} name="close"></Icon></button>
        )
    }
}

export default ModalCloseButton