import { ViewIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	FormControl,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { UserBadgeItem } from '../User/UserBadgeItem'
import { UserListItem } from '../User/UserListItem'

export const UpdateGroupModal = ({ fetchAgain, setFetchAgain }) => {
	const [groupChatName, setGroupChatName] = useState()
	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [loading, setLoading] = useState(false)
	const [renameLoading, setRenameLoading] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const { selectedChat, setSelectedChat, user } = ChatState()
	const toast = useToast()

	const handleRename = async () => {
		if (!groupChatName) {
			return
		}
		try {
			setRenameLoading(true)
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.put(
				'api/chat/rename',
				{
					chatId: selectedChat._id,
					chatName: groupChatName,
				},
				config
			)
			setSelectedChat(data)
			setFetchAgain(!fetchAgain)
			setRenameLoading(false)
		} catch (error) {
			toast({
				title: 'Error Occured',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			setRenameLoading(false)
		}
		setGroupChatName('')
	}

	const handleSearch = async (query) => {
		setSearch(query)
		if (!query) {
			return
		}
		try {
			setLoading(true)
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.get(`api/user?search=${search}`, config)
			setLoading(false)
			setSearchResult(data)
		} catch (error) {
			toast({
				title: 'Error occurred',
				description: 'Failed to load the search results',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			})
		}
	}

	const handleRemove = async (removedUser) => {
		if (
			selectedChat.groupAdmin._id !== user._id &&
			removedUser._id !== user._id
		) {
			toast({
				title: 'Only admins can remove users from the group ',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			return
		}
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.put(
				`api/chat/groupremove`,
				{
					chatId: selectedChat._id,
					userId: removedUser._id,
				},
				config
			)
			removedUser._id === user.id ? setSelectedChat() : setSelectedChat(data)
			setFetchAgain(!fetchAgain)
			setLoading(false)
		} catch (error) {}
	}

	const handleAddUser = async (addedUser) => {
		if (selectedChat.users.find((u) => u._id === addedUser._id)) {
			toast({
				title: 'User is already in the group',
				status: 'error',
				duration: 5000,
				isCloseable: true,
				position: 'bottom',
			})
			return
		}
		if (selectedChat.groupAdmin._id !== user._id) {
			toast({
				title: 'Only admins can do this',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			return
		}
		try {
			setLoading(true)
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.put(
				'api/chat/groupadd',
				{
					chatId: selectedChat._id,
					userId: addedUser._id,
				},
				config
			)
			setSelectedChat(data)
			setFetchAgain(!fetchAgain)
			setLoading(false)
		} catch (error) {
			toast({
				title: 'Error Occured!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			setLoading(false)
		}
		setGroupChatName('')
	}

	return (
		<>
			<IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='35px'
						fontFamily='Work Sans'
						d='flex'
						justifyContent='center'
					>
						{selectedChat.chatName}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box w='100%' d='flex' flexWrap='wrap' pb={3}>
							{selectedChat.users.map((u) => (
								<UserBadgeItem
									key={user._id}
									user={u}
									handleFunction={() => handleRemove(u)}
								/>
							))}
						</Box>
						<FormControl d='flex'>
							<Input
								placeholder='Chat Name'
								mb={3}
								value={groupChatName}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
							<Button
								variant='solid'
								colorScheme='teal'
								ml={1}
								isLoading={renameLoading}
								onClick={handleRename}
							>
								Update
							</Button>
						</FormControl>
						<FormControl>
							<Input
								placeholder='Add user to group'
								mb={1}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
						{loading ? (
							<Spinner size='lg' />
						) : (
							searchResult?.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => handleAddUser(user)}
								/>
							))
						)}
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => handleRemove(user)} colorScheme='red'>
							Exit Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
