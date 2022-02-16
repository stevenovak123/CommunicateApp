import React, { useEffect, useState } from 'react'
import {
	Box,
	FormControl,
	IconButton,
	Input,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { ProfileModal } from '../ProfileModal'
import { getSender, getSenderInfo } from '../config/ChatLogic'
import { UpdateGroupModal } from './UpdateGroupModal'
import axios from 'axios'
export const ChatWindow = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState()
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)
	const [newMessage, setnewMessage] = useState('')

	const toast = useToast()

	useEffect(() => {
		fetchMessages()
	}, [selectedChat])

	const fetchMessages = async () => {
		if (!selectedChat) {
			return
		}
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			setLoading(true)
			const { data } = await axios.get(
				`api/message/${selectedChat._id}`,
				config
			)
			setMessages(data)
			setLoading(false)
		} catch (error) {
			toast({
				title: 'Error Occured',
				description: 'Failed to load the messages',
				status: 'error',
				duration: 5000,
				isClosable: 'true',
				position: 'bottom',
			})
		}
	}

	const sendMessage = async (event) => {
		if (event.key === 'Enter' && newMessage) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				}

				const { data } = await axios.post(
					'api/message',
					{
						content: newMessage,
						chatId: selectedChat._id,
					},
					config
				)
				console.log(data)
				setnewMessage('')
				setMessages([...messages, data])
			} catch (error) {
				toast({
					title: 'Error Occured',
					description: 'Failed to send the message',
					status: 'error',
					duration: 5000,
					isCloseable: true,
					position: 'bottom',
				})
			}
		}
	}

	const typingHandler = (e) => {
		setnewMessage(e.target.value)
	}
	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: '28px', md: '30px' }}
						pb={3}
						px={2}
						w='100%'
						fontFamily='Work sans'
						d='flex'
						justifyContent={{ base: 'space-between' }}
						alignItems='center'
					>
						<IconButton
							d={{ base: 'flex', md: 'none' }}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat('')}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user, selectedChat.users)}
								<ProfileModal user={getSenderInfo(user, selectedChat.users)} />
							</>
						) : (
							<>
								{selectedChat.chatName.toUpperCase()}
								<UpdateGroupModal
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
								/>
							</>
						)}
					</Text>
					<Box
						d='flex'
						flexDir='column'
						justifyContent='flex-end'
						p={3}
						bg='#E8E8E8'
						w='100%'
						h='100%'
						borderRadius='lg'
						overflowY='hidden'
					>
						{loading ? (
							<Spinner
								size='xl'
								w={20}
								h={20}
								alignSelf='center'
								margin='auto'
							/>
						) : (
							<div>{/* All messages */}</div>
						)}
						<FormControl onKeyDown={sendMessage} isRequired mt={3}>
							<Input
								variant='filled'
								bg='#F8f8f8'
								placeholder='Enter a message'
								onChange={typingHandler}
								value={newMessage}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				<Box d='flex' alignItems='center' justifyContent='center' h='100%'>
					<Text fontSize='3xl' pb='3' fontFamily='Work Sans'>
						Select a user and start chatting
					</Text>
				</Box>
			)}
		</>
	)
}
