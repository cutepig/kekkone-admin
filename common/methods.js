Meteor.methods({
  addPhrase(text) {
    PhrasesCollection.insert({
      text: text,
      createdAt: new Date()
    });
  },

  updatePhrase(id, text) {
    PhrasesCollection.update(id, { $set: { text: text } });
  },

  removePhrase(id) {
    PhrasesCollection.remove(id);
  },

  addKeyword(word) {
    KeywordsCollection.insert({
      word: word,
      createdAt: new Date()
    });
  },

  updateKeyword(id, word) {
    KeywordsCollection.update(id, { $set: { word: word } });
  },

  removeKeyword(id) {
    KeywordsCollection.remove(id);
  },

  addAnswer(keywordId, text) {
    AnswersCollection.insert({
      text: text,
      keywordId: keywordId,
      createdAt: new Date()
    });
  },

  updateAnswer(id, text) {
    AnswersCollection.update(id, { $set: { text: text } });
  },

  removeAnswer(id) {
    AnswersCollection.remove(id);
  },

  addCategory(name) {
    CategoriesCollection.insert({
      name: name,
      createdAt: new Date()
    });
  },

  updateCategory(id, name) {
    CategoriesCollection.update(id, { $set: { name: name }});
  },

  removeCategory(id) {
    CategoriesCollection.remove(id);
    WordsCollection.remove({ categoryId: id });
  },

  addWord(categoryId, text) {
    WordsCollection.insert({
      text: text,
      categoryId: categoryId,
      createdAt: new Date()
    });
  },

  updateWord(id, text) {
    WordsCollection.update(id, { $set: { text: text } });
  },

  removeWord(id) {
    WordsCollection.remove(id);
  }
});
