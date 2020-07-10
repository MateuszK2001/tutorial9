import React, {Fragment} from 'react';
import classes from'./Post.module.css';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props{
    title:string;
    author?:string;
    clicked: ()=>void;
}

const Post = (props:Props)=>(
    <article className={classes.Post} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className={classes.Author}>{props.author}</div>
        </div>
    </article>
);

export default Post;