import { Link, useLoaderData } from 'react-router-dom';
import './Blog.css';

interface Post {
    id: number;
    title: string;
}

interface Author {
    name: string;
}

interface LoaderData {
    author: Author;
    posts: Post[];
}

const AuthorPosts = () => {
    const { author, posts } = useLoaderData() as LoaderData;

    return (
        <div>
            <h1>Posts de: {author.name}</h1>
            <ul className="posts-list">
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorPosts;