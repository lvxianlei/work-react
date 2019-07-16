import React from 'react';
export default props => {
    const status = props.match.params.status;
    return <h3>{status ? status : '404'}</h3>
};