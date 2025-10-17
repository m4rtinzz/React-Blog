import { 
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect
} from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import './App.css'

// Components
import Navbar from './components/Navbar';

// Routes
import Home from './routes/Home';
import Blog from './routes/Blog';
import Post from './routes/Post';
import AuthorPosts from './routes/AuthorPosts';

// 1. Layout principal da aplicação
const AppLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        {/* O conteúdo das rotas filhas será renderizado aqui */}
        <Outlet />
      </div>
    </div>
  );
}

// 2. Loaders para buscar dados
export const postsLoader = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Falha ao buscar os posts');
  return response.json();
};

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  // 1. Busca o post
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  if (!postResponse.ok) throw new Error('Post não encontrado');
  const post = await postResponse.json();

  // 2. Busca o autor e os comentários em paralelo para otimizar
  const [userResponse, commentsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
  ]);

  if (!userResponse.ok) throw new Error('Autor não encontrado');
  if (!commentsResponse.ok) throw new Error('Falha ao buscar comentários');

  const author = await userResponse.json();
  const comments = await commentsResponse.json();

  return { post, author, comments };
};

export const authorPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  const [authorResponse, postsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}/posts`)
  ]);

  if (!authorResponse.ok) throw new Error('Autor não encontrado.');
  if (!postsResponse.ok) throw new Error('Falha ao buscar posts do autor.');

  const author = await authorResponse.json();
  const posts = await postsResponse.json();

  return { author, posts };
};

// 4. Action para criar um novo comentário
export const commentAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const comment = {
    email: formData.get('email'),
    name: formData.get('name'), // A API espera um 'name', podemos usar o email ou um nome fixo
    body: formData.get('body'),
    postId: params.id,
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) throw new Error('Falha ao enviar comentário.');

  return redirect(`/blog/${params.id}`); // Redireciona para a mesma página para ver o resultado (simulado)
};

// 3. Definição centralizada das rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // O layout é o elemento pai
    children: [ // As páginas são filhas do layout
      { 
        index: true, // Define esta como a rota padrão para o caminho '/'
        element: <Home /> 
      },
      { 
        path: 'blog', 
        element: <Blog />, 
        loader: postsLoader, // Loader para a lista de posts
        children: [
          { 
            path: ':id', 
            element: <Post />,
            loader: postLoader, // Loader para um post específico
            action: commentAction, // Action para o formulário de comentário
          }
        ]
      },
      {
        path: 'authors/:userId',
        element: <AuthorPosts />,
        loader: authorPostsLoader,
      }
    ]
  }
]);

function App() {
  // O componente App agora provê o roteador para a aplicação
  return <RouterProvider router={router} />
}

export default App
