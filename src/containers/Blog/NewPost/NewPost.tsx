import React, {Fragment, useState} from 'react';
import classes from'./NewPost.module.css';
import axios from '../../../axios';
import Axios from 'axios';
import { useHistory, RouteComponentProps, withRouter } from 'react-router';

interface Props{

}

const NewPost = (props:Props&RouteComponentProps)=>{
    const [title, titleUpdate] = useState('');
    const [content, contentUpdate] = useState('');
    const [author, authorUpdate] = useState('Max');
    const postDataHandler = async ()=>{
        const post = {
            title: title,
            body: content,
            author: author
        };
        
        const response = await axios.post('/posts', post);
        console.log(response);
        props.history.push("/");
    };
    return(
        <div className={classes.NewPost}>
            <h1>Add a Post</h1>
            <label>Title</label>
            <input type="text" value={title} onChange={(event) => titleUpdate(event.target.value)} />
            <label>Content</label>
            <textarea rows={4} value={content} onChange={(event) => contentUpdate(event.target.value)} />
            <label>Author</label>
            <select value={author} onChange={(event) => authorUpdate(event.target.value)}>
                <option value="Max">Max</option>
                <option value="Manu">Manu</option>
            </select>
            <button onClick={postDataHandler}>Add Post</button>
        </div>
    );
};

export default withRouter(NewPost);