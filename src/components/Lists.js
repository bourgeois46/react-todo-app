import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; // 자동 생성
import List from './List';


const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  const handleEnd = (result) => { // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보 포함
    console.log('result', result);

    // 목적지가 없으면(이벤트 취소) 이 함수 종료
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 지워준다.
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 Insert 해준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) =>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      handleClick={handleClick}
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          }
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;


