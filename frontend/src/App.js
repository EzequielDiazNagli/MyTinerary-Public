import "./style/App.css";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Footer from "./components/Footer";
import Cities from "./pages/Cities"
import {Routes, Route} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useEffect } from "react";
import Detail from "./pages/Detail";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp"
import {useDispatch, useSelector} from 'react-redux'
import citiesActions from "./redux/actions/citiesActions";
import SnackBar from "./components/SnackBar";
import userActions from "./redux/actions/userActions";

// import { Navigate } from "react-router-dom";

function App() {

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 500)
  },[])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(citiesActions.getCities())
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    if(localStorage.getItem('token')!== null) {
        const token = localStorage.getItem("token")
        dispatch(userActions.verifyToken(token))
    }
    // eslint-disable-next-line
  },[])

  const userState = useSelector(store => store.userReducer.user)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/*" element={<Index />}/>
        <Route path="/Cities" element={<Cities />}/>
        <Route path="/City/:id" element={<Detail/>}/>
        {!userState && <Route path="/LogIn" element={<LogIn/>} />}
        {!userState && <Route path="/SignUp" element={<SignUp/>} />}
        {/* <Route path="/LogIn" element={ localStorage.getItem('token')? (<Navigate replace to="/"/>): <LogIn/>} />
        <Route path="/SignUp" element={ localStorage.getItem('token')? (<Navigate replace to="/"/>): <SignUp/>} /> */}
      </Routes>
      <SnackBar/>
      <Footer />
      <ScrollToTop style={{borderRadius:50}} smooth component={<ArrowCircleUpIcon style={{fontSize:30}}/>}/>
    </>
  );
}

export default App