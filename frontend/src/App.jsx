import { useState, useEffect, Fragment, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Default from './components/Default/Default'
import { routes } from './routes/routes'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      const parsedUser = JSON.parse(storedUser)
      return parsedUser?.isAdmin === true
    } catch (error) {
      console.error('Lỗi khi parse user:', error)
      return false
    }
  })

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, page: Page, isPrivate, isShowHeader }, idx) => {
            const Layout = isShowHeader ? Default : Fragment

            const element = (
              <Layout>
                <Page />
              </Layout>
            )

            return (
              <Route
                key={idx}
                path={path}
                element={
                  isPrivate ? (
                    <ProtectedRoute isAllowed={isAdmin}>
                      {element}
                    </ProtectedRoute>
                  ) : (
                    element
                  )
                }
              />
            )
          })}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
