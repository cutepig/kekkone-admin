Meteor.publish('phrases', () => {
  return PhrasesCollection.find();
});

Meteor.publish('keywords', () => {
  return KeywordsCollection.find();
});

Meteor.publish('keyword', (id) => {
  return KeywordsCollection.find({ _id: id });
});

Meteor.publish('answers', (keywordId) => {
  return AnswersCollection.find({ keywordId: keywordId });
});

Meteor.publish('categories', () => {
  return CategoriesCollection.find();
});

Meteor.publish('category', (name) => {
  return CategoriesCollection.find({ name: name });
});

Meteor.publish('words', (categoryId) => {
  return WordsCollection.find({ categoryId: categoryId });
});
