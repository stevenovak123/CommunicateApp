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
	Text,
	useToast,
	FormControl,
	Input,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { ChatState } from '../../context/ChatProvider'

export const GroupChatModal = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [groupChatname, setGroupChatName] = useState()
	const [selectedUsers, setSelectedUsers] = useState()
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState([])
	const [searchResult, setSearchResult] = useState([])
	const toast = useToast()
	const { user, chats, setChats } = ChatState()
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
	const handleSubmit = () => {}
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
						{/* Selected Users */}
						{/* Render searched users */}
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
