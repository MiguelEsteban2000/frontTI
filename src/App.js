import {BrowserRouter as Router,Routes , Route } from 'react-router-dom'
import { About } from './components/about';
import { Contacts } from './components/contacts';
import { NavBar } from './components/navBar';
import {Books} from './components/book'
import {EnsayoC} from './components/ensayoC'


function App() {
  return (
    <Router>
      <NavBar/>
      <div className='container p-4'>
        <Routes >
          <Route exact path='/about' element={<About/>}/>
          <Route exact  path='/' element={<Contacts/>}/>
          <Route exact  path='/books' element={<Books/>}/>
          <Route exact  path='/ensayo' element={<EnsayoC/>}/>
        </Routes >
      </div>
    </Router>
  );
}

export default App;
