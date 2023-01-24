import 'animate.css';
import { useState, useEffect } from 'react';
import clickSuccesSound from './assets/success.wav';
import falling from './assets/falling.wav';
import { TbMusicOff } from 'react-icons/tb';
import { TbMusic } from 'react-icons/tb';

const boxColors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
let random = null;

function App() {
  // state
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore") || 0);
  const [score, setScore] = useState(0);
  const [music, setMusic] = useState(true)

  // sounds
  const successSound = new Audio(clickSuccesSound);
  const gameOverSound = new Audio(falling);

  const chooseRightClick = (index) => {

    if (score > 10) {
      random = Math.floor(Math.random() * 4) + 1;
    } else {
      random = null;
    }

    if (random === index) {

      setScore(0);
      setBestScore(bestScore < score ? score : bestScore);
      if (music) {
        successSound.play();
      }
      document.querySelector(`#box-${index}`).classList += " animate__flip";
    } else {

      setScore(prev => prev + 1);
      if (music) {
        successSound.play();
      }
      document.querySelector(`#box-${index}`).classList += " animate__flash";
    }

    setTimeout(() => {
      document.querySelector(`#box-${index}`).classList = `${boxColors[index - 1]} w-[150px] h-[150px] animate__animated`;
      successSound.pause();
      gameOverSound.pause();
    }, 1000);
  }

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore])

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-[300px] h-[300px]">
        <div className="flex gap-4 mb-2">
          <h1><b>best score</b> : {bestScore}</h1>
          <h1><b>score</b> : {score}</h1>
        </div>
        <div className="w-[300px] h-[300px] bg-gray-200 flex flex-wrap cursor-pointer border-black">
          {
            boxColors.map((color, index) =>
              <div
                key={index}
                className={`${boxColors[index]} w-[150px] h-[150px] animate__animated`}
                id={`box-${index + 1}`}
                onClick={() => chooseRightClick(index + 1)}>
              </div>)
          }
        </div>
        <div className="absolute right-1 top-1">
          <a href="https://github.com/yasinelbuz" className="mt-2 text-blue-600 font-bold flex" target="_blank">@yasinelbuz</a>
          <div className='flex justify-end items-center' onClick={() => setMusic(!music)}>
            {
              music ? <TbMusic className='h-16 w-11 cursor-pointer' color='green' /> : <TbMusicOff className='h-16 w-11 cursor-pointer' color='red' />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
