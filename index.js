"use strict";

//******* start board *************/
const root = document.getElementById("root");
const startBoard = [];
const suit = ["heart", "diamonds", "clubs", "spades"];

for (let i = 0; i < 42; i += 1) {
  let indexSuite = Math.floor(Math.random() * suit.length);
  const item = {
    id: i,
    color: "white",
    value: suit[indexSuite],
    isView: true
  };

  startBoard.push(item);
}

function templateItem(id, isView, value) {
  return `<div id =${id} class="square ${value}"  data-view = ${isView} data-value =${value}></div>`;
}

const render = () =>
  startBoard.map(({ id, isView, value }) => {
    const item = templateItem(id, isView, value);
    root.insertAdjacentHTML("afterbegin", item);
  });

render();

// **************function for event *****************///

let gameBoard = () => {
  const childNodesArr = Array.from(root.childNodes);
  const gameElementArr = childNodesArr.map(el => ({
    id: el.id,
    value: el.dataset.value,
    isView: el.dataset.view,
    position: el.getBoundingClientRect(),
    link: el
  }));
  return gameElementArr;
};
//*serch related square */
function searchSquare(startSquare, arr, target) {
  const squareArr = arr.filter(el => el.value == target.dataset.value);
  let broSquare = [startSquare];
  let iteretion;
  do {
    iteretion = false;
    let nextStep = [];
    squareArr.forEach(el =>
      broSquare.forEach(square => {
        if (el.isView == false) return;
        if (el.id == square.id) el.isView = false;
        if (
          (square.position.x === el.position.x &&
            square.position.top == el.position.bottom) ||
          (square.position.x === el.position.x &&
            square.position.bottom == el.position.top) ||
          ((square.position.y === el.position.y &&
            square.position.right == el.position.left) ||
            (square.position.y === el.position.y &&
              square.position.left == el.position.right))
        ) {
          el.isView = false;
          nextStep.push(el);
          iteretion = true;
        }
      })
    );
    broSquare = nextStep;
  } while (iteretion);
  return squareArr.filter(el => el.isView === false);
}

//* remove element in dom */
function changeSguareInDOM(searchBoard, changeSquareArr) {
  searchBoard.forEach(el =>
    changeSquareArr.forEach(square => {
      if (el.id === square.id) el.link.remove();
    })
  );
}

root.addEventListener("click", handleClick);

function handleClick({ target }) {
  const searchBoard = gameBoard();
  const startSquare = {
    id: target.id,
    value: target.innerHTML,
    position: target.getBoundingClientRect(),
    link: target
  };
  const changeSquareArr = searchSquare(startSquare, searchBoard, target);
  changeSguareInDOM(searchBoard, changeSquareArr);
}
