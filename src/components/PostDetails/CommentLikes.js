import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { likeComment } from '../../actions/posts';

const CommentLikes = ( { likes, userId, post, c } ) => {

    const [likesArray, setLikesArray] = useState(likes);
    const hasLikedComment = likesArray.find((like) => like === userId);
    const dispatch = useDispatch();

    const handleLike = () => {
        dispatch(likeComment(post._id, c?._id));
        if(hasLikedComment) {
            setLikesArray(likesArray.filter((id) => id !== userId))
        } else {
            setLikesArray([ ...likesArray, userId]);
        }
    }

    return (
        <div>
            <Button variant='text' style={{textTransform: 'none'}} size="small" color='primary' disabled={!userId} onClick={handleLike}>
            {
                likesArray.includes(userId) ?
                ( <> { likesArray.length > 2 ? `You and ${likesArray.length - 1} others liked` : `${likesArray.length} like${likesArray.length > 1 ? 's' : ''}`  } </> )
                :
                (<> { likesArray.length === 1 ? 'Like' : 'Likes'} {likesArray.length} </>)
            }                          
            </Button>     
        </div>
    )
    
}

export default CommentLikes;