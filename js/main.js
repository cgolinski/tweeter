var tweets;

$(document).ready(function() {
  var textarea = $('#newTweetText');
  var form     = $('#newTweetForm');

  loadTweets();

  textarea.keydown(function() {
      var maxLength = 140;
      if (characterCount > maxLength) {
        //grey out click button


      }
    renderCharacterCount();
  });

  form.submit(function(event){
    event.preventDefault();
    
    fetch('/tweets', {
      method: 'POST',
      body: JSON.stringify({ text: textarea.val() })    
    }).then(loadTweets);
  });

});

function loadTweets() {
  fetch('/tweets.json').then(function(response) {
    response.json().then(function(json) {
      render(json.data);
    });
  });
};

function render(tweets) {
  var reverseTweets = tweets.slice().reverse();

  renderTweets(reverseTweets);
  renderCharacterCount();
};

function renderCharacterCount() {
  var textarea       = $('#newTweetText');
  var characterCount = $('#characterCount');
  
  characterCount.html(140-(textarea.val().length));
}

function renderTweets(tweets) {
  var timeline = $('#timeline');

  timeline.empty();

  for (var i = 0; i < tweets.length; i++) {
    timeline.append(
      '<div class="tweet">' +
        '<img class="avatar" src="images/avatar.jpg">' +
        '<p>' +
          tweets[i].text +
        '</p>' +
      '</div>'
    );
  }
}


