import { ViewIcon } from '@chakra-ui/icons'
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

export const UpdateGroupModal = ({ fetchAgain, setFetchAgain }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil,
						ipsa! Fugit nesciunt iste magnam a consectetur eligendi. Quibusdam
						quos iure minima?
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
