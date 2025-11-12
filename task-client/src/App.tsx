import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TaskList from './pages/TaskList/TaskList';

function App() {
  return (
    <>
      <Routes>
        <Route element={ <Layout/> }>
          <Route path='/' element={ <TaskList/> } />
        </Route>
      </Routes>
    </>
  )
}

export default App;