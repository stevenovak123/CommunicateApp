import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const Signup = () => {
	const [show, setShow] = useState(false)

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [confirmpassword, setConfirmpassword] = useState()
	const [password, setPassword] = useState()
	const [picture, setPicture] = useState()
	const [loading, setLoading] = useState(false)

	const history = useHistory()
	const toast = useToast()

	const handleClick = () => {
		setShow(!show)
	}

	const postDetails = (pics) => {
		setLoading(true)
		if (pics === undefined) {
			toast({
				title: 'Picture Select an Image',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			return
		}
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData()
			data.append('file', pics)
			data.append('upload_preset', 'Chat-app')
			data.append('cloud_name', 'dfwazyyzl')
			fetch('https://api.cloudinary.com/v1_1/dfwazyyzl/image/upload', {
				method: 'post',
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPicture(data.url.toString())
					setLoading(false)
				})
				.catch((err) => {
					console.log(err)
					setLoading(false)
				})
		} else {
			toast({
				title: 'Please Select an image',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			setLoading(false)
			return
		}
	}

	const submitHandler = async () => {
		setLoading(true)
		if (!name || !email || !password || !confirmpassword) {
			toast({
				title: 'Please fill all the fields',
				status: 'warning',
				duration: 5000,
				isClosable: true,
			})
		}
		if (password !== confirmpassword) {
			toast({
				title: 'Passwords do not match',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			return
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			}
			const { data } = await axios.post(
				'api/user',
				{
					name,
					email,
					password,
					picture,
				},
				config
			)
			toast({
				title: 'Registration Successful',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
			setLoading(false)
			history.push('/chats')
		} catch (error) {
			toast({
				title: 'Error',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			})
			setLoading(false)
		}
	}

	return (
		<VStack spacing='5px'>
			<FormControl id='first-name' isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder='Enter Your Name'
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
			<FormControl id='email' isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input
					type='email'
					placeholder='Enter Your Email Address'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id='Sign-password' isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size='md'>
					<Input
						type={show ? 'text' : 'password'}
						placeholder='Enter Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id='conf-password' isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup size='md'>
					<Input
						type={show ? 'text' : 'password'}
						placeholder='Confirm password'
						onChange={(e) => setConfirmpassword(e.target.value)}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id='pic'>
				<FormLabel>Upload your Picture</FormLabel>
				<Input
					type='file'
					p={1.5}
					accept='image/*'
					onChange={(e) => postDetails(e.target.files[0])}
				/>
			</FormControl>
			<Button
				colorScheme='blue'
				width='100%'
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={loading}>
				Sign Up
			</Button>
		</VStack>
	)
}
