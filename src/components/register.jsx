import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState("");
    //input change handeler
    const handelerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    // submit handeler form
    const handelerSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(" Registration Successful!");
                console.log("User:", data.user);
            } else {
                //laravel validetion show
                const errors = data.errors;
                let errMsg = "";
                for (const key in errors) {
                    errMsg += `${errors[key][0]} \n`;
                }
                setMessage(errMsg);
            }
        } catch (err) {
            setMessage("Something went wrong.");
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-4">
                <form onSubmit={handelerSubmit} className="bg-white border-gray-50 shadow-2xl p-22 rounded-3xl">
                    <h2 className="text-2xl font-bold text-gray-700">Register</h2>

                    <div>
                        <label className="block text-left mb-1 mt-5">Full Name</label>
                        <input type="text" name="name" placeholder="name" onChange={handelerChange}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left mb-1 mt-2">Email</label>
                        <input type="text" name="email" placeholder="email" onChange={handelerChange}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left mb-1 mt-2">Password</label>
                        <input type="password" name="password" onChange={handelerChange}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left mb-1 mt-2 font-bold">Confirm Password</label>
                        <input type="password" name="password_confirmation" onChange={handelerChange}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <button className="mt-2 border border-gray-400 bg-blue-300 rounded-sm py-4 px-6 shadow-md hover:bg-blue-700 duration-300" type="submit">Register</button>
                    <p style={{ whiteSpace: "pre-wrap", color: "red" }}>{message}</p>
                    <p>You can {''}
                        <Link to="/login" className="text-blue-500 underline">
                            Login
                        </Link>
                    </p>
                </form>

            </div>

        </>
    )

}

export default RegisterForm;