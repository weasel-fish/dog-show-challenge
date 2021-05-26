let dogID

//Initial Populate ***********

function dogPopulate() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(renderDogs)
}

function renderDogs(dogArray) {
    dogArray.forEach(addDogToTable)
}

function addDogToTable(dogObj) {
    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdBreed = document.createElement('td')
    let tdSex = document.createElement('td')
    let tdButton = document.createElement('td')
    let button = document.createElement('button')

    tdName.textContent = dogObj.name
    tdName.name = 'name'
    tdBreed.textContent = dogObj.breed
    tdSex.textContent = dogObj.sex
    button.textContent = 'Edit Dog'
    button.id = dogObj.id
    button.addEventListener('click', pupulateFields)

    tdButton.append(button)
    tr.append(tdName, tdBreed, tdSex, tdButton)
    document.querySelector('#table-body').append(tr)
}

//Editing Dogs ****************

function pupulateFields(e) {
    let name = e.target.parentNode.parentNode.childNodes[0].textContent
    let breed = e.target.parentNode.parentNode.childNodes[1].textContent
    let sex = e.target.parentNode.parentNode.childNodes[2].textContent

    let inputList = document.querySelectorAll('#dog-form input')
    inputList[0].value = name
    inputList[1].value = breed
    inputList[2].value = sex

    console.log(e.target.id)
    dogID = e.target.id
}

function addEditEvent() {
    document.querySelector('#dog-form').addEventListener('submit', submitEditedDog)
}

function submitEditedDog(e) {
    e.preventDefault()

    let newName = e.target.childNodes[1].value
    let newBreed = e.target.childNodes[3].value
    let newSex = e.target.childNodes[5].value

    fetch(`http://localhost:3000/dogs/${dogID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
          },
        body: JSON.stringify({name: newName, breed: newBreed, sex: newSex})
    })
    .then(resp => resp.json())
    .then(() => {
        document.querySelector('#table-body').innerHTML = ''
        dogPopulate()
    })
}



function init() {
    dogPopulate()
    addEditEvent()
}

document.addEventListener('DOMContentLoaded', () => {
    init()
})