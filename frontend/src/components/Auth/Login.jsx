import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
	VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../context/ChatProvider'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const { setUser } = ChatState()
	const toast = useToast()
	const history = useHistory()
	const guestUser = () => {
		setEmail('guest@example.com')
		setPassword('123456')
	}
	const handleShow = () => {
		setShow(!show)
	}
	const submitHandler = async () => {
		setLoading(true)
		if (!email || !password) {
			toast({
				title: 'Please fill all the details',
				status: 'warning',
				duration: 5000,
				isCloseable: true,
				postion: 'bottom',
			})
			setLoading(false)
			return
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			}
			const { data } = await axios.post(
				'/api/user/login',
				{ email, password },
				config
			)

			toast({
				title: 'Login Successful',
				status: 'success',
				duration: 5000,
				isCloseable: true,
				position: 'bottom',
			})
			localStorage.setItem('userInfo', JSON.stringify(data))
			setLoading(false)
			setUser(data)
			history.push('/chats')
		} catch (error) {
			toast({
				title: 'Error',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isCloseable: true,
				position: 'bottom',
			})
		}
	}
	return (
		<VStack spacing='5px' color='black'>
			<FormControl id='Login-email' isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder='Enter Your Email'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id='Login-password' isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder='Enter Your Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleShow}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				isLoading={loading}
				onClick={submitHandler}>
				Login
			</Button>
			<Button
				variant='solid'
				colorScheme='red'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={guestUser}>
				Login as Guest
			</Button>
		</VStack>
	)
}
