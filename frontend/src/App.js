import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Chatpage } from './Pages/Chatpage'
import { Homepage } from './Pages/Homepage'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Homepage />}></Route>
				<Route path='/chat' element={<Chatpage />}></Route>
			</Routes>
		</div>
	)
}

export default App
