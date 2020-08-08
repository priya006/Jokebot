const SlackBot = require('slackbots');
const axios = require('axios');

//https://api.slack.com/apps/A018893PTT8/oauth?success=1  app name is new
const bot = new SlackBot({
  token: 'xoxb-404612894081-1310882225040-0n2GXOdsDmxW6PBTFksADWKH',
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
      
       text: "Webhook incoming message",
        "attachments": [
            {
                "mrkdwn_in": ["text"],
                "color": "#36a64f",
                "pretext": "Optional pre-text that appears above the attachment block",
                "author_name": "author_name",
                "author_link": "http://flickr.com/bobby/",
                "author_icon": "https://placeimg.com/16/16/people",
                "title": "title",
                "title_link": "https://api.slack.com/",
                "text": "Optional `text` that appears within the attachment",
                "fields": [
                    {
                        "title": "A field's title",
                        "value": "This field's value",
                        "short": false
                    },
                    {
                        "title": "A short field's title",
                        "value": "A short field's value",
                        "short": true
                    },
                    {
                        "title": "A second short field's title",
                        "value": "A second short field's value",
                        "short": true
                    }
                ],
                "thumb_url": "http://placekitten.com/g/200/200",
                "footer": "footer",
                "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
                "ts": 123456789
            }
        ]
    
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
