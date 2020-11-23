import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout.js';
import LiveFeed from './Components/LiveFeed/LiveFeed';
import History from './Components/History/History';
import Settings from './Components/Settings/Settings';

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home}/>
      <Route exact path="/live" component={LiveFeed}/>
      <Route exact path="/history" component={History}/>
      <Route exact path="/settings" component={Settings}/>
    </Layout>
  );
}

export default App;
