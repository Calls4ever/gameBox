document.addEventListener('DOMContentLoaded', function(e){
    fetchGames()
    fetchUsers()
    fetchUserGames()
    
    document.addEventListener('click', function(e){
        
        if (e.target.matches('.played')){
            e.preventDefault()
            button = e.target
            button.parentNode.innerHTML = `
                <form>
                    <p>You've played this game!</p>
                    <label for="hours">Hours Played:</label>
                    <input type="number" id="hours" name="hours">
                    <button class="update">Update</button><br>
                    <button class="completed">Completed</button>
                </form>    
            `
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
    })
    
})


function fetchGames(){
    fetch('http://localhost:3000/api/v1/games')
    .then(response => response.json())
    .then(games => {
        games.forEach(game => {
            renderAllGames(game)
        });
        })
    .catch((error) => {
        console.log(error); 
    })
}

function fetchUsers(){
    fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(users => console.log(users))
    .catch((error) => {
        console.log(error); 
    })
}

function fetchUserGames(){
    fetch('http://localhost:3000/api/v1/user_games')
    .then(response => response.json())
    .then(userGames => console.log(userGames))
    .catch((error) => {
        console.log(error);
        
    })
}

const renderAllGames=game=>{
    console.log(game)
    const container=document.querySelector('#all-games-container')
    container.innerHTML +=`<div id='all-games-shadow' class="shadow p-3 mb-5 bg-white rounded">
    <div class="card" id='all-game-card' style="width: 19rem; ">
    <img src="${game.img_ur}" class="card-img-top" alt="${game.name} Poster">
    <div class="card-body">
      <h5 class="card-title">${game.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Play Game</a>
    </div>
  </div>
  </div` 
}



