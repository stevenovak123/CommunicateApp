import React from 'react'
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

export const Homepage = () => {
	return (
		<Container maxW='xl' centerContent>
			<Box
				display='flex'
				justifyContent='center'
				p={3}
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
