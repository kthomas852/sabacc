# Sabacc
### The intergalactic gambling game

* Accepts 2-6 players at a table
* Tracks life time credits of a player
* Requires users to login to play
* Fun Fun Fun

## Rules of the Game
* Goal: Beat the other players with one of the following and win the pot
    - Idiots Array: [0,2,3] or [0,-2,-3] or combination of - & +
    - Pure Sabacc: 23
    - Sabacc: -23
    - Hands closest to 23 or -23 without going over
Players all draw three cards to begin.  Each round has an open bet phase where the player can either raise or draws a card and then call to end their turn. After three rounds all players will have six cards and will select their `best combination`. This is done by clicking on the cards they want and show their hand (Hit the `Call` button one final time).  

## DataBase Models
## ~ User
* name
* password
* email
* credits
* Xp

## ~ Table
* players []
* pot
* sabacc_pot
* current_max_bet

## ~ Top 5 Players
* first
* second
* third
* forth
* fifth



### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

