import { Link, useLoaderData } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import './Blog.css';

interface Post {
    id: number;
    title: string;
}

interface Author {
    id: number;
    name: string;
}

interface LoaderData {
    author: Author;
    posts: Post[];
}

const AuthorPosts = () => {
    const { author, posts } = useLoaderData() as LoaderData;
    const pageTopRef = useRef<HTMLDivElement>(null);

    // Rola a tela para o início da página sempre que um novo autor é visualizado.
    useEffect(() => {
        if (pageTopRef.current) {
            pageTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [author.id]); // A dependência no author.id garante que isso execute a cada novo autor.

    return (
        <div ref={pageTopRef}>
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