import { Switch, Route } from 'wouter'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Layout>
  )
}
