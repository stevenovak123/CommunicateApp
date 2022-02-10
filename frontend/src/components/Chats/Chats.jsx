import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import { ChatLoader } from './ChatLoader'
export const Chats = () => {
	const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()

	const [loggedUser, setLoggedUser] = useState()
	const toast = useToast()

	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.get('api/chat', config)
			setChats(data)
		} catch (error) {
			toast({
				title: 'Error occured',
				description: 'failed to load chats',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			})
		}
	}
	const getSender = (loggedUser, users) => {
		return users[0]._id === loggedUser._id ? users[1].name : users[0].name
	}
	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
		fetchChats()
	}, [])

	return (
		<Box
			d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
			flexDir='column'
			alignItems='center'
			p={3}
			bg='white'
			w={{ base: '100%', md: '31%' }}
			borderRadius='lg'
			borderWidth='1px'>
			<Box
				pb={3}
				px={3}
				fontSize={{ base: '28px', md: '30px' }}
				fontFamily='Work sans'
				d='flex'
				w='100%'
				justifyContent='space-between'
				alignItems='center'>
				My Chats
				<Button
					d='flex'
					fontSize={{ base: '17px', md: '10px', lg: '17px' }}
					leftIcon={<AddIcon />}>
					New Group Chat
				</Button>
			</Box>
			<Box
				d='flex'
				flexDirection='column'
				p={3}
				bg='#f8f8f8'
				w='100%'
				h='100%'
				borderRadius='lg'
				overflow='hidden'>
				{chats ? (
					<Stack overflowY='scroll'>
						{chats.map((chat) => (
							<Box
								onClick={() => setSelectedChat(chat)}
								cursor='pointer'
								bg={selectedChat === chat ? '#38b2ac' : '#e8e8e8'}
								color={selectedChat === chat ? 'white' : 'black'}
								px={3}
								py={2}
								borderRadius='lg'
								key={chat._id}>
								<Text>
									{!chat.isGroupChat
										? getSender(loggedUser, chat.users)
										: chat.chatName}
								</Text>
							</Box>
						))}
					</Stack>
				) : (
					<ChatLoader />
				)}
			</Box>
		</Box>
	)
}
