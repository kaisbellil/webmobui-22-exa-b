import { getUsers } from '../api'

const homeSection = document.querySelector('#home-section')
const userList = homeSection.querySelector('.user-list')


function renderHome (user) {
    const newUser = userList.content.cloneNode(true) 

    newUser.querySelector('a').href = '#user-' + user.id
    newUser.querySelector('a').innerText = user.name

    userList.append(newUser)
}

function renderHomes(users) {
    userList.replaceChildren()
    if(users.length) {
        // On itère sur chaque élément
        for(const user of users) {
          renderHome(user)
        }}
      
}

async function renderHomesSection () {
    const users = await getUsers()
    
    renderHomes(users)
  }

  export {renderHomesSection }