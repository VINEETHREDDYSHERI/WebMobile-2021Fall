// To keep track of the Score
let userWonCount  = 0;
let computerWonCount = 0;

// Computer option either rock or paper or scissor
getComputerChoice = () => {
    let randomNbr = Math.floor(Math.random() * 3);
    let computerChoice;
    switch (randomNbr)
    {
        case 1:
            computerChoice = "rock";
            break;
        case 2:
            computerChoice = "paper";
            break;
        default:
            computerChoice = "scissor";
            break;
    }
    return computerChoice;
}

setSelectedOption = (userSelectedOption) =>{
    let userChoice = userSelectedOption;
    let computerChoice = getComputerChoice();

    // Draw condition when user and computer choice is same
    if(computerChoice === userChoice)
    {
        document.getElementById("result").innerHTML = "It's a tie";
    }
    else if(userChoice==="rock") // when user selected Rock
    {
        if(computerChoice === "paper")
        {
            computerWonCount++;
            document.getElementById("result").innerHTML = "Paper beats Rock, You Loss. Better luck next time";
        }
        else{
            userWonCount++;
            document.getElementById("result").innerHTML = "Rock beats Scissor, You Won the game";
        }
    }
    else if(userChoice==="paper") // When user selected Paper
    {
        if(computerChoice === "rock")
        {
            userWonCount++;
            document.getElementById("result").innerHTML = "Paper beats Rock, You Won the game";
        }
        else{
            computerWonCount++;
            document.getElementById("result").innerHTML = "Scissor beats Paper, You Loss. Better luck next time";
        }
    }
    else{ //When user selected Scissor
        if(computerChoice === "rock")
        {
            computerWonCount++;
            document.getElementById("result").innerHTML = "Rock beats Scissor, You Loss. Better luck next time";
        }
        else{
            userWonCount++;
            document.getElementById("result").innerHTML = "Scissor beats Paper, You Won the game";
        }
    }

    // Updating user and computer choice
    document.getElementById("userChoice").innerHTML = "You selected: "+userChoice;
    document.getElementById("computerChoice").innerHTML = "Computer selected: "+computerChoice;
    // Updating the scores
    document.getElementById("userWonCount").innerHTML = "User: "+ userWonCount;
    document.getElementById("computerWonCount").innerHTML = "Computer: "+ computerWonCount;
}

