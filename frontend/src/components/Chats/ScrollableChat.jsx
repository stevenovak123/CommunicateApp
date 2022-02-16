import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../context/ChatProvider'
import {
	isLastMessage,
	isSameSender,
	isSameSenderStyle,
	isSameUser,
} from '../config/ChatLogic'
export const ScrollableChat = ({ messages }) => {
	const { user } = ChatState()
	return (
		<ScrollableFeed>
			{messages &&
				messages.map((m, i) => (
					<div style={{ display: 'flex' }} key={m._id}>
						{(isSameSender(messages, m, i, user._id) ||
							isLastMessage(messages, i, user._id)) && (
							<Tooltip label={m.sender.name} hasArrow placement='bottom-start'>
								<Avatar
									mt='7px'
									mr={1}
									cursor='pointer'
									size='sm'
									name={m.sender.name}
									src={m.sender.picture}
								/>
							</Tooltip>
						)}
						<span
							style={{
								backgroundColor: `${
									m.sender._id === user._id ? '#FFFFFF' : '#B9F5D0'
								}`,
								borderRadius: '20px',
								padding: '5px 15px',
								maxWidth: '75%',
								marginTop: isSameUser(messages, m, i, user._id) ? 5 : 15,
								marginLeft: isSameSenderStyle(messages, m, i, user._id),
							}}
						>
							{m.content}
						</span>
					</div>
				))}
		</ScrollableFeed>
	)
}
