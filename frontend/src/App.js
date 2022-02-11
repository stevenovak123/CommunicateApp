import './App.css'
import { Homepage } from './Pages/Homepage'
import { Route } from 'react-router-dom'
import { Chatpage } from './Pages/Chatpage'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
	return (
		<ChakraProvider>
			<div className='App'>
				<Route path='/' component={Homepage} exact />
				<Route path='/chats' component={Chatpage} />
			</div>
		</ChakraProvider>
	)
}

export default App
