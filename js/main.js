//Grabbing elements from the index file
const input = document.querySelector('input')
const button = document.querySelector('button')
const listMember = document.querySelector('.member-list')
const random = document.createElement('button')
random.textContent = 'Random'
document.body.appendChild(random)
let randomList = document.createElement('div')
document.body.appendChild(randomList)
let members = []

//Creating Event listener on button to create a single member element everytime we click on it, if the input is valid and filled
button.addEventListener('click', addMember)
//Creating Event listener for the enter key
input.addEventListener('keypress', (e)=>{
    if(e.key==='Enter') addMember()
})

function addMember(){
    if(input.value!=''){
        let singleMember = document.createElement('p')
        singleMember.className = 'member-single'
        singleMember.textContent = input.value
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<img src="https://s.svgbox.net/hero-outline.svg?ic=trash&fill=000">'
        deleteButton.className = 'delete'
        const editButton = document.createElement('button')
        editButton.innerHTML = '<img src="https://s.svgbox.net/hero-outline.svg?ic=pencil-alt&fill=000">'
        editButton.className = 'edit'
        singleMember.appendChild(deleteButton)
        singleMember.appendChild(editButton)
        members.push(input.value)
        console.log(members)
        listMember.appendChild(singleMember)
        input.value = ''
    }
}


//Creating event listener for random button to print the values 
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

random.addEventListener('click', (e)=>{
    e.preventDefault()
    randomList.textContent=''
    let membersShuffled = shuffle(members)
    membersShuffled.forEach((member)=>{
        let shuffledMember = document.createElement('p')
        shuffledMember.textContent = member
        randomList.appendChild(shuffledMember)
    })
})