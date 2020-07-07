document.addEventListener('DOMContentLoaded', function(e){

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
    .then(games => renderGames(games))
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

function renderGames(games){
    const gameList = document.querySelector('.game-list')
    console.log(games);
    games.forEach(game => {
        id = game.id
        
        name = game.name

        rating = parseFloat(game.rating)

        genre = game.genre

        platform = game.platform

        imgUrl = game.img_ur

        link = game.link
        
        gameDiv = document.createElement('div')
        gameDiv.innerHTML = `
                <image src='${imgUrl}' style="width:150px;height:100px;"></image>
                <p>${name}</p>
                <p>Critics Rating: ${rating}</p>
                <p>Genre: ${genre}</p>
                <p>Platform: ${platform}</p>
                <a href="${link}">Buy this Game</a>
                
                <form>
                    <button class="played">Played?</button><br>
                    <label for="hours">Hours Played:</label>
                    <input type="number" id="hours" name="hours">
                    <button class="update">Update</button><br>
                    <button class="completed">Completed</button>
                </form>
        `
        gameDiv.id = id
        gameList.append(gameDiv)
    })
}

fetchGames()
fetchUsers()
fetchUserGames()
renderGames()

