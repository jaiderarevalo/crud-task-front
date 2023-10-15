
import { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'

const Protected = ({ children }: { children: ReactElement }) => {
    const { isLogin } = useSelector((root: RootState) => root.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogin) navigate('/login')
    }, [isLogin])
    return (
        <>
            {children}
        </>
    )
}

export default Protected