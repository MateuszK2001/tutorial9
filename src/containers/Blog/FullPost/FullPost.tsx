import React, {Fragment, useEffect, useState} from 'react';
import classes from'./FullPost.module.css';
import axios from '../../../axios';
import Axios from 'axios';
import {Post} from '../Blog';

interface Props{
    id:number | null;
}

const FullPost = (props:Props)=>{
    const [loadedPost, loadedPostUpdate] = useState(null as Post | null);
    
    useEffect(()=>{
        const cToken = Axios.CancelToken.source();
        if(props.id)
            axios.get('/posts/'+props.id.toString(), {cancelToken: cToken.token})
                .then(response=>{
                    loadedPostUpdate(response.data);
                    console.log (response.data);
                })
                .catch(err=>{
                    if(!Axios.isCancel(err))
                        console.log(err);
                });
        return ()=>{
            cToken.cancel();
        };
    }, [props.id]);
    
    const deletePostHandler = ()=>{
        axios.delete('/posts/'+props.id)
            .then(response=>{
                console.log(response);
            });
    }
     
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if(props.id && !loadedPost){
        post = <p style={{textAlign: 'center'}}>Loading...</p>;
    }
    if(loadedPost){
        post = (
            <div className={classes.FullPost}>
                <h1>{loadedPost?.title}</h1>
                <p>{loadedPost?.body}</p>
                <div className={classes.Edit}>
                    <button 
                        className={classes.Delete}
                        onClick={deletePostHandler}>Delete</button>
                </div>
            </div>  
        );
    }
    return post;
};

export default FullPost;

