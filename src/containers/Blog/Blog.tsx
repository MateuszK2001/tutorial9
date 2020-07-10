import React, { Fragment, useEffect, useState, Suspense } from 'react';
import Post from '../../components/Post/Post';
import FullPost from './FullPost/FullPost';
import classes from './Blog.module.css';
import axios from '../../axios';
import Axios from 'axios';
import Posts from './Posts/Posts';
import { Route, Link, NavLink, useHistory, Switch } from 'react-router-dom';


// import asyncComponent from '../../hoc/asyncComponent.jsx';
// const AsyncNewPost = asyncComponent(()=> {
    //     return import('./NewPost/NewPost');
    // });
const NewPostAsync = React.lazy(()=>import('./NewPost/NewPost'));

interface Props {

}
export interface Post {
    body: string;
    title: string;
    id: number;
    userId: number;
    author?: string;
}
const Blog = (props: Props) => {
    const history = useHistory();
    const [selectedPostId, selectedPostIdUpdate] = useState(null as number | null);

    const postSelectedHandler = (id: number) => {
        selectedPostIdUpdate(id);
        history.push("/" + id.toString());
    };

    return (
        <div className={classes.Blog}>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to='/' exact activeClassName={classes.active}>Posts</NavLink></li>
                        <li><NavLink exact to="/new-post" activeClassName={classes.active}>New Post</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Switch>
                <Route path="/new-post" exact render={()=>(
                    <Suspense fallback='Loading...'><NewPostAsync /></Suspense>) 
                }/>
                <Route path="/" render={() => (
                    <Fragment>
                        <Posts postSelectedHandler={postSelectedHandler} />
                        <Route path="/:id" exact render={(props) => (
                            <FullPost id={props.match.params.id} />
                        )} />
                    </Fragment>
                )} />
            </Switch>

            {/* <Route path='/' exact render={()=><h1>Home</h1>}/>
            {/* <section>
                <FullPost id={selectedPostId}/>
            </section>
            <section>
                <NewPost />
            </section> */}
        </div>
    );
};


export default Blog;
