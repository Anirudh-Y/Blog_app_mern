import React, {useContext, useState} from 'react'
import { Box, Button, styled, TextareaAutosize } from '@mui/material'
import { DataContext } from '../../context/DataProvider';
import { API } from '../../../service/api';
import { useEffect } from 'react';
import Comment from './Comment';


const Container = styled(Box)`
    display:flex;
    margin-top: 100px;
`;

const Image = styled('img')({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
})

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    comment: '',
    date: new Date()
}

const Comments = ({post}) => {

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue)
    const {account} = useContext(DataContext)
    const [comments,setComments] = useState([])

    const handleChange = (e) => {
        setComment({...comment,
            name: account.username,
            postId: post._id,
            comment:e.target.value})
    }

    const addComment = async () => {
        console.log(comment);
        let response = await API.newComment(comment);
        if(response.isSuccess){
            setComment(initialValue);
            
            
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            let response = await API.getAllComments(post._id)
            if(response.isSuccess){
                setComments(response.data)
            }
        }

        fetchData();
    },[])

  return (
    <Box>
        <Container>
            <Image src={url} alt='dp' />
            <StyledTextArea 
            minRows={5}
            placeholder='Whats on ur mind?'
            value={comment.comment}
            onChange={handleChange}
            />
            <Button variant='contained' size='medium' style={{height: '40px'}} onClick={addComment}>Post</Button>
        </Container>
        {/* <Box>
            {comments && comments.length > 0 && comments.map((comment)=>(
                <Comment comment={comment} />
            ))}
        </Box> */}
    </Box>
  )
}

export default Comments