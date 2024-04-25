import './App.scss';
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index';
import MainPage from './containers/MainPage/MainPage';
import ErrorPage from './containers/ErrorPage/ErrorPage';
import TriviaPage from './containers/TriviaPage/TriviaPage';
import SettingsPage from './containers/SettingsPage/SettingsPage';
import EndPage from './containers/EndPage/EndPage';

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <TriviaPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/end",
    element: <EndPage />,
    errorElement: <ErrorPage />,
  }
]);

function App() {
  return (
    <div className='App'>
      <div className='App-game-name'>Trivia Quiz</div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
