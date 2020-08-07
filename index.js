const SlackBot = require('slackbots');
const axios = require('axios');

//https://api.slack.com/apps/A018893PTT8/oauth?success=1
const bot = new SlackBot({
  token: 'xoxb-404612894081-1310882225040-HN3FoBCv5jUHte9ua1iYeJ66',
  name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'general',
    'Get Ready To Laugh With @Jokebot!',
    params
  );
});

//Error Handler
bot.on('error', err => console.log(err))

//Message Handler

bot.on('message', data =>{

  if(data.type !== 'message'){
  return;
  }
  console.log(data);

  handleMessage(data.text);
})

  //respond to data
  function handleMessage(message){
    if(message.includes(' chucknorris')){
      chuckJoke();

    }

    }
    //
    function chuckJoke(){
      axios.get('http://api.icndb.com/jokes/random/')
      .then(res => {
     const joke =   res.data.value.joke;
     const params = {
      icon_emoji: ':laughing:'
    };
  
    bot.postMessageToChannel(
      'general',
      `Chuck Norries: ${joke}`,
      params
    );
      })
    }

  

  

