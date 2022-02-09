import React, { useState } from 'react'
import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { AiFillBell } from 'react-icons/ai'
import { GoChevronDown, GoSearch } from 'react-icons/go'
import { ChatState } from '../context/ChatProvider'
import { ProfileModal } from './ProfileModal'
export const SideDrawer = () => {
	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [loading, setLoading] = useState(false)
	const [chatLoading, setChatLoading] = useState()

	const { user } = ChatState()
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
					<Button variant='ghost'>
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
							<MenuItem>Logout </MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>
		</>
	)
}
