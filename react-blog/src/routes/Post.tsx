import { useLoaderData, Link, Form } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Blog.css';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Author {
    name: string;
    id: number;
}

interface Comment {
    id: number;
    email: string;
    body: string;
}

interface LoaderData {
    post: Post;
    author: Author;
    comments: Comment[];
}

const Post = () => {
    // Os dados vêm diretamente do loader definido no App.tsx
    const { post, author, comments } = useLoaderData() as LoaderData;
    const postContentRef = useRef<HTMLDivElement>(null);

    // Rola a tela para o início do conteúdo do post sempre que um novo post é carregado.
    useEffect(() => {
        if (postContentRef.current) {
            postContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [post.id]); // A dependência no post.id garante que isso execute a cada novo post.

    return (
        <div className="post-content" ref={postContentRef}>
            {post && (
                <article>
                    <h2>{post.title}</h2>
                    <p className="author-name">
                        Por: <Link to={`/authors/${author.id}`}>{author.name}</Link>
                    </p>
                    <p>{post.body}</p>
                </article>
            )}

            <div className="comment-form-section">
                <h3>Deixe um comentário</h3>
                <Form method="post" className="comment-form">
                    <input type="text" name="name" placeholder="Seu nome" required />
                    <input type="email" name="email" placeholder="Seu e-mail" required />
                    <textarea name="body" placeholder="Seu comentário..." required></textarea>
                    <button type="submit">Enviar Comentário</button>
                </Form>
            </div>

            <div className="comments-section">
                <h3>Comentários ({comments.length})</h3>
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <p className="comment-author">{comment.email}</p>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;