import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot} from 'recoil';
import Login from './components/Login';
import Landing from "./components/Landing";
import SignUp from './components/SignUp';
import ShowCourses from './components/ShowCourses';
import PurchasedCourses from './components/PurchasedCourses';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import ShowCourse from './components/ShowCourse';

function App() {
    return (
        <Router>
            <RecoilRoot>
            <NavBar />
            <div className='content'>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/courses/purchased" element={<PurchasedCourses />} />
                <Route path="/courses/:id" element={<ShowCourse />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
            </div>
            </RecoilRoot>
        </Router>
    );
}

export default App;