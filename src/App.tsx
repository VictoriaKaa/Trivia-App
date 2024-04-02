import './App.scss';
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index';
import MainPage from './containers/MainPage/MainPage';
import ErrorPage from './containers/ErrorPage/ErrorPage';

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
