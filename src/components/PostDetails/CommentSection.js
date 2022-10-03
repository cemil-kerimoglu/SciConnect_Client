import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Card, CardActions, CardContent } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost, deleteComment } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleDelete = async () => {
        dispatch(deleteComment(post._id, comment._id))
    }

    // const reversedComments = [...comments].reverse();



    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <Card className={classes.cardComment} key={i}>
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                                <CardActions className={classes.commentActions}>
                                    <Button variant='text' style={{textTransform: 'none'}} size="small" color='primary'>
                                        Like
                                    </Button>
                                    {(user?.result?._id === post?.creator) &&
                                    <Button variant='text' style={{textTransform: 'none'}} size="small" color='secondary'>
                                        Delete
                                    </Button>
                                    }
                                </CardActions>
                            </Card>
                        </Typography>
                    ))}
                    <div ref={commentsRef} /> 
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                        <TextField 
                            fullWidth
                            rows={6}
                            variant="outlined"
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={handleChange}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick}>
                            Post Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;