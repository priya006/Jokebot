# Jokebot Tells you a Random joke :) 
The Bot Tells a random Joke In General Channel /Slack

# Pre-Requisites

Run the script by typing the command `npm start` from your terminal

From Slack/ General channel
Type `@jokebot chucknorris` you get a random joke

Use the idea and integrate with any API

# Webhook incoming message from external app to Slack [WIP]
Syntax:

`curl -X POST -H 'Content-type: application/json' --data '{"text":"Allow me to reintroduce myself!"}' YOUR_WEBHOOK_URL
`

```
curl -X POST --data-urlencode 'payload={"channel": "#general", "username": "priyanandh06", "text": "This is posted by webhook url_created by priya", "icon_emoji": ":ghost:"}' https://hooks.slack.com/services/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
```

# Slash command - Ideation phase

1. https://[yourTeam].slack.com/apps/build/custom-integration
