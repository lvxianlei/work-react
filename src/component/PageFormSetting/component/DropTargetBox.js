import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import { DropTarget } from 'react-dnd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import CardForm from '../../../common/component/CardForm';
import { is } from 'immutable';

const SortableList = SortableContainer(({ children, submitData }) => <section className='page_form'>
    <p>配置结果</p>
    <div className='list_item'>
        {children}
    </div>
    <Button type='primary' onClick={submitData}>保存</Button>
</section>);

const SortableItem = SortableElement(({ data, pages, onDelete }) => <div className="sortable-item">
    <CardForm data={data} pages={pages} showForm={true} />
    <Button className="delete-btn" size="small" type="danger" onClick={() => onDelete(data)}><Icon className="delete" type="close-square" /></Button>
</div>)

class DropTargetBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            list: props.page.get('pageFieldPositions').filter(item => item.name !== 'id'),
            highlighted: props.canDrop,
            hovered: props.isOver
        }
        this.onSortEnd = this.onSortEnd.bind(this);
        this.addListItem = this.addListItem.bind(this);
    }

    onSortEnd({ oldIndex, newIndex }) {
        this.setState({ list: arrayMove(this.state.list, oldIndex, newIndex) });
    }

    onDelete(itemData) {
        this.setState({ list: this.state.list.filter(item => item.id !== itemData.id) });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        !is(nextProps.page, this.state.page) && this.setState({
            page: nextProps.page,
            list: nextProps.page.get('pageFieldPositions').filter(item => item.name !== 'id'),
            hovered: nextProps.isOver,
        })
    }

    addListItem(itemData) {
        const list = this.state.list.slice(0);
        this.setState({ list: list.concat([itemData]) });
    }

    submitData() {
        const { list } = this.state
        this.props.savePageFormData(list)
    }

    render() {
        const { connectDropTarget, pages } = this.props;
        const { hovered, list } = this.state;
        return connectDropTarget(<nav className="dropTarget">
            <div className={hovered ? "hover" : "hide"}>
                <p>新增配置项</p>
            </div>
            <SortableList onSortEnd={this.onSortEnd} axis="xy" submitData={this.submitData.bind(this)} >
                {
                    list.map((item, index) => <SortableItem index={index} key={index} onDelete={this.onDelete.bind(this)} data={item} pages={pages} />)
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
    },
    hover(props, monitor, component) {
    }
}, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
    source: monitor.getItem(),
    isDidDrop: monitor.didDrop()
}))(DropTargetBox);