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

  addKeyword(text) {
    KeywordsCollection.insert({
      text: text,
      createdAt: new Date()
    });
  },

  updateKeyword(id, text) {
    KeywordsCollection.update(id, { $set: { text: text } });
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

  addCategory(text) {
    CategoriesCollection.insert({
      text: text,
      createdAt: new Date()
    });
  },

  updateCategory(id, text) {
    CategoriesCollection.update(id, { $set: { text: text }});
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
