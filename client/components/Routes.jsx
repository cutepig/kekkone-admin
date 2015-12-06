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
           <Route path="keywords/:keywordId" component={Answers}/>
           <Route path="vocabulary" component={Categories}/>
           <Route path="vocabulary/:categoryId" component={Words}/>
         </Route>
       </Router>
     );
   }
 });
