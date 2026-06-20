import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom"
import AuthLAyout from "./Layouts/AuthLAyout"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './Layouts/MainLayout';
import FeedPage from './pages/FeedPage';
import ProfilePage from "./pages/ProfilePage";
import PostDetailsPage from './pages/PostDetailsPage';
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAuthRoute from './components/ProtectedAuthRoute/ProtectedAuthRoute';
import SuggestionsPage from './pages/SuggestionPage';
import ProfilePosts from "./pages/ProfilePosts";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";
import ProfileAbout from "./pages/ProfileAbout";
import BookMarkedPosts from "./pages/BookMarkedPosts";



function App() {


  const router = createHashRouter([

    {
      path: "", element: <AuthLAyout />, children: [
        { path: "login", element: <ProtectedAuthRoute><LoginPage /></ProtectedAuthRoute> },
        { path: "register", element: <ProtectedAuthRoute><RegisterPage /></ProtectedAuthRoute> },
      ]
    },
    {
      path: "", element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
        { path: "feed", element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
        {
          path: "profile/:id", element: <ProtectedRoute><ProfilePage /></ProtectedRoute>, children: [
            { path: "/profile/:id/posts", element: <ProtectedRoute><ProfilePosts /></ProtectedRoute> },
            { path: "/profile/:id/about", element: <ProtectedRoute><ProfileAbout /></ProtectedRoute> }
          ]
        },
        { path: "settings", element: <ProtectedRoute><ProfileSettings /></ProtectedRoute> },
        { path: "suggestion", element: <ProtectedRoute><SuggestionsPage /></ProtectedRoute> },
        { path: "bookmarks", element: <ProtectedRoute><BookMarkedPosts /></ProtectedRoute> },
        { path: "post-details/:id", element: <ProtectedRoute><PostDetailsPage /> </ProtectedRoute> },
        { path: "*", element: <NotFoundPage /> },
      ]
    }


    // {
    //   path: "", element: <ProtectedRoute />, children: [
    //     { index: true, element: <FeedPage /> },
    //     { path: "profile", element: <ProfilePage /> },
    //     { path: "post-details", element: <PostDetailsPage /> },
    //     // { path: "*", element: <NotFoundPage /> },
    //   ]
    // }


  ])

  return (
    <>

      <RouterProvider router={router} />
    </>
  )
}

export default App
