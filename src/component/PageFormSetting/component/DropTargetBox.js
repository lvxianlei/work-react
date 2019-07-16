import React, { PureComponent } from 'react';
import { List, Button } from 'antd';
import { DropTarget } from 'react-dnd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import CardForm from '../../../common/component/CardForm';
import { is } from 'immutable';
const SortableList = SortableContainer(({ children }) => <List
    header={<div>配置结果</div>}
    grid={{ column: 3 }}
    style={{ height: "100%" }}
    footer={<div><Button type="primary">保存</Button></div>}
    dataSource={children}
    renderItem={item => item}
    bordered />);

const SortableItem = SortableElement(({ data, pages }) => <List.Item style={{ backgroundColor: "#fff", paddingTop: "10px", marginBottom: '0' }}>
    <CardForm data={data} pages={pages} showForm={true} />
</List.Item>)

class DropTargetBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            list: props.page.get('pageFieldPositions').filter(item => item.name !== 'id'),
            highlighted: props.canDrop,
            hovered: props.isOver,
        }
        this.onSortEnd = this.onSortEnd.bind(this);
        this.addListItem = this.addListItem.bind(this);
    }
    onSortEnd({ oldIndex, newIndex }) {
        this.setState({ list: arrayMove(this.state.list, oldIndex, newIndex) });
    }
    componentWillReceiveProps(nextProps) {
        !is(nextProps.page, this.state.page) && this.setState({
            page: nextProps.page,
            list: nextProps.page.get('pageFieldPositions').filter(item => item.name !== 'id'),
            hovered: nextProps.isOver
        })
    }
    addListItem(itemData) {
        const list = this.state.list.slice(0);
        this.setState({ list: list.concat([itemData]) });
    }
    render() {
        const { connectDropTarget, pages } = this.props;
        const { hovered, list } = this.state;
        console.log('----render:', list)
        return connectDropTarget(<nav className="dropTarget">
            <div className={hovered ? "hover" : "hide"}>
                <p>新增配置项</p>
            </div>
            <SortableList onSortEnd={this.onSortEnd} axis="xy" >
                {
                    list.map((item, index) => <SortableItem index={index} key={index} data={item} pages={pages} />)
                }
            </SortableList>
        </nav>)
    }
}

export default DropTarget('Box', {
    drop(props, monitor, component) {
        const addItem = monitor.getItem().data;
        const isDidDrop = monitor.didDrop();
        !isDidDrop && component.addListItem(addItem);
    }
}, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
    source: monitor.getItem(),
    isDidDrop: monitor.didDrop()
}))(DropTargetBox);