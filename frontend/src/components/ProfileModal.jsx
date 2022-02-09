import {
	Button,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import { ViewIcon } from '@chakra-ui/icons'
export const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton d={{ base: 'flex' }} onClick={onOpen} icon={<ViewIcon />} />
			)}

			<Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent h='410px'>
					<ModalHeader
						fontSize='40px'
						fontFamily='Work sans'
						d='flex'
						justifyContent='center'>
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						d='flex'
						justifyContent='space-between'
						alignItems='center'
						flexDirection='column'>
						<Image
							src={user.picture}
							alt={user.name}
							boxSize='150px'
							borderRadius='full'
						/>
						<Text
							fontSize={{ base: '28px', md: '30px' }}
							fontFamily='Work Sans'>
							Email: {user.email}
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
