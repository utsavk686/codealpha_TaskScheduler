"use client"
import LoadingUi from '@/components/LoadingUi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Page() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const routes = useRouter()

    const changeHandler = (e) => {
        if (e.target.id === "name") {
            setName(e.target.value)
        }
        else if (e.target.id === "email") {
            setEmail(e.target.value)
        }
        else if (e.target.id === "password") {
            setPassword(e.target.value)
        }
        else if (e.target.id === "confirmpassword") {
            setConfirmPassword(e.target.value)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
            next: {
                revalidate: 1
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Account created log in you account".toUpperCase())
            routes.push("/auth/login")
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }


    return (

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-4">
            <div className="mx-auto max-w-lg">

                <form
                    onSubmit={submitHandler}
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-6 bg-slate-600"
                >
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Get started today
                    </h1>
                    <p className="text-center text-lg font-medium">Create your account</p>

                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter name"
                                value={name}
                                onChange={changeHandler}
                                required
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">

                                <svg className="svg-icon h-4 w-4 text-gray-400"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        fill="none"
                                        d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
								c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
								c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
								c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
								c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
								C15.328,9.982,12.943,12.367,10,12.367z">

                                    </path>
                                </svg>

                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <input
                                id='email'
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                                value={email}
                                onChange={changeHandler}
                                required
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input
                                id='password'
                                type={(showPassword) ? "text" : "password"}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                                value={password}
                                onChange={changeHandler}
                                required
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={() => {
                                setShowPassword(!showPassword)
                            }}>
                                {
                                    (showPassword) ?
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                        :
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                }
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmpassword" className="sr-only">Confirm Password</label>

                        <div className="relative">
                            <input
                                id='confirmpassword'
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={changeHandler}
                                required
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>

                            </span>
                        </div>
                        <div className='px-4'>
                            {
                                (password === "") ? <p>enter password</p> :
                                    (password.length < 6) ? <p>password length min 6</p> :
                                        (confirmPassword === "") ? <p>enter confirm password</p> :
                                            (confirmPassword === password) ? <p className='text-green-500'>match password</p> :
                                                <p className='text-red-500'>confirm password not same</p>
                            }
                        </div>
                    </div>



                    <button
                        type="submit"
                        className={`block w-full rounded-lg ${(password === confirmPassword && password !== "" && name !== "" && email !== "" && password.length > 5) ? 'bg-indigo-600' : 'bg-indigo-200'} px-5 py-3 text-sm font-medium text-white`}
                        disabled={!(password === confirmPassword && password !== "" && name !== "" && email !== "" && password.length > 5)}
                    >

                        <div className='flex justify-center'>
                            <div className='text-black font-bold text-xl me-5'>
                                Sign up
                            </div>
                            <div>


                                {
                                    ((password === confirmPassword && password !== "" && name !== "" && email !== "" && password.length > 5)) ?

                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>

                                        :

                                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>

                                }
                            </div>
                        </div>

                    </button>


                    <p className="text-center text-sm text-black">
                        I have a account
                        <Link className="underline text-blue-500" href={"/auth/login"}> Log in </Link>
                    </p>
                </form>
                {
                    (loading) ? <LoadingUi /> : ""
                }
            </div>
        </div>
    )
}

export default Page
