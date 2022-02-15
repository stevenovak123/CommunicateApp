import React from 'react'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { ProfileModal } from '../ProfileModal'
import { getSender, getSenderInfo } from '../config/ChatLogic'
import { UpdateGroupModal } from './UpdateGroupModal'
export const ChatWindow = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState()

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
						{/* Message */}
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
