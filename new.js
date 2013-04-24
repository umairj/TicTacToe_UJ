TicTacToe = new function(){
	
	// private members
	var buttonSelector = '.square';
	var newGameBtnSelector = '#newGame';
	var playerNameSelector = '#playerName';
	var messageContainerSelector = '#infoMessage';
	var currentPlayer = 1;
	var maxMoves = 9;
	var currentMoves = 0;
	var playerOneSign = 'X';
	var playerTwoSign = 'O';
	
	var isGameActive = true;
	
	var boardState = {
		'TL':false,		'TC':false,		'TR':false,
		'CL':false,		'CC':false,		'CR':false,
		'BL':false,		'BC':false,		'BR':false }
	
	
	var statusMessages = {
		'incorrectMove':'This is an invalid move, the box is already occupied'
	}
	
	
	// private methods
	
	var Init = function() {
		
		InitializeClickHandlers();
		
	}
	
	/*
	 * InitializeClickHandlers - This function will
	 * initialize the click handlers necessary for the game.
	 * 
	 */
	var InitializeClickHandlers = function(){
		$(buttonSelector).click(function(){
			MakeMove($(this));
		});
		
		$(newGameBtnSelector).click(function(){
			ResetGame();
		})
	}
	
	/*
	 * MakeMove - This function is responsible when a player
	 * makes a move.
	 */
	var MakeMove = function($selectedBox) {
		
		
		// if game is over
		if( !isGameActive || currentMoves == maxMoves ) {
			return;
		}
		
		// if selectedBox is not a valid object
		if( !$selectedBox.length ) {
			return;
		}
		
		ClearMessage();
		
		var currentPosition = $selectedBox.attr('id').replace('field_', '');
		if( boardState[currentPosition] ) {
			ShowMessage( statusMessages.incorrectMove );
			return;
		}
		
		var characterToFill = GetCharacterForBox();		// get character depending on player
		$selectedBox.find('.ui-btn-text').html( characterToFill );
		UpdateBoardState( currentPosition, characterToFill );
		UpdatePlayer();
		currentMoves++;
	}
	
	/*
	 * GetCharacterForBox - This function will return X or 0 depending
	 * on the player
	 */
	var GetCharacterForBox = function() {
		return ( currentPlayer == 1 ) ? playerOneSign : playerTwoSign;
	}
	
	/*
	 * UpdateBoardState - This function will update the boardState object
	 */
	UpdateBoardState = function(position, character) {
		boardState[position] = character;
	}
	
	/*
	 * UpdatePlayer - This function will switch the player
	 */
	var UpdatePlayer = function() {
		currentPlayer = ( currentPlayer == 1 ) ? 2 : 1;
		var playerName = ( currentPlayer == 1 ) ? 'Player One' : 'Player Two';
		$(playerNameSelector).html(playerName);
	}
	
	/*
	 * ResetGame - This function resets the game
	 */
	var ResetGame = function() {
		currentPlayer = 1;
		currentMoves = 0;
		for( var key in boardState ) {
			boardState[key] = false;
		}
		$(buttonSelector).each(function(){
			$(this).find('.ui-btn-text').html( '&nbsp;' );
		});
		ClearMessage();
	}
	
	/*
	 * ShowMessage - Helper function to show a message
	 */
	var ShowMessage = function(message) {
		$(messageContainerSelector).html(message);
	}
	
	/*
	 * ClearMessage - This function clears the info messages
	 */
	var ClearMessage = function(){
		ShowMessage('');
	}
	
	
	// Calling the Init function.
	$(function(){
		Init();
	})
	
}();