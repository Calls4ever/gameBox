
document.addEventListener('DOMContentLoaded', function(e){
    
    fetchGames()
    fetchUsers()
    document.addEventListener('change', eve=>{
        
        if(eve.target.id==='inlineFormCustomSelectPref'){
            document.querySelector('#all-games-container').innerHTML=''
            fetchUserGames(eve.target.querySelector(`.${eve.target.value}`).id)
            fetchUser(eve.target.querySelector(`.${eve.target.value}`).id)
        }
    })
    
    
    document.addEventListener('click', function(e){
        
        if (e.target.matches('.btn-primary')){
            e.preventDefault()
            button = e.target
            userId = document.querySelector('#user-profile').dataset.id 
            gameId = button.id
            addUserGame(userId, gameId)
        }
        else if (e.target.matches('#all-games')){
            container = document.querySelector('#all-games-container')
            container.innerHTML = ``
            fetchGames()    
        }
        else if (e.target.matches('#search')){
            e.preventDefault()
            button = e.target
            search = button.previousElementSibling.value
            gamesContainer = document.querySelector('.container')
            games = gamesContainer.getElementsByClassName('card')
            
            for (let i=0; i<games.length; i++){
                if (games[i].innerText.indexOf(search) > -1){
                    games[i].style.display = ''
                }else{
                    games[i].parentNode.style.display = 'none'
                }
            }
            button.parentNode.reset()
        }
        else if (e.target.matches('#my-collect')){
            userId = document.querySelector('#user-profile').dataset.id
            gamesContainer = document.querySelector('.container')
            gamesContainer.innerHTML = ``
            fetchUserGames(userId)
        }
        else if (e.target.matches('.display-4')){
            container = document.querySelector('#all-games-container')
            container.innerHTML = ``
            fetchGames()
        }
        else if (e.target.matches('.btn-danger')){
            button = e.target
            gameId = button.id
            removeUserGame(gameId)
        }
    })
    
})


function fetchGames(){
    fetch('http://localhost:3000/api/v1/games')
    .then(response => response.json())
    .then(games => {
        games.forEach(game => {
            renderAllGames(game)});
        })
    .catch((error) => {
        console.log(error); 
    })
}

function fetchUsers(){
    fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(users => renderAllUsers(users))
    .catch((error) => {
        console.log(error); 
    })
}

function fetchUserGames(userId){
    fetch('http://localhost:3000/api/v1/user_games')
    .then(response => response.json())
    .then(userGames => {
        userGames.forEach(userGame=>{
            
            if(userGame.user_id==userId){
                fetchGame(userGame.game_id, userGame)
            }
        })
    })
    .catch((error) => {
        console.log(error);
        
    })
}

const renderAllGames=game=>{
    const container=document.querySelector('#all-games-container')
    container.innerHTML +=`<div id='all-games-shadow' class="shadow p-3 mb-5 bg-white rounded">
    <div class="card" id='all-game-card' style="width: 18rem; ">
    <img src="${game.img_ur}" class="card-img-top" alt="${game.name} Poster">
    <div class="card-body">
      <h6 class="card-title" style='color: blue'>${game.name}</h6>
      <h7 class='card-text'>Available on: <p> ${game.platform}</p> </h7>
      <h7 class='card-text'>Genre: <p> ${game.genre}</p> </h7>
      <h6 class='card-text' id= "rating-game">Critics Rating: ${showRating(game.rating)}</h6>
      <br>
      <a id='${game.id}' class="btn btn-primary" style='color: white'>Play Now</a>
      
      <a href="${game.link}" class="btn btn-success float-right" style='color: white'><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
    </svg> Buy</a>
    </div>
  </div>
  </div` 
  
}


const showRating=rating=>{
    const rate=parseFloat(rating)
    
    if (rate>=4.5) {
        return `<b><span style="color:#4C9A2A">${rate} </span></b>`
    }
    else if(rate<4.5 && rate>=4){
        return `<b><span style="color: orange ">${rate} </span></b>`
    }
    else if(rate<4 && rate>3.5){
        return `<b><span style="color: 	#FF6347 ">${rate} </span></b>`
    }
    else if(rate<3.5 && rate>2){
        return `<b><span style="color: 		#FF0000 ">${rate} </span></b>`
    }
    else return `<b><span style="color: 		#800 ">${rate} </span></b>`

}

