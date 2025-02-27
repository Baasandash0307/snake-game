
'use client'
import { useEffect, useState, useRef } from "react";
import { useInterval } from "usehooks-ts";
import { useEventListener } from "usehooks-ts";

const size = 20;

const board = {
  width: 30,
  height: 30
};

export default function Home() {

  const [head, setHead] = useState({ top: 0, left: 0 })
  const [food, setFood] = useState({ top: 5, left: 5 })
  const [direction, setDirection] = useState("right")
  const [tails, setTails] = useState([{ top: 0, left: 0 }, { top: 0, left: 0 }, { top: 0, left: 0 }])

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp": {
          setDirection("up");
          break;
        }
        case "ArrowDown": {
          setDirection("down");
          break;
        }
        case "ArrowRight": {
          setDirection("right");
          break;
        }
        case "ArrowLeft": {
          setDirection("left");
          break;
        }
      }
    })
  })

  console.log(tails);


  function gameLoop() {
    let newLeft = head.left;
    let newTop = head.top;

    const newTails = [...tails,];
    newTails.push(head);
    newTails.shift();
    setTails(newTails);
    switch (direction) {
      case "right": {
        newLeft = head.left + 1;
        if (board.width <= newLeft) {
          newLeft = 0;
        }
        break;
      }

      case "left": {
        newLeft = head.left - 1;
        if (newLeft < 0) {
          newLeft = board.width - 1;
        }
        break;
      }

      case "down": {
        newTop = head.top + 1;
        if (board.height <= newTop) {
          newTop = 0;
        }
        break;
      }

      case "up": {
        newTop = head.top - 1;
        if (newTop < 0) {
          newTop = board.height - 1;
        }
        break;
      }
    }

    if (tails.find((tail) => tail.left === newLeft && tail.top === newTop)) {
      alert("GAMEOVER");
      location.reload();
    }

    setHead({ top: newTop, left: newLeft });

    if (newTop === food.top && newLeft === food.left) {
      newTails.push(head);
      setTails(newTails);
      generateNewFood();
    }

  }

  function generateNewFood() {
    const newFoodTop = getRandomInt(board.height);
    const newFoodLeft = getRandomInt(board.width);

    setFood({ top: newFoodTop, left: newFoodLeft });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useInterval(() => {
    gameLoop();
  }, 100);





  return (
    <div>
      <h1 className="flex justify-center text-black-100">SNAKE</h1>
      <div style={{ width: board.height * size, height: board.height * size }} className="relative bg-green-400 mx-auto">
        <div style={{ top: head.top * size, left: head.left * size, width: size, height: size }} className="absolute bg-green-900"></div>

        <div style={{ top: food.top * size, left: food.left * size, width: size, height: size }} className="absolute bg-red-500"></div>

        {
          tails.map((tail, index) => (
            <div key={`${tail.left}-${tail.top}-${index}`} style={{ top: tail.top * size, left: tail.left * size, width: size, height: size }} className="absolute bg-green-700"></div>
          ))
        }

      </div>

      <div className="flex gap-4 justify-center mt-10">
        <button onClick={() => setDirection("up")} className="text-[30px] border-solid border-[2px] bg-cyan-300 rounded-[15px] w-[130px]">up</button>
        <button onClick={() => setDirection("down")} className="text-[30px] border-solid border-[2px] bg-cyan-300 rounded-[15px] 130px w-[130px]">down</button>
        <button onClick={() => setDirection("right")} className="text-[30px] border-solid border-[2px] bg-cyan-300 rounded-[15px] 130px w-[130px]">right</button>
        <button onClick={() => setDirection("left")} className="text-[30px] border-solid border-[2px] bg-cyan-300 rounded-[15px] 130px w-[130px]">left</button>
      </div>
    </div>
  );
}

