const { Router, Route, IndexRoute, history } = ReactRouter;

const browserHistory = history.createHistory();

Routes = React.createClass({
   render() {
     return (
       <Router history={browserHistory}>
         <Route path="/" component={App}>
           <IndexRoute component={Dashboard}/>
           <Route path="vocabulary" component={Categories}/>
           <Route path="phrases" component={Phrases}/>
         </Route>
       </Router>
     );
   }
 });
