import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
	FormControl,
	Input,
	Box,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { ChatState } from '../../context/ChatProvider'
import { UserListItem } from '../User/UserListItem'
import { UserBadgeItem } from '../User/UserBadgeItem'

export const GroupChatModal = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [groupChatname, setGroupChatName] = useState()
	const [selectedUsers, setSelectedUsers] = useState([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState([])
	const [searchResult, setSearchResult] = useState([])

	const toast = useToast()
	const { user, chats, setChats } = ChatState()

	const handleGroup = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			toast({
				title: 'User already exists',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				postion: 'top',
			})
			return
		}

		setSelectedUsers([...selectedUsers, userToAdd])
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
	const handleSubmit = async () => {
		if (!groupChatname || !selectedUsers) {
			toast({
				title: 'Please fill all the fields',
				status: 'warning',
				duration: 5000,
				isCloseable: true,
				postion: 'top',
			})
			return
		}
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.post(
				'api/chat/group',
				{
					name: groupChatname,
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
				},
				config
			)
			setChats([data, ...chats])
			onclose()
			toast({
				title: 'Chat group has been created',
				status: 'success',
				duration: 5000,
				position: 'bottom',
				isClosable: 'true',
			})
		} catch (error) {
			toast({
				title: 'Failed to create Group',
				description: error.response.data,
				status: 'error',
				duration: 5000,
				position: 'bottom',
				isClosable: 'true',
			})
		}
	}

	const handleDelete = (delUser) => {
		setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id))
	}

	return (
		<>
			<span onClick={onOpen}>{children}</span>

			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='35px'
						fontFamily='Work Sans'
						d='flex'
						justifyContent='center'>
						Create Group Chat
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody d='flex' flexDir='column' alignItems='center'>
						<FormControl>
							<Input
								placeholder='Chat Name'
								mb={3}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<Input
								placeholder='Add Members'
								mb={1}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
						<Box w='100%' d='flex' flexWrap='wrap'>
							{selectedUsers.map((u) => (
								<UserBadgeItem
									key={user._id}
									user={u}
									handleFunction={() => handleDelete(u)}
								/>
							))}
						</Box>

						{loading ? (
							<div>Search Users to Chat</div>
						) : (
							searchResult?.slice(0, 4).map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => {
										handleGroup(user)
									}}
								/>
							))
						)}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' onClick={handleSubmit}>
							Create Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
