import React, { Fragment, useEffect, useState } from 'react';
import { Post } from '../Blog';
import PostElement from '../../../components/Post/Post';
import classes from './Posts.module.css';
import Axios from 'axios';
import axios from '../../../axios';

interface Props {
    postSelectedHandler: (id: number) => void;
}
const Posts = (props: Props) => {
    const [posts, postsUpdate] = useState([] as Post[]);

    useEffect(() => {
        const cToken = Axios.CancelToken.source();
        axios.get('https://jsonplaceholder.typicode.com/posts',
            { cancelToken: cToken.token })
            .then(response => {
                const posts = (response.data as Post[]).slice(0, 4);
                const updatePosts: Post[] = posts.map(post => {
                    return { ...post, author: 'Max' };
                });
                postsUpdate(updatePosts);
                console.log(response.data);
            })
            .catch(err => {
                if (!Axios.isCancel(err))
                    console.log(err);
            });
        return () => {
            cToken.cancel();
        };
    }, []);
    return (
        <Fragment>
            <section className={classes.Post}>
                {
                    posts.map(p => {
                        return <PostElement
                            title={p.title}
                            author={p.author}
                            key={p.id}
                            clicked={() => props.postSelectedHandler(p.id)} />;
                    })
                }
            </section>
            
        </Fragment>
    );
};

export default Posts;