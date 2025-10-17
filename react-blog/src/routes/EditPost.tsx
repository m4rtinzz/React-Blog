import { useLoaderData } from 'react-router-dom';
import PostForm from '../components/PostForm';
import './Dashboard.css';

interface Post {
    title: string;
    body: string;
}

const EditPost = () => {
    const post = useLoaderData() as Post;
    return (
        <div className="dashboard-page">
            <h1>Editar Post</h1>
            <PostForm method="put" post={post} />
        </div>
    );
};

export default EditPost;