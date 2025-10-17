import { Form } from 'react-router-dom';

interface Post {
    title: string;
    body: string;
}

interface PostFormProps {
    post?: Post;
    method: 'post' | 'put';
}

const PostForm = ({ post, method }: PostFormProps) => {
    return (
        <Form method={method} className="post-form">
            <label>
                <span>Título:</span>
                <input type="text" name="title" required defaultValue={post?.title || ''} />
            </label>
            <label>
                <span>Conteúdo:</span>
                <textarea name="body" required defaultValue={post?.body || ''}></textarea>
            </label>
            <button type="submit">{method === 'post' ? 'Criar Post' : 'Salvar Alterações'}</button>
        </Form>
    );
};

export default PostForm;