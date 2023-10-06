import './App.css';
import { useState } from 'react';

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Сделать',
      items: [
        { id: 1, title: 'Написать приложение' },
        { id: 2, title: 'Сделать лендинг' },
      ],
    },
    { id: 2, title: 'В процессе', items: [{ id: 3, title: 'Код ревью приложения' }] },
    { id: 3, title: 'Сделано', items: [{ id: 4, title: 'Включить ПК' }] },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      }),
    );
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      }),
    );
  }

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}>
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              // onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className="item">
              {item.title}
              {board.id === 2 && <button className="">Таймер</button>}
              {board.id === 3 && <button className="">Удалить</button>}
            </div>
          ))}
          {board.id === 1 && (
            <div className="add">
              <input></input>
              <button>Добавить</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
