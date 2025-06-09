import { useState } from "react"
import { motion } from "framer-motion"
import { signInWithEmailAndPassword } from "firebase/auth"
import { AuroraBackground } from "./ui/aurorabg"
import { auth } from "../services/firebase"
import "./components.css"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log("Login successful", userCredential)
        } catch (err) {
            console.error("Login error", err.code, err.message)
            setError(err.message)
        }
    }

    return (
        <AuroraBackground className="h-screen w-screen flex items-center justify-center text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col gap-6 border border-white/20"
            >
                <div className="flex justify-center">
                    <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3C!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --%3E%3Cpath fill='%23ffffff' d='M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22'/%3E%3C/svg%3E"
                        alt="Login"
                        className="w-24 h-24 rounded-full object-cover border-2 bg-black border-white"
                    />
                </div>

                <h1 className="text-3xl text-white font-semibold text-center">LOGIN</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/40"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/40"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {/* {error && setError(error)} */}
                    <button
                        type="submit"
                        className="cursor-pointer mt-2 bg-amber-300 text-black font-semibold py-2 rounded-lg hover:bg-amber-400 transition"
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </AuroraBackground>
    )
}

export default Login
