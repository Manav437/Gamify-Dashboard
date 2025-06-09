import React, { useEffect, useState } from "react"
import { auth, db } from "../services/firebase"
import { signOut } from "firebase/auth"
import { BackgroundBeams } from "./ui/BackgroundBeams"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"

const Dashboard = ({ user }) => {
    const [xp, setXp] = useState(0)
    const [level, setLevel] = useState(1)
    const [streak, setStreak] = useState(0)
    const [lastAction, setLastAction] = useState("")
    const [selectedMood, setSelectedMood] = useState("")
    const [message, setMessage] = useState("")

    const userRef = doc(db, "users", user.uid)

    useEffect(() => {
        if (!user?.uid) return;

        const loadUserData = async () => {
            const snap = await getDoc(userRef)
            if (snap.exists()) {
                const data = snap.data()
                setXp(data.xp || 0)
                setLevel(data.level || 1)
                setStreak(data.streak || 0)
                setLastAction(data.lastAction?.toDate().toLocaleString() || "")
                setSelectedMood(data.mood || "")
            } else {
                await setDoc(userRef, {
                    xp: 0,
                    level: 1,
                    streak: 1,
                    lastAction: serverTimestamp(),
                    mood: ""
                })
            }
        }

        loadUserData()
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
    }

    const handleMoodSubmit = async () => {
        if (!selectedMood) return setMessage("Please select a mood!")

        const newXP = xp + 10
        const newLevel = Math.floor(newXP / 100) + 1

        await updateDoc(userRef, {
            xp: newXP,
            level: newLevel,
            mood: selectedMood,
            lastAction: serverTimestamp(),
            streak: streak + 1
        })

        setXp(newXP)
        setLevel(newLevel)
        setStreak(streak + 1)
        setLastAction(new Date().toLocaleString())
        setMessage("Mood checked in! +10 XP 🌟")
    }

    return (
        <div className="grid-bg relative min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Welcome, {user.email}</h1>

                <button
                    className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="space-y-3 mb-8">
                <p><strong>XP:</strong> {xp} / 100</p>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded">
                    <div
                        className="h-4 bg-green-500 rounded transition-all duration-300"
                        style={{ width: `${xp % 100}%` }}
                    />
                </div>
                <p><strong>Level:</strong> {level}</p>
                <p><strong>Streak:</strong> {streak} 🔥</p>
                <p><strong>Last Action:</strong> {lastAction}</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 shadow mb-8">
                <h3 className="text-lg font-semibold mb-2">How are you feeling?</h3>
                <div className="flex space-x-3 mb-4">
                    {["😄", "😐", "😢", "😠", "🤩"].map((emoji) => (
                        <button
                            key={emoji}
                            className={`cursor-pointer text-2xl px-3 py-2 rounded-full border-2 transition-all duration-200 ${selectedMood === emoji
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => setSelectedMood(emoji)}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleMoodSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition"
                >
                    Check In
                </button>
                {message && <p className="mt-2 text-green-600">{message}</p>}
            </div>

            <BackgroundBeams />
        </div>
    )
}

export default Dashboard
