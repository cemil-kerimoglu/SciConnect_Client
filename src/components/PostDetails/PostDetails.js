import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

import { Viewer } from '@react-pdf-viewer/core'; // install this library
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core'; // install this library

const PostDetails = () => {

  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onButtonClick = () => {
      // using Java Script method to get PDF file
      fetch(post.selectedFile).then(response => {
          response.blob().then(blob => {
              // Creating new object of PDF file
              const fileURL = window.URL.createObjectURL(blob);
              // Setting various property values
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = 'SamplePDF.pdf';
              alink.click();
          })
      })
  }

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post.tags.join(',') }));
    }
  }, [post]) // With this you'll populate the posts property of the state object.

  if(!post) return null;

  if(isLoading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
              <CircularProgress size="7em" />
           </Paper>
  }

  const fileExtension = post.selectedFile.split('.').pop();
  const recommendedPosts = posts.filter((postItem) => postItem._id !== post._id ); 
  console.log(recommendedPosts);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Submitted by: {post.name}</Typography>
          <Typography gutterBottom variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        { fileExtension !== 'pdf' ?
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
          : 
          <div className={classes.buttonContainer}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                <div className={classes.pdfViewer}>
                  <Viewer fileUrl={post.selectedFile} />
                </div>
            </Worker>
            <button className={classes.button} onClick={onButtonClick}> Download PDF </button>
          </div>
        } 
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You might also be interested in:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ _id, title, message, name, likes }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle1'>by {name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails