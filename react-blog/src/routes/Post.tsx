import { useLoaderData } from 'react-router-dom';

interface PostData {
    id: number;
    title: string;
    body: string;
}

const Post = () => {
    // Os dados vêm diretamente do loader definido no App.tsx
    const post = useLoaderData() as PostData;

    return (
        <div>
            {post && (
                <article>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </article>
            )}
        </div>
    );
};

export default Post;