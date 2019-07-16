import React from 'react';
import { Card } from 'antd';
import { DragSource } from 'react-dnd';
const source = {
    beginDrag(props) {
        return { data: props.data };
    }
};
function DragSourceBox(props) {
    const { data, connectDragSource } = props;
    return connectDragSource(<div>
        <Card size="small" title={data.label}>{data.name}</Card>
    </div>)
}

export default DragSource('Box', source, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
}))(DragSourceBox);