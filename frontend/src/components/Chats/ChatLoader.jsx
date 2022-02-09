import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

export const ChatLoader = () => {
	return (
		<Stack>
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
			<Skeleton height='45px' />
		</Stack>
	)
}
