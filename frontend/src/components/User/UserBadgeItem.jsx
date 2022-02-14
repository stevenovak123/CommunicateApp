import { Box, CloseButton } from '@chakra-ui/react'
import React from 'react'

export const UserBadgeItem = ({ user, handleFunction }) => {
	return (
		<Box
			px={2}
			py={1}
			borderRadius='lg'
			m={1}
			mb={2}
			variant='solid'
			fontSize={10}
			backgroundColor='purple'
			cursor='pointer'
			color='white'
			onClick={handleFunction}>
			{user.name}
			<CloseButton pl='1' size='sm' />
		</Box>
	)
}
