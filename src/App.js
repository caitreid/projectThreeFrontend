// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'


// components
import IndexArtworks from './components/artworks/IndexArtworks'
import ShowArtwork from './components/artworks/ShowArtwork'
import IndexExhibitions from './components/exhibitions/IndexExhibition'
import ShowExhibition from './components/exhibitions/ShowExhibition'
import IndexDepartments from './components/departments/IndexDepartments'
import ShowDepartment from './components/departments/ShowDepartment'
import CreateExhibition from './components/exhibitions/CreateExhibition'




const App = () => {

  const [user, setUser] = useState(false)
  const [msgAlerts, setMsgAlerts] = useState([])
  
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route path='/exhibitions' element={ <IndexExhibitions msgAlert={msgAlert} user={user} />}  />
					<Route path='/exhibitions/:id' element={ <ShowExhibition msgAlert={msgAlert} user={user} />}   />
					<Route path='/departments' element={ <IndexDepartments msgAlert={msgAlert} user={user} />}  />
					<Route path='/departments/:id' element={ <ShowDepartment msgAlert={msgAlert} user={user} />}  />
					<Route path='/artworks' element={ <IndexArtworks msgAlert={msgAlert} /> } /> {/* For testing purposes, link to artworks */}
					<Route path='/artworks/:id' element={ <ShowArtwork msgAlert={msgAlert} />} />
					
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					
					<Route
						path='/exhibitions/create'
						element={
						<RequireAuth user={user}>
							<CreateExhibition msgAlert={msgAlert} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route 
						path='artworks/:id'
						element={ <ShowArtwork user={user} msgAlert={msgAlert} />}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
				<Footer />
			</Fragment>
		)
}

export default App
