import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
