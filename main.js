const yourGoal = document.querySelector('.goal');
const addBtn = document.querySelector('.add');
const list = document.querySelector('.list-container ul');
const myForm = document.querySelector('.myForm');
const result = document.querySelector('.result-container');
let oldValue;
let number = document.querySelector('.number');
let listContent = [];
let grandMa;
let listContentFromLS = JSON.parse(localStorage.getItem('listContent')) || [];

initFromLS()

myForm.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault();
 

    if(yourGoal.value && addBtn.innerText == 'Add'){
 
        const newLi = document.createElement('li');
        newLi.innerHTML = `<div class="myValue">${yourGoal.value}</div>
        <div class="button-collection">
        <button type="button" class="edit btn" id="edit"><i class="fas fa-edit"></i></button>
        <button type="button" class="delete btn" id="delete" onclick="updateLSAndDeleteItem()"><i class="fas fa-trash-alt"></i></button>
        `
        list.appendChild(newLi);

        listContentFromLS.push(newLi.firstChild.innerText);
        localStorage.setItem('listContent', JSON.stringify(listContentFromLS));
        updateLS()
        editItem();
        getGrandMA();
        showResult();
        backToDefault();
        
    } 

    
}

    

function backToDefault(){

    yourGoal.value = '';
    addBtn.innerText = 'Add';
}



function editItem(){
    
    const editBtn = document.querySelectorAll('.fa-edit');
 
    for(let i = 0; i < editBtn.length; i++){
        editBtn[i].addEventListener('click', function(e){
            oldValue = e.target.parentElement.parentElement.parentElement;
         
            console.log(oldValue);
            yourGoal.value = oldValue.firstChild.innerText;
            document.querySelector('.goal').focus();
            addBtn.innerText = 'Change';
          
        })
        
    }
 
    addBtn.addEventListener('click', function(){
        if(addBtn.innerText === 'Change'){
            
            oldValue.firstChild.innerText = yourGoal.value;
            updateLS()
            backToDefault();
            
        }
        
    });

}
    



function findWithAttr(array, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].parentElement.parentElement.parentElement.firstElementChild.innerText === value) {
           
            console.log(i);
            return i;
        }
    }
    return -1;
}





function getGrandMA(){
    
    let deleteBtn = document.querySelectorAll('.fa-trash-alt');
    console.log(deleteBtn);
    for(let i = 0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener('click', function(e){
                grandMa = e.target.parentElement.parentElement.parentElement;
                console.log(grandMa);     
        })
    
    }
   
 
}



function updateLS(){
    let editBtn = document.querySelectorAll('.fa-edit');
    for(let i = 0; i < editBtn.length; i++){
        editBtn[i].addEventListener('click', function(e){
                grandMa = e.target.parentElement.parentElement.parentElement;
                console.log(grandMa);    
        })
    
    }

    if(grandMa){
        theText = grandMa.firstElementChild.innerText;
        const index = findWithAttr(editBtn,theText);
        listContentFromLS.splice(index,1,theText);
        localStorage.setItem('listContent', JSON.stringify(listContentFromLS));
    }
}


   
function updateLSAndDeleteItem(){
    let ul = document.querySelector('ul');
    console.log('dd')
    let deleteBtn = document.querySelectorAll('.fa-trash-alt');
    console.log(grandMa);
    if(grandMa){
        theText = grandMa.firstElementChild.innerText;
        const index = findWithAttr(deleteBtn,theText);
        console.log(index);
        listContentFromLS.splice(index,1);
        ul.removeChild(grandMa);
        showResult(); 
        localStorage.setItem('listContent', JSON.stringify(listContentFromLS));
    }
    grandMa = '';
 
}






function showResult(){
    result.style.visibility = 'visible';
    let amount = document.querySelectorAll('li');

    if(amount.length === 1){
        number.innerHTML = amount.length + ' thing ';
    } else if(amount.length > 1){
        number.innerHTML = amount.length + ' things ';
    } else {
        result.style.visibility = 'hidden';
    }

}








function initFromLS(){
  
    console.log(listContentFromLS);
    if(listContentFromLS.length !== 0){
        listContentFromLS.forEach((item,index) => {
            let newLi = document.createElement('li');
            newLi.innerHTML = `<div class="myValue">${item}</div>
            <div class="button-collection">
            <button type="button" class="edit btn" id="edit"><i class="fas fa-edit"></i></button>
            <button type="button" class="delete btn" id="delete" onclick="updateLSAndDeleteItem()"><i class="fas fa-trash-alt"></i></button>
            `
            list.appendChild(newLi);
        });
  
      
}
    updateLS();
    editItem();
    getGrandMA();
    showResult();

}