const fetchGame=(id, userGame)=>{
    fetch(`http://localhost:3000/api/v1/games/${id}`)
    .then(res=>res.json())
    .then(game=>{
        
        renderGame(game,userGame)
    })
}
const renderGame=(game, userGame)=>{
    
    const container=document.querySelector('#all-games-container')
    container.innerHTML +=`<div id="${userGame.id}" class="shadow p-3 mb-5 bg-white rounded">
    <div class="card" id='all-game-card' style="width: 18rem; ">
    <img src="${game.img_ur}" class="card-img-top" alt="${game.name} Poster">
    <div class="card-body">
      <h6 class="card-title" style='color: blue'>${game.name}</h6>
      <h7 class='card-text'>Available on: <p> ${game.platform}</p> </h7>
      <h7 class='card-text'>Genre: <p> ${game.genre}</p> </h7>
      <h6 class='card-text' id= "rating-game">Critics Rating: ${showRating(game.rating)}</h6>
      <br>
      <div id='rating'>
      <h7 class='card-text'>Rate this game </h7>
      <div class="rating">
      
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
      </div>
      </div>
      ${completeGame(game.playtime, userGame.time_played)}

      <div class="progress">
        <div class="progress-bar progress-bar-lg progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${userGame.time_played}" aria-valuemin="0" aria-valuemax="${parseInt(game.playtime)*60}" style="width: ${userGame.time_played/(parseInt(game.playtime)*60)*100}%"></div>
        <span class="progress-btn"><button class='btn btn-outline-success btn-sm' id='${userGame.id}'></button> </span></div>
        <br>
      <a id='${game.id}' class="btn btn-danger" style='color: white'>Remove Game</a>
      
      <a href="${game.link}" class="btn btn-success float-right" style='color: white'><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
    </svg> Buy</a>
    </div>
  </div>
  </div` 
    
}
function renderAllUsers(users){
    const select = document.querySelector('#inlineFormCustomSelectPref')
    users.forEach(user => {
    option = document.createElement('option')
    option.id=user.id
    option.className=user.name
    option.innerText = user.name
    option.dataset.id = user.id
    select.add(option)
    })
}

const fetchUser=id=>{
    fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(res=>res.json())
    .then(user=>{
        
        renderUserProfile(user)
    })
}
const renderUserProfile=user=>{
    profileDiv=document.querySelector('#user-profile')
    profileDiv.innerHTML=`<img id='profile-pic' src='${user.profile_pic}'>
                          <h2 class='display-4' id='profile-name'>${user.name}</h2>`
    profileDiv.dataset.id = user.id
}

const completeGame=(gTime, pTime)=>{
    if(parseInt(gTime)==pTime){
        return `<h7 class='card-text'style="color:green">100% Completed<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
      </svg></h7>`
    }
    else {
        return `${Math.round(pTime/(parseInt(gTime)*60)*100)}% completed`
    }
}
    


function addUserGame(userId, gameId){
    // gameSelector = document.getElementById(`${gameId}`)
    // game = gameSelector.parentNode.parentNode.parentNode
    // gameCardBody = game.querySelector('.card-body')
    fetch('http://localhost:3000/api/v1/user_games', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accepts': 'appplication/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "game_id": gameId,
            "completed": false,
            "time_played": 0
        })
    })
    .then(response => response.json())
        .then(userGame => {
            container = document.querySelector('#all-games-container')
            container.innerHTML = ``
            fetchUserGames(userId)
        })
}

function removeUserGame(gameId){
    gameSelector = document.getElementById(`${gameId}`)
    gameCard = gameSelector.parentNode.parentNode.parentNode
    userGameId = gameCard.id
    fetch(`http://localhost:3000/api/v1/user_games/${userGameId}`, {
        method: 'DELETE'
    })
    gameCard.remove()
}