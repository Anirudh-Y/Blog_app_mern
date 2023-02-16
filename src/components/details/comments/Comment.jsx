import { Box, Typography } from '@mui/material'
import React from 'react'

const Comment = ({comment}) => {
  return (
    <Box>
        <Box>
            <Typography>{comment.name}</Typography>
            <Typography>{new Date(comment.name).toDateString()}</Typography>
        </Box>
        <Box>
        <Typography>{comment.comment}</Typography>
        </Box>
    </Box>
  )
}

export default Comment