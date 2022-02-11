import React, { useEffect } from 'react'
import {
	Box,
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react'
import { Login } from '../components/Auth/Login'
import { Signup } from '../components/Auth/Signup'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../context/ChatProvider'

export const Homepage = () => {
	const history = useHistory()
	const { user } = ChatState()
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('userInfo'))
		if (user) {
			history.push('/chats')
		}
	}, [history])

	return (
		<Container maxW='xl' centerContent>
			<Box
				display='flex'
				justifyContent='center'
				p='3'
				bg={'white'}
				w='100%'
				m='40px 0 15px 0'
				borderRadius='lg'
				borderWidth='1px'>
				<Text fontSize='4xl'>Chat App</Text>
			</Box>
			<Box
				color='black'
				bg='white'
				w='100%'
				p={4}
				borderRadius='lg'
				borderWidth='1px'>
				<Tabs variant='soft-rounded' colorScheme='gray'>
					<TabList mb='1em'>
						<Tab width='50%'>Login</Tab>
						<Tab width='50%'>Sign-up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	)
}
