import { Link, Outlet, useLoaderData } from 'react-router-dom';
import './Blog.css';

interface PostData {
    id: number;
    title: string;
}

const Blog = () => {
    // Os dados vêm diretamente do loader definido no App.tsx
    const posts = useLoaderData() as PostData[];

    return (
        <div>
            <h1>Posts do Blog</h1>
            <ul className="posts-list">
                {posts && posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};

export default Blog;