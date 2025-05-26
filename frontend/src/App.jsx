import { useState, useEffect, Fragment, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'
import Default from './components/Default/Default'
import { routes } from './routes/routes'

function App() {
  const [user, setUser] = useState({ isAdmin: false })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Lỗi khi parse user từ localStorage:', error)
      }
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, page: Page, isPrivate, isShowHeader }, idx) => {
            const Layout = isShowHeader ? Default : Fragment

            return (
              <Route
                key={idx}
                path={path}
                element={
                  isPrivate && !user.isAdmin ? (
                    <Navigate to="/unauthorized" replace />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
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
