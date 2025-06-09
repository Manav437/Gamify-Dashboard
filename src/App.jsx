import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./services/firebase"
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css'
import "./index.css";


function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Listen for auth state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			setLoading(false)
		})
		return () => unsubscribe()
	}, [])

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
					<p className="text-gray-700 dark:text-white text-lg font-semibold">Loading...</p>
				</div>
			</div>
		);
	} return (
		<Router>
			<Routes>
				<Route path='/' element={user ? <Navigate to="/dashboard" /> : <Login />} />
				<Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	)

}

export default App;
