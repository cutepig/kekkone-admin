Meteor.publish('categories', () => {
  return CategoriesCollection.find();
});

Meteor.publish('category', (id) => {
  return CategoriesCollection.find({ _id: id });
});

Meteor.publish('words', (categoryId) => {
  return WordsCollection.find({ categoryId: categoryId });
});

Meteor.publish('phrases', () => {
  return PhrasesCollection.find();
});
