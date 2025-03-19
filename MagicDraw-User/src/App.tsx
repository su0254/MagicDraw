import { Outlet, RouterProvider } from 'react-router';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { router } from './Router';
import Category from './components/Category';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePageMain from './components/HomePageMain';
import DrawingApp from './components/DrawingApp';
import ShowPainting from './components/ShowPainting';


const App = () => {
  return (
    <>
    {/* <HomePageMain /> */}
      {/* <HomePage/> */} 
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* <Category/> */}
      {/* <ShowPainting selectedImage={'../../public/images/5.png'} onClose={() => {}} /> */}
      {/* <DrawingApp backgroundImageUrl={'../../public/images/5.png'} /> */}
    </>
  );
};

export default App;

