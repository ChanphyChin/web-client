import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CSSProperties, Component } from 'react';
import { cloneDeep } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';

import { IframeManager } from '../../../services';
import { Parser } from '../index';
import { MessageDataInterface } from '../../types';
import './index.scss';

const grid = 4;

const getItemStyle = (isDragging: Boolean, draggableStyle: CSSProperties): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: `${grid * 2}px`,
    margin: `0 0 ${grid}px 0`,

    border: '3px dashed lightblue',
    position: 'relative',

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",
    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = (isDraggingOver: Boolean) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: `${grid}px`,
    width: '100%',
    boxSizing: 'border-box'
});

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

interface EditableRendererState {
    postMessage: MessageDataInterface;
    visible: Boolean[];
}

interface EditableRendererProps {
    pageConfig: MessageDataInterface;
}

export class EditableRenderer extends Component<EditableRendererProps, EditableRendererState> {
    state: EditableRendererState = {
        postMessage: {
            config: {
              component: '',
              config: ''
            },
            index: 0,
            items: [],
          },
          visible: []
    }

    componentWillReceiveProps(props: EditableRendererProps) {
        const { pageConfig } = props;
        pageConfig && this.setState({ postMessage: pageConfig });
    }

    componentWillMount () {
        IframeManager.subscrib(this.receiveMessage);
    }

    componentWillUnmount () {
        IframeManager.unSubscrib();
    }

    receiveMessage = (e: any) => {
        if(!e.data.config) return;
        this.setState({ postMessage: e.data });
    }

    onDragEnd = (result: any) => {
        console.log(2);
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.state.postMessage.items,
            result.source.index,
            result.destination.index
        );
        this.setState({
            postMessage: {...this.state.postMessage, items}
        });
    }

    onDelete = (index: number) => {
        const postMessage = cloneDeep(this.state.postMessage);
        postMessage.type = 'add';
        postMessage.items.splice(index, 1);
        this.setState({ postMessage });
        window.parent.postMessage(postMessage, "*");
    }

    onAdd = (addType: string, index: number, e: any) => {
        e.stopPropagation();
        const message = {
            type: 'add',
            addType,
            index,
            items: this.state.postMessage.items
        }
        window.parent.postMessage(message, "*");
    }

    visible: Boolean[] = [];

    toggleVisible = (index: number) => {
        let preStatus = this.state.visible[index];
        let visible = Array.from({ length: this.state.postMessage.items.length }, () => false);
        visible[index] = !preStatus;
        this.setState({ visible });
        const message = {
            type: 'edit',
            index,
            items: this.state.postMessage.items,
            config: this.state.postMessage.items[index]
        }
        window.parent.postMessage(message, "*");
    }

    getVisible = (index: number) => {
        return this.state.visible[index] ? 'visible' : 'hidden';
    }
    render() {
        const { postMessage: { items = [] } } = this.state;
        console.log(postMessage);
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="list">
                    {(provided: any, snapshot: any) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
                            <Draggable  draggableId={`${item.config}-${index}`} index={index} key={`${item.config}-${index}`}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style || {}
                                    )}
                                    className='draggable-container'
                                    onClick={(e) => this.toggleVisible(index)}
                                    >
                                    <div
                                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                                        className='draggable-container__oprator__del'
                                        onClick={() => this.onDelete(index)}
                                    >
                                        <div className='at-icon at-icon-trash draggable-container__oprator__icon-del'></div>
                                    </div>
                                    
                                    <div
                                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                                        className='draggable-container__oprator__add draggable-container__oprator__add-pre'
                                        onClick={(e) => this.onAdd('pre', index, e)}
                                    >
                                        <PlusOutlined />
                                    </div>
                                    <div
                                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                                        className='draggable-container__oprator__add draggable-container__oprator__add-next'
                                        onClick={(e) => this.onAdd('next', index, e)}
                                    >
                                        <PlusOutlined />
                                    </div>
                                        <Parser config={item.config} component={item.component} isEdit={true}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
