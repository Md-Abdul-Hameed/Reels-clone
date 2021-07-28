import React from 'react';
import Button from "@material-ui/core/Button"

function button(props) {
    return (
        <div>
            <Button variant = "contained" color = "primary">Hello</Button>
            <Button variant = "outlined" color = "secondary">Hello</Button>
            <Button variant = "text">Hello</Button>
        </div>
    );
}

export default button;