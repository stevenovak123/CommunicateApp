import React, { useContext } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { SocketContext } from '../../../context/VideoSocketContext'

const useStyles = makeStyles((theme) => ({
	video: {
		width: '550px',
		[theme.breakpoints.down('xs')]: {
			width: '300px',
		},
	},
	gridContainer: {
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	paper: {
		padding: '10px',
		border: '2px solid black',
		marign: '10px',
	},
}))

export const VideoPlayer = () => {
	const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
		useContext(SocketContext)

	const classes = useStyles()
	return (
		<Grid container className={classes.gridContainer}>
			{/* Own Video */}
			<Paper className={classes.paper}>
				<Grid item xs={12} md={6}>
					<Typography variant='h5' gutterBottom>
						{name || `Name`}
					</Typography>
					<video
						playsInline
						muted
						ref={myVideo}
						autoPlay
						className={classes.video}
					/>
				</Grid>
			</Paper>
			{/*  * other Users Video */}
			<Paper className={classes.paper}>
				<Grid item xs={12} md={6}>
					<Typography variant='h5' gutterBottom>
						{call.name || `Name`}
					</Typography>
					<video
						playsInline
						ref={userVideo}
						autoPlay
						className={classes.video}
					/>
				</Grid>
			</Paper>
		</Grid>
	)
}
