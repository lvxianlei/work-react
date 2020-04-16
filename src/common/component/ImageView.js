import React from 'react';
import RcViewer from '@hanyk/rc-viewer';
import PropTypes from 'prop-types';

function ImageView({ url }) {
    const options = {
        toolbar: 0,
    };

    return (<div>
        <RcViewer options={options}>
            <img src={url} style={{ height: '30px' }} alt="" />
        </RcViewer>
    </div>);
};
ImageView.propTypes = {
    url: PropTypes.string
}
export default ImageView;