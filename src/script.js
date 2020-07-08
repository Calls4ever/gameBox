
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
    
    
    // document.querySelector('#inlineFormCustomSelectPref').addEventListener("change", function(e){
    //     console.log(e.target);
        
    // })


    
    document.addEventListener('click', function(e){
        
        if (e.target.matches('.btn-primary')){
            e.preventDefault()
            button = e.target
            console.log(button);
            
            // button.parentNode.innerHTML = `
            //     <form>
            //         <p>You've played this game!</p>
            //         <label for="hours">Hours Played:</label>
            //         <input type="number" id="hours" name="hours">
            //         <button class="update">Update</button><br>
            //         <button class="completed">Completed</button>
            //     </form>    
            // `
        }
        else if (e.target.matches('.completed')){
            e.preventDefault()
            button = e.target
            button.parentNode.innerHTML = `
                <form>
                    <label for="hours">Hours Played:</label>
                    <input type="number" id="hours" name="hours">
                    <button class="update">Update</button><br>
                    <h4>You've completed this game!</h4>
                </form>    
            `
        }
        else if (e.target.matches('.update')){
            e.preventDefault()
            button = e.target
            game = button.parentNode
            updateHours(game)
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
                console.log(userGame)
            
                fetchGame(userGame.game_id)
            }
        }
        )
    })
    .catch((error) => {
        console.log(error);
        
    })
}

const renderAllGames=game=>{
    // console.log(game)
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

const fetchGame=id=>{
    console.log(id)
    fetch(`http://localhost:3000/api/v1/games/${id}`)
    .then(res=>res.json())
    .then(game=>{
        
        renderGame(game)
    })
}
const renderGame=game=>{
    
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
function renderAllUsers(users){
    const select = document.querySelector('#inlineFormCustomSelectPref')
    users.forEach(user => {
    option = document.createElement('option')
    option.id=user.id
    option.className=user.name
    option.innerText = user.name
    option.dataset.id = user.id
    console.log('option.dataset.id', option.dataset.id)
    console.log(user)
    select.add(option)
    })
}

const fetchUser=id=>{
    console.log(id)
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
}