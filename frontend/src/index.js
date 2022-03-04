import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
import ChatProvider from './context/ChatProvider'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context/VideoSocketContext'
ReactDOM.render(
	<BrowserRouter>
		<ContextProvider>
			<ChatProvider>
				<App />
			</ChatProvider>
		</ContextProvider>
	</BrowserRouter>,

	document.getElementById('root')
)
