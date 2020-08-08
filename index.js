const SlackBot = require('slackbots');
const axios = require('axios');

//https://api.slack.com/apps/A018893PTT8/oauth?success=1  app name is new
const bot = new SlackBot({
  token: 'xoxb-404612894081-1310882225040-K7vWzxaJ8soBIvAT6asfgVmv',
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
      webHook();

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

    function webHook(){

    const options = {
      text: "This is posted by webhook url_created by priya from index.js",
    };

    //https://api.slack.com/apps/A018893PTT8/incoming-webhooks?success=1 Click Add new webhook to workspace
axios.post('https://hooks.slack.com/services/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', JSON.stringify(options))
      .then((response) => {
        console.log('SUCEEDED: sent slack webhook: \n', response.data);
        resolve(response.data);
      })

    .catch((error)  => {
      console.log('FAILED send slack webhook', error);
      PromiseRejectionEvent(new Error('FAILED: send slack webhook'));
  
    });
  }
