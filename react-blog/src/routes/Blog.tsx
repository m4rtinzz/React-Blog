import { Link, Outlet, useLoaderData } from 'react-router-dom';

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
            <ul>
                {posts && posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
            <hr />
            <Outlet />
        </div>
    );
};

export default Blog;