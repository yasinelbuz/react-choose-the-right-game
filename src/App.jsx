import 'animate.css';
import {useState} from 'react';
import clickSuccesSound from './assets/success.wav';
import falling from './assets/falling.wav';

const boxColors = ["bg-red-500","bg-yellow-500","bg-blue-500","bg-green-500"];
let random = null;

function App() {
  //
  //state
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);

  //sounds
  const successSound = new Audio(clickSuccesSound);
  const gameOverSound = new Audio(falling);


  const chooseRightClick = (index, color) => {
    
    random = Math.floor(Math.random() * 4) + 1;

    if(random === index){
      setScore(0);
      setBestScore(bestScore < score ? score : bestScore);
      gameOverSound.play();
      document.querySelector(`#box-${index}`).classList += " animate__flip";
    }else{
      setScore(prev => prev + 1);
      successSound.play();
      document.querySelector(`#box-${index}`).classList += " animate__flash";
    }
      
      setTimeout(() => {
          document.querySelector(`#box-${index}`).classList = `${color} w-[150px] h-[150px] animate__animated`;

          //sound
          successSound.pause();
          gameOverSound.pause();
      }, 1000);

  }

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
              className={`${color} w-[150px] h-[150px] animate__animated`}
              id={`box-${index + 1}`}
              onClick={() => chooseRightClick(index + 1, color)}>
            </div>)
          }
          
          
        </div>
        <div className="absolute right-2 top-2">
          <a href="https://github.com/yasinelbuz" className="mt-2 text-blue-600 font-bold" target="_blank">@yasinelbuz</a>
        </div>
      </div>
    </div>
  )
}

export default App
