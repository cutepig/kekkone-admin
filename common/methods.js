Meteor.methods({
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
  },

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
  }
});
