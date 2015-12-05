const { Router, Route, IndexRoute, history } = ReactRouter;

const browserHistory = history.createHistory();

Routes = React.createClass({
   render() {
     return (
       <Router history={browserHistory}>
         <Route path="/" component={App}>
           <IndexRoute component={Dashboard}/>
           <Route path="vocabulary" component={Categories}/>
           <Route path="vocabulary/:categoryId" component={Words}/>
           <Route path="phrases" component={Phrases}/>
           <Route path="words" component={Categories}/>
         </Route>
       </Router>
     );
   }
 });
