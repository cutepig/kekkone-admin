Meteor.startup(() => {
  CategoriesCollection._ensureIndex({ name: 1 });
  WordsCollection._ensureIndex({ categoryId: 1 });
  AnswersCollection._ensureIndex({ keywordId: 1 });
});
