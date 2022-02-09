import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './context/ChatProvider'
ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<Router>
				<ChatProvider>
					<App />
				</ChatProvider>
			</Router>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
