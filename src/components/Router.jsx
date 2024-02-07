import {BrowserRouter , Routes, Route} from 'react-router-dom'
import EmployeeCreate from '../pages/EmployeeCreate'
import EmployeeList from '../pages/EmployeeList'
import Header from '../components/Header'
import Error from '../pages/Error'
import Footer from './Footer'

/**
 * Component function for routing
 * @returns {JSX.Element}
 */
function Router(){

    return ( <BrowserRouter>
             <Header/>
                <Routes>
                    <Route exact path='/' element={<EmployeeCreate/>} />
                    <Route path='/Employee' element={<EmployeeList/>}/>
                    <Route path='*' element={<Error/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
            )
}

export default Router