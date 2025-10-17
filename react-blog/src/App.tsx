import { 
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import './App.css'

// Components
import Navbar from './components/Navbar';

// Routes
import Home from './routes/Home';
import Blog from './routes/Blog';
import Post from './routes/Post';

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
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  if (!response.ok) throw new Error('Post não encontrado');
  return response.json();
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
            loader: postLoader // Loader para um post específico
          }
        ]
      }
    ]
  }
]);

function App() {
  // O componente App agora provê o roteador para a aplicação
  return <RouterProvider router={router} />
}

export default App
