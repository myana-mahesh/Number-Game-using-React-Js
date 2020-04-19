import React,{useState,useEffect} from 'react';

import './App.css';

const PlayNumber=(props)=>{
  return(
    <button  
    className="number"
    style={{backgroundColor:colors[props.status(props.number)]}}
    onClick={()=>props.onClick(props.number,props.status(props.number))}>
    {props.number}
    </button>
  )
}

const StarDisplay=(props)=>
<>  
{util.range(1,props.stars).map(star =>
    
    <div key={star} className="star"/>
    )}
    </>
  

const PlayAgin=(props)=>{
  return(
  <>
  <h1 id='a' style={{color:props.sts==='lost'?'red':'green'}}>{props.sts==='lost'?'Tumse na hopayega':'Chava'}</h1>
  <button onClick={props.resetGames}>
    PlayAgin
    </button>
    </>
    );
}


function Game(props){
  
 
/*   const [stars,setStars]=useState(util.ranDom(1,9));
  const [availableNum,setAvaialableNum]=useState(util.range(1,9));
  const [candidateNum,setCandidateNum]=useState([]);
  const [seconds,setSeconds]=useState(3);
  
  useEffect(() => {
    let timerID=0;
    if(seconds>0 && availableNum.length>0){
     timerID=setInterval(()=>{
       setSeconds(seconds-1);
    },1000);
    
    }
    return ()=> clearInterval (timerID)
  }
  
  ); */




  const gameStatus=availableNum.length===0 ?'won':seconds===0?'lost':'active';

  const numberStatus=(number)=>{
    if(!availableNum.includes(number)){
      return 'used';
    }
    if(candidateNum.includes(number)){
      if(util.sum(candidateNum)>stars){
        return 'wrong';
      }
      else
      return 'candidate';
    }
    
    return 'available';

     
  }
 
  const onClickNumber=(number,currentStatus)=>{
    if(gameStatus==='lost'){
     return;
    }
    if(gameStatus==='won'&& currentStatus ==='used' ){
      document.getElementById('a').innerHTML=`<div id="b">marneka hai terko?</div>`
    }
   const newCandidateNum=currentStatus==='available'?candidateNum.concat(number):candidateNum.filter(a=>!candidateNum.includes(a));

    if(util.sum(newCandidateNum)!==stars){
      setCandidateNum(newCandidateNum);
    }
    else{  
      const newAvailabel=availableNum.filter(n=>! newCandidateNum.includes(n));
      setAvaialableNum(newAvailabel);
      setStars(util.randomSumIn(newAvailabel,9));
      setCandidateNum([]);
      seconds<4?
      setSeconds(seconds+2):
      setSeconds(5);

    }
  }

  return(
    <div className="game">
      <div className="help">
        Pick 1 or mor numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          { gameStatus!=='active'? (
            <PlayAgin sts={gameStatus} resetGames={props.startNewGame}/>
          ):(
          <StarDisplay stars={stars}/>)
          }
        
        </div>
        <div  className="right">
        {util.range(1,9).map(number=>
        <PlayNumber
        number={number}
        key={number}
        status={numberStatus}
        onClick={onClickNumber}/>
        )}
        </div>
      </div>
      <div className="timer">
          Time remaining :{seconds} 
        </div>
    </div>
  );
}

const colors={
  available:"lightgrey",
  used:"lightgreen",
  wrong:"lightcoral",
  candidate:"deepskyblue"
};

const util={
  sum:arr=>arr.reduce((accu,cur)=>accu+cur,0),
  range:(min,max)=>Array.from({length:max-min+1},(_,i)=>min+i),
  ranDom: (min,max)=>min+Math.floor(Math.random()*(max-min +1)),
  randomSumIn:(arr,max)=>{
   const sets=[[]];
   const sums=[];
   for(let i=0;i<arr.length;i++){
     for(let j=0,len=sets.length;j<len;j++){
       const candidateSet=sets[j].concat(arr[i])
       const candidateSum=util.sum(candidateSet);
       if(candidateSum<=max){
         sets.push(candidateSet);
         sums.push(candidateSum);
       }
     }
   }
   return sums[util.ranDom(0,(sums.length-1))]
  }
}

function StarMatch(){
  const [key ,setKey]=useState(1);
  return(
  <Game key={key} startNewGame={()=>setKey(key+1)}/>
  );
}
function App() {
  return (
    <div>
     <StarMatch/>
    </div>
  );
}

export default App;
