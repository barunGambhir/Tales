import Main from "./components/main";
import Feed from "./components/feed";
import SignupForm from "./components/SignupForm";
import CreatePost from "./components/CreatePost";
import Profile from "./components/profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileEdit from "./components/profileEdit";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    //adding routes
    <Router>

      <Routes>
        <Route path="/" element={isLoggedIn === "true" ? <Feed /> : <Main />} />
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

      </Routes>

    </Router>
  );
}

export default App;
