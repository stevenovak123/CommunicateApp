import React, { useState } from 'react'
import { Chats } from '../components/Chats/Chats'
import { ChatBox } from '../components/Chats/ChatBox'
import { Header } from '../components/Header'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
export const Chatpage = () => {
	const { user } = ChatState()
	const [fetchAgain, setFetchAgain] = useState(false)
	return (
		<div style={{ width: '100%' }}>
			{user && <Header />}
			<Box d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
				{user && <Chats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			</Box>
		</div>
	)
}
