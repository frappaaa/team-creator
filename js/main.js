//Grabbing elements from the index file
const input = document.querySelector('input')
const button = document.querySelector('button')
const listMember = document.querySelector('.member-list')

//Creating Event listener on button to create a single member element everytime we click on it, if the input is valid and filled
button.addEventListener('click',(e)=>{
    e.preventDefault()
    if(input.value!=''){
        let singleMember = document.createElement('p')
        singleMember.className = 'member-single'
        singleMember.textContent = input.value
        listMember.appendChild(singleMember)
    }

})