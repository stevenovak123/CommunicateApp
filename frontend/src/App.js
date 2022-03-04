import './App.css'
import { Homepage } from './Pages/Homepage'
import { Route } from 'react-router-dom'
import { Chatpage } from './Pages/Chatpage'
import { ChakraProvider } from '@chakra-ui/react'
import { VideoCall } from './components/Video/VideoCall'

function App() {
	return (
		<ChakraProvider>
			<div className='App'>
				<Route path='/' component={Homepage} exact />
				<Route path='/chats' component={Chatpage} />
				<Route path='/video' component={VideoCall} />
			</div>
		</ChakraProvider>
	)
}

export default App
