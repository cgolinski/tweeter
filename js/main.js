var tweets = getTweets();

$(document).ready(function(){
  var button = $('#submitTweet');
  var textarea = $('#newTweetText');

  button.click(function(){
    var newTweet = {
      text: textarea.val()
    };

    tweets.push(newTweet);

    saveTweets(tweets);

    var reverseTweets = tweets.slice().reverse();

    renderTweets(reverseTweets);
  });
});

function renderTweets(tweets) {
  var timeline = $('#timeline');

  timeline.empty();

  for (var i = 0; i < tweets.length; i++) {
    timeline.append(
      '<div class="tweet">' +
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
