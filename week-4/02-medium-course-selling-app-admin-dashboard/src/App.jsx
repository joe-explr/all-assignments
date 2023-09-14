import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import ShowCourse from './components/ShowCourse';

function App() {
    return (
        <Router>
            <NavBar />
            <div className={'content'}>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/course/:id" element={<ShowCourse />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;