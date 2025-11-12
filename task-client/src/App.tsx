import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TaskBoard from './pages/TaskBoard/TaskBoard';

function App() {
  return (
    <>
      <Routes>
        <Route element={ <Layout/> }>
          <Route path='/' element={ <TaskBoard/> } />
        </Route>
      </Routes>
    </>
  )
}

export default App;