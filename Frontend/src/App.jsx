import { Suspense } from "react"
import { RouterProvider } from "react-router"
import {router} from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx"
function App() {


  return (
    <AuthProvider>
      <InterviewProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
    </InterviewProvider>
  </AuthProvider>
  )
}

export default App
