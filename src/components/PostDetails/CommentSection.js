import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Card, CardActions } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost, deleteComment } from '../../actions/posts';
import CommentLikes from './CommentLikes';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const userId = user?.result?._id;

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

    // const reversedComments = [...comments].reverse();

    /*
    const Likes = (c) => {
        if (c.likes.length > 0) {
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


    
    
    // const reversedComments = [...comments].reverse();

    /*
    setComments((previousComments) => 
    previousComments.map((comment) => comment._id === c?._id ? c : comment ))
    */

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <Card className={classes.cardComment} key={i}>

                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                                {/*<CardActions className={/*classes.commentActions}>
                                    <Button variant='text' style={{textTransform: 'none'}} size="small" color='primary'>
                                        Like
                                    </Button>
                                    {(user?.result?._id === post?.creator) &&
                                    <Button variant='text' style={{textTransform: 'none'}} size="small" color='secondary'>
                                        Delete
                                    </Button>
                                    }
                                </CardActions>*/}
                                <strong>{c?.content.split(': ')[0]}</strong>
                                {c?.content.split(':')[1]}
                                <CardActions className={classes.commentActions}>
                                    <CommentLikes likes={c?.likes} userId={userId} post={post} c={c} />
                                    {(user?.result?._id === c?.writtenBy) &&
                                    <Button variant='text' style={{textTransform: 'none'}} size="small" color='secondary' onClick={() => {
                                        dispatch(deleteComment(post._id, c?._id));
                                        setComments((previousComments) => 
                                            previousComments.filter((comment) => comment._id !== c?._id ))
                                        }}>
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