class Bot {
  constructor(slack) {
    this.slack = slack;
  }

  start() {
    this.slack.on('message', Meteor.bindEnvironment((message) => {
      if (message.text.match(/(kekkone|kekkos)/i)) {
        const channel = this.slack.getChannelGroupOrDMByID(message.channel);
        const response = this.getResponse(message.text);
        channel.send(response);
      }
    }));

    this.slack.on('error', (error) => {
      console.log(error);
    });

    this.slack.login();
  }

  getResponse(messageText) {
    let response = null;

    if (messageText.match(/\?/)) {
      response = this.getRandomAnswer(messageText);
    } else {
      response = this.getRandomPhrase();
    }
    return response;
  }

  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  getRandomPhrase() {
    const count = PhrasesCollection.find().count();
    if (count) {
      const phrase = PhrasesCollection.findOne({}, {
        skip: this.getRandomNumber(count)
      });
      return this.replaceWordGroups(phrase.text);
    }
    return 'Örf.';
  }

  getRandomAnswer(question) {
    const keywords = [];
    KeywordsCollection.find().forEach((keyword) => {
      if (question.match(new RegExp(keyword.word))) {
        keywords.push(keyword);
      }
    });
    if (keywords.length) {
      const keyword = keywords[this.getRandomNumber(keywords.length)];
      const count = AnswersCollection.find({ keywordId: keyword._id }).count();
      if (count) {
        const answer = AnswersCollection.findOne({ keywordId: keyword._id }, {
          skip: this.getRandomNumber(count)
        });
        return this.replaceWordGroups(answer.text);
      }
    }
    return this.getRandomPhrase();
  }

  getRandomWord(wordGroupName) {
    const wordGroup = CategoriesCollection.findOne({ name: wordGroupName });
    if (wordGroup) {
      const count = WordsCollection.find({ categoryId: wordGroup._id }).count();
      if (count) {
        const word = WordsCollection.findOne({ categoryId: wordGroup._id }, {
          skip: this.getRandomNumber(count)
        });
        return word.text;
      }
    }
    return `{${wordGroupName}}`;
  }

  replaceWordGroups(text) {
    const regex = /\{([\wåÅäÄöÖ]+)\}/g;

    return text.replace(regex, (placeholder, wordGroupName) => {
      return this.getRandomWord(wordGroupName);
    });
  }
}

Meteor.startup(() => {
  const authToken = process.env.SLACK_AUTH_TOKEN;
  const autoReconnect = true;
  const autoMark = true;

  const slack = new Slack(authToken, autoReconnect, autoMark);

  new Bot(slack).start();
});
