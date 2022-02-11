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

export const GroupChatModal = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [groupChatname, setGroupChatName] = useState()
	const [selectedUsers, setSelectedUsers] = useState()
	const [search, setSearch] = useState([])
	const [searchResult, setSearchResult] = useState('')
	const toast = useToast()

	const handleSearch = () => {}
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
								mb={3}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
