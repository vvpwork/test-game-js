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
  const squareArr = arr.filter(el => el.value === target.dataset.value);
  console.log(squareArr);
  let broSquare = [startSquare];
  let iteretion;
  do {
    iteretion = false;
    let nextStep = [];
    squareArr.forEach(el => {
      broSquare.forEach(square => {
        if (el.isView === false) return;
        if (square.id === +el.id) {
          el.isView = false;
          iteretion = true;
        }
        if (
          (Math.floor(square.position.x) === Math.floor(el.position.x) &&
            Math.floor(square.position.top) ==
              Math.floor(el.position.bottom)) ||
          (Math.floor(square.position.x) === Math.floor(el.position.x) &&
            Math.floor(square.position.bottom) ==
              Math.floor(el.position.top)) ||
          ((Math.floor(square.position.y) === Math.floor(el.position.y) &&
            Math.floor(square.position.right) ===
              Math.floor(el.position.left)) ||
            (Math.floor(square.position.y) === Math.floor(el.position.y) &&
              Math.floor(square.position.left) ==
                Math.floor(el.position.right)))
        ) {
          el.isView = false;
          nextStep.push(el);
          iteretion = true;
        }
      });
    });
    broSquare = nextStep;
    console.log(broSquare);
  } while (iteretion);
  return squareArr.filter(el => el.isView === false);
}

//* remove element in dom */
function changeSguareInDOM(searchBoard, changeSquareArr) {
  searchBoard.forEach(el =>
    changeSquareArr.forEach(square => {
      if (el.id === square.id) console.log(el.link.id) || el.link.remove();
    })
  );
}

root.addEventListener("click", handleClick);

function handleClick({ target }) {
  const searchBoard = gameBoard();
  console.log(searchBoard);
  const startSquare = {
    id: +target.id,
    value: target.dataset.value,
    position: target.getBoundingClientRect(),
    link: target,
    isView: false
  };
  console.log(startSquare);
  const changeSquareArr = searchSquare(startSquare, searchBoard, target);
  changeSguareInDOM(searchBoard, changeSquareArr);
}
