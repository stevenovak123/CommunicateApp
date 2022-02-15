import { Box, CloseButton, Text } from '@chakra-ui/react'
import React from 'react'

export const UserBadgeItem = ({ user, handleFunction }) => {
	return (
		<Box
			px={2}
			py={1}
			borderRadius='lg'
			m={1}
			mb={1}
			variant='solid'
			fontSize={14}
			backgroundColor='purple'
			cursor='pointer'
			color='white'
			onClick={handleFunction}
			d='flex'
		>
			<Text>{user.name}</Text>
			<CloseButton size='sm' pl={1} />
		</Box>
	)
}
