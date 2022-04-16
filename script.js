/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function onClick (event) {

    const selected= event.currentTarget;

    const all= document.querySelectorAll('.choice-grid div');
    const qid= selected.dataset.questionId;
    for(const one of all){
            let  sqid= one.dataset.questionId;
        if(sqid === qid && one!== selected){
         one.classList.add('no-selected');
         one.classList.remove('scelta');
         one.classList.add('no_scelta');
         const check=one.querySelector('.checkbox');
         check.src='images/unchecked.png';
        }
    }

    selected.classList.remove('no_scelta');
    selected.classList.remove('no-selected');
    selected.classList.add('scelta');
    const check= selected.querySelector('.checkbox');
    check.src='images/checked.png';
    
    const cid= selected.dataset.choiceId;
    chosen_boxes[qid]= cid;  

    checkEnd();
}

const chosen_boxes ={
    one: '',
    two:'',
    three: '' 

};

const scores={
    blep: 0,
    happy: 0,
    sleeping:0,
    dopey:0,
    burger:0,
    cart:0,
    nerd:0,
    shy:0,
    sleepy:0
};

function checkEnd(){
    let count=0;
  
    for( const question_id in chosen_boxes){
        if(chosen_boxes[question_id]!=='' ){
                count++;
        }
    }   
 
    if(count===3){
      for(const choice of choices){
        choice.removeEventListener('click', onClick);
    }
        displayResult();      
    }
}

function getResult(){
    let winner_choice;
    let max_score=0 ;

    for(const question_id in chosen_boxes){
        scores[chosen_boxes[question_id]]= scores[chosen_boxes[question_id]] +1;
    }

    for(const choice_id in scores){
        if(scores[choice_id]>max_score ){
          max_score=scores[choice_id];
          winner_choice=choice_id;
       }
     }

     if (max_score===1){
          winner_choice= chosen_boxes.one;
        }
    return winner_choice;
  
  }

function displayResult(){

    const final_result=getResult();
    const resultContainer= document.querySelector('#results-id');
    const final_title_strong= resultContainer.querySelector('#result-title strong');
    final_title_strong.textContent= RESULTS_MAP[final_result].title;
    const final_contents= resultContainer.querySelector('#result-contents');
    final_contents.textContent=RESULTS_MAP[final_result].contents;
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('result');
    const page= document.querySelector('html');
    page.classList.add('background-result');

}

function refresh(){
    
    const resultContainer= document.querySelector('#results-id');
    resultContainer.classList.add('hidden');
    resultContainer.classList.remove('result');
    const choicesSelected= document.querySelectorAll('.scelta');
    for(const oneselected of choicesSelected) {
        oneselected.classList.remove('scelta');
        oneselected.classList.add('no_scelta');
        const check=oneselected.querySelector('.checkbox');
        check.src='images/unchecked.png';
        
    }
    const nochosen=document.querySelectorAll('.no-selected');
    for(const noselected of nochosen){
    
        noselected.classList.remove('no-selected');
    }

    for(const choice of choices){ 
       choice.addEventListener('click', onClick);
    }
    
    for(const question_id in chosen_boxes){
        scores[chosen_boxes[question_id]]= 0;
    }

    for(const question_id in chosen_boxes){
        chosen_boxes[question_id]='';
    }

    const page= document.querySelector('html');
    page.classList.remove('background-result');

}

const choices= document.querySelectorAll('.choice-grid div');

for(const choice of choices){
    choice.addEventListener('click', onClick);
}

const restart=document.querySelector('#refresh');
restart.addEventListener('click', refresh);
