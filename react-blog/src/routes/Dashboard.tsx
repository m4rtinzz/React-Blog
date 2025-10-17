import { Link, useLoaderData, Form } from 'react-router-dom';
import './Dashboard.css';

interface Post {
    id: number;
    title: string;
}

const Dashboard = () => {
    const posts = useLoaderData() as Post[];

    return (
        <div className="dashboard-page">
            <h1>Painel do Autor</h1>
            <div className="dashboard-header">
                <p>Bem-vindo! Aqui você pode gerenciar seus posts.</p>
                <Link to="/dashboard/new" className="btn-new-post">Criar Novo Post</Link>
            </div>

            {posts.length > 0 ? (
                <ul className="dashboard-posts-list">
                    {posts.map(post => (
                        <li key={post.id}>
                            <span className="post-title">{post.title}</span>
                            <div className="post-actions">
                                <Link to={`/dashboard/edit/${post.id}`} className="btn-edit">Editar</Link>
                                <Form method="post" action={`/dashboard/delete/${post.id}`} onSubmit={(e) => !confirm('Tem certeza que deseja excluir este post?') && e.preventDefault()}>
                                    <button type="submit" className="btn-delete">Excluir</button>
                                </Form>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Você ainda não criou nenhum post.</p>
            )}
        </div>
    );
};

export default Dashboard;