import LiveFeed from './Components/LiveFeed/LiveFeed';
import { Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout.js';
import History from './Components/History/History';
import Settings from './Components/Settings/Settings';

function App() {
  return (
    <Layout>
      <Route path="/live" component={LiveFeed}/>
      <Route path="/history" component={History}/>
      <Route path="/settings" component={Settings}/>
    </Layout>
  );
}

export default App;
