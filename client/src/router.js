import React from 'react';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
// import Subjects from './components/Subjects';
// import Subject from './components/Subject'

import Login from './components/Login.js'
import Register from './components/Register.js'
import SavedArticles from './components/SavedArticles.js'
/*// import Logout from './components/Logout.js'

// import FlashcardAddForm from './components/FlashcardAddForm.js'
// import FlashcardEditForm from './components/FlashcardEditForm.js'

// import HardOnes from './components/Hardones.js'

// import SubjectAddForm from './components/SubjectAddForm.js'
// import Header from './components/Header.js'

*/
export default (
    <BrowserRouter>
        <div className='router'>
            <Route exact path='/home' component={App} />
            <Route exact path='/' component={App} />
            <Route exact path='/articles/user/:user_id' component={SavedArticles} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Login} />
            <Route exact path='/register' component={Register} />
        </div>
    </BrowserRouter>
)


