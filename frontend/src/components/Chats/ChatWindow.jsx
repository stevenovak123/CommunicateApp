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
import './styles.css'
import { ChatState } from '../../context/ChatProvider'
import { ArrowBackIcon, PhoneIcon } from '@chakra-ui/icons'
import { ProfileModal } from '../ProfileModal'
import { getSender, getSenderInfo } from '../config/ChatLogic'
import { UpdateGroupModal } from './UpdateGroupModal'
import axios from 'axios'
import { ScrollableChat } from './ScrollableChat'
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from '../../animation/typing.json'
import { Link } from 'react-router-dom'

const ENDPOINT = 'http://localhost:5000'
let socket, selectedChatCompare

export const ChatWindow = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat, notification, setNotification } =
		ChatState()
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)
	const [socketConnected, setSocketConnected] = useState(false)
	const [typing, setTyping] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [newMessage, setnewMessage] = useState('')

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	const toast = useToast()
	useEffect(() => {
		fetchMessages()
		selectedChatCompare = selectedChat
	}, [selectedChat])

	useEffect(() => {
		socket = io(ENDPOINT)
		socket.emit('setup', user)
		socket.on('connection', () => setSocketConnected(true))
		socket.on('typing', () => setIsTyping(true))
		socket.on('typing stopped', () => setIsTyping(false))
	}, [])
	useEffect(() => {
		socket.on('message recieved', (newMessageRecieved) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare._id !== newMessageRecieved.chat._id
			) {
				if (!notification.includes(newMessageRecieved)) {
					setNotification([newMessageRecieved, ...notification])
					setFetchAgain(!fetchAgain)
				}
			} else {
				setMessages([...messages, newMessageRecieved])
			}
		})
	})

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
			socket.emit('join chat', selectedChat._id)
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
			socket.emit('typing stopped', selectedChat._id)
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
				}
				setnewMessage('')
				const { data } = await axios.post(
					'api/message',
					{
						content: newMessage,
						chatId: selectedChat._id,
					},
					config
				)
				socket.emit('new message', data)
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
		if (socketConnected) return
		if (!typing) {
			setTyping(true)
			socket.emit('typing', selectedChat._id)
		}
		// timeout to decide if not typing
		let lastTypeTime = new Date().getTime()
		let timerLength = 3000
		setTimeout(() => {
			let timeNow = new Date().getTime()
			let timeDifference = timeNow - lastTypeTime
			if (timeDifference >= timerLength && typing) {
				socket.emit('typing stopped', selectedChat._id)
				setTyping(false)
			}
		}, timerLength)
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
						<a href='/video' target='_blank'>
							<IconButton icon={<PhoneIcon />} />
						</a>
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
									fetchMessages={fetchMessages}
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
							<div className='messages'>
								<ScrollableChat messages={messages} />
							</div>
						)}
						<FormControl onKeyDown={sendMessage} isRequired mt={3}>
							{isTyping ? (
								<div>
									<Lottie
										options={defaultOptions}
										width={70}
										style={{ marginBottom: 15, marginLeft: 0 }}
									/>
								</div>
							) : (
								<></>
							)}

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
