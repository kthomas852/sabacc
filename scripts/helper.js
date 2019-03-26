//Helper functions for random tasks

module.exports={
//Helper array that shuffles sabacc deck
shuffle: function (array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

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

},

//Helper function that creates and then runs shuffle on sabacc deck
sabaccDeck: function(){
    let deck =[]
    for(let i=0; i<3; i++){
        for(let n=1; n<=12; n++){
            deck.push(n);
            deck.push(n*(-1));
        }
    }
    deck.push(0);
    deck.push(0);

    return this.shuffle(deck);
}
}