import React from 'react';

export const Address = (props) => 
{
    return (
        <React.Fragment>
            <div>{props.address1}</div>
            { props.address2 && (<div>{props.address2}</div>)}
            <div>{props.city}, {props.state} {props.zip}</div>
        </React.Fragment>
    );
}