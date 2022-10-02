import React, { useState } from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

import { Viewer } from '@react-pdf-viewer/core'; // install this library
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core'; // install this library

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post.likes);

    const userId = user?.result?._id; 
    const hasLikedPost = likes.find((like) => like === userId);

    const handleLike = () => {
        dispatch(likePost(post._id));
        if(hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId))
        } else {
            setLikes([ ...likes, userId]);
        }
    }

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

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

    const fileExtension = post.selectedFile.split('.').pop();

    return (
        <Card className={classes.card} raised elevation={6}>
            { fileExtension !== 'pdf' ?
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
              :
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                <div className={classes.pdfWrapper}>
                  <Viewer fileUrl={post.selectedFile} />
                </div>
              </Worker>
            }
            {(user?.result?._id === post?.creator) &&
                <div className={classes.overlay2}>
                    <Button size='small' onClick={() => {setCurrentId(post._id)}}>
                        <MoreHorizIcon fontSize='medium' />
                    </Button>
                </div>
            }
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <Typography className={classes.title} variant="body1">by {post.name}</Typography>
                <CardContent>
                    <Typography variant='body2' color="textSecondary" component='p' >{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?._id === post?.creator) &&
                    <Button size="small" color='secondary' onClick={() => dispatch(deletePost(post._id)) }>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                }  
            </CardActions>
        </Card>
    );
}

export default Post;