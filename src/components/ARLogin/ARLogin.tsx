import React,{useState} from 'react'

interface ARLoginProps{

}
const ARLogin = () => {
  const [isRegister, setIsRegister] = useState(false);

  const switchForm = () =>  setIsRegister( (prevState)=> !prevState)

  
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    {isRegister ?"Sign up new user": "Sign in to your account"}
                </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isRegister ? "Already have account?" : "Don't have account?"}
              <button
                className="font-medium text-indigo-600 background-transparent"
                onClick={switchForm}
              >
               &nbsp;{isRegister ? " Sign In here" : "Sign Up here"}
              </button>
            </p>
          </div>
          </div>
    </div>
  )
}

export default ARLogin;
