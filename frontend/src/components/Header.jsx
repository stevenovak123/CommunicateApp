import React, { useState } from 'react'
import {
	Avatar,
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { AiFillBell } from 'react-icons/ai'
import { GoChevronDown, GoSearch } from 'react-icons/go'
import { ChatState } from '../context/ChatProvider'
import { ProfileModal } from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ChatLoader } from '../components/Chats/ChatLoader'
import { UserListItem } from './User/UserListItem'

export const Header = () => {
	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [loading, setLoading] = useState(false)
	const [chatLoading, setChatLoading] = useState()

	const { user, setSelectedChat, chats, setChats, selcetedChat } = ChatState()

	const { isOpen, onClose, onOpen } = useDisclosure()
	const navigate = useNavigate()
	const Toast = useToast()

	const handleLogout = () => {
		localStorage.removeItem('userInfo')
		navigate('/')
	}

	const handleSearch = async () => {
		if (!search) {
			Toast({
				title: 'Please enter something in search',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-left',
			})
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
			Toast({
				title: 'Error Occurred',
				description: 'Failed to load the result',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-left',
			})
		}
	}

	const accessChat = async (userId) => {
		try {
			setChatLoading(true)
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { chatData } = await axios.post('api/chat', { userId }, config)

			setSelectedChat(data)
			setChatLoading(false)
		} catch (error) {
			Toast({
				title: 'Error Occurred',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top-left',
			})
		}
	}

	return (
		<>
			<Box
				d='flex'
				justifyContent='space-between'
				alignItems='center'
				bg='white'
				w='100%'
				p='5px 10px 5px 10px'
				borderWidth='5px'>
				<Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
					<Button variant='ghost' onClick={onOpen}>
						<GoSearch />
						<Text
							d={{
								base: 'none',
								md: 'flex',
							}}
							px='4'>
							Search User
						</Text>
					</Button>
				</Tooltip>
				<Text fontSize='2xl' fontFamily='Work sans'>
					Chat App
				</Text>
				<div>
					<Menu>
						<MenuButton p={1}>
							<AiFillBell />
						</MenuButton>
						{/* <MenuList/> */}
					</Menu>
					<Menu>
						<MenuButton as={Button} rightIcon={<GoChevronDown />}>
							<Avatar
								size='sm'
								cursor='pointer'
								name={user.name}
								src={user.picture}
							/>
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuDivider />
							<MenuItem onClick={handleLogout}>Logout </MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>
			<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='5px'>Search Users</DrawerHeader>
					<DrawerBody>
						<Box d='flex' pb={2}>
							<Input
								placeholder='Search By name or email'
								mr='2'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button onClick={handleSearch}>Go</Button>
						</Box>
						{loading ? (
							<ChatLoader />
						) : (
							searchResult?.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								/>
							))
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}
