const { Router, Route, IndexRoute, history } = ReactRouter;

const browserHistory = history.createHistory();

Routes = React.createClass({
   render() {
     return (
       <Router history={browserHistory}>
         <Route path="/" component={App}>
           <IndexRoute component={Dashboard}/>
           <Route path="phrases" component={Phrases}/>
           <Route path="keywords" component={Keywords}/>
           <Route path="keywords/:keywordId" component={AnswerTableContainer}/>
           <Route path="vocabulary" component={CategoryTableContainer}/>
           <Route path="vocabulary/:categoryName" component={WordTableContainer}/>
         </Route>
       </Router>
     );
   }
 });
