import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Card, CardActions, CardContent } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';

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

    const reversedComments = [...comments].reverse();

    /*
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    */


    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {reversedComments.map((c, i) => (
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