var tweets = getTweets();

$(document).ready(function() {
  var button = $('#submitTweet');
  var textarea = $('#newTweetText');
  var form = $('#newTweetForm');

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
    });
  });

  button.click(function() {
    var newTweet = {
      text: textarea.val()
    };

    tweets.push(newTweet);
    saveTweets(tweets);
    render();
  });

  render();
});

function render() {
  var reverseTweets = tweets.slice().reverse();

  renderTweets(reverseTweets);
  renderCharacterCount();
};

function renderCharacterCount() {
  var textarea = $('#newTweetText');
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

function saveTweets(tweets) {
  var jsonTweets = JSON.stringify(tweets);
  localStorage.setItem('tweets', jsonTweets);
}

function getTweets() {
  var jsonTweets = localStorage.getItem('tweets');

  if (jsonTweets === null) {
    return [];
  } else {
    return JSON.parse(jsonTweets);
  }
}
