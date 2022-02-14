import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import { ChatWindow } from './ChatWindow'
export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const { selectedChat } = ChatState()

	return (
		<Box
			d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
			alignItems='center'
			flexDir='column'
			bg='white'
			w={{ base: '100%', md: '68%' }}
			borderRadius='lg'
			borderWidth='1px'
			p={3}
		>
			<ChatWindow fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</Box>
	)
}
