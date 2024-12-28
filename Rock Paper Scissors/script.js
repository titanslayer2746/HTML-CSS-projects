
let userChoice;
let userScore = 0;
let robotScore = 0;

document.addEventListener('click',(e) =>
    { 
      userChoice = e.target.className;//get the choice class name
      if(userChoice==='fa-solid fa-hand-back-fist fa-rotate-90'||userChoice==='fa-solid fa-hand fa-rotate-90'||userChoice==='fa-solid fa-hand-scissors fa-flip-horizontal'){
        const array = userChoice.split(" ");
        let selection = document.getElementById('selection');
        selection.className = '';
        for(let i=0;i<array.length;i++){
            selection.classList.add(array[i]);
        }
      }

      if(userChoice){
        const choices = ["fa-solid fa-hand-back-fist fa-rotate-270", "fa-solid fa-hand fa-rotate-270", "fa-solid fa-hand-scissors"];
        const robotChoice = choices[Math.floor(Math.random() * choices.length)];
    
        if(robotChoice){
            const array = robotChoice.split(" ");
            let robotSelection = document.getElementById('robot-selection');
            robotSelection.className = '';
            for(let i=0;i<array.length;i++){
                robotSelection.classList.add(array[i]);
            }

            const rock1 = "fa-solid fa-hand-back-fist fa-rotate-90";
            const paper1 = "fa-solid fa-hand fa-rotate-90";
            const scissors1 = "fa-solid fa-hand-scissors fa-flip-horizontal"
            const rock2 = choices[0];
            const paper2 = choices[1];
            const scissors2 = choices[2];

            if((userChoice===rock1&&robotChoice===rock2)||(userChoice===paper1&&robotChoice===paper2)||(userChoice===scissors1&&robotChoice===scissors2)){
                console.log("It's a tie!");
            }
            else if((userChoice===rock1&&robotChoice===scissors2)||(userChoice===paper1&&robotChoice===rock2)||(userChoice===scissors1&&robotChoice===paper2)){
                console.log("You win!");
                userScore++;
            }
            else{
                console.log("You lose!");
                robotScore++;
            }
            document.getElementById('player-score').textContent = userScore;
            document.getElementById('robot-score').textContent = robotScore;
        }

    }

    }
);

