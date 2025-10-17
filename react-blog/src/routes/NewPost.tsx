import PostForm from '../components/PostForm';
import './Dashboard.css';

const NewPost = () => {
    return (
        <div className="dashboard-page">
            <h1>Criar Novo Post</h1>
            <PostForm method="post" />
        </div>
    );
};

export default NewPost;