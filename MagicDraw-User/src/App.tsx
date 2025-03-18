import { Outlet, RouterProvider } from 'react-router';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { router } from './Router';
import Category from './components/Category';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePageMain from './components/HomePageMain';
import DrawingApp from './components/DrawingApp';


const App = () => {
  return (
    <>
      {/* <HomePage/> */}
      {/* <Provider store={store}>
        <RouterProvider router={router} />
      </Provider> */}
      {/* <Category/> */}
      {/* <HomePageMain /> */}
      <DrawingApp />
    </>
  );
};

export default App;

