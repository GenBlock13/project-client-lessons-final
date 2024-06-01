import { useNavigate } from 'react-router-dom'
import { Button } from '../../'

export const LinkButton = ({to, children, variant}) => {
    const navigate = useNavigate()
  return (
    <Button 
        onClick={() => navigate(to)}
        variant={variant}
    >
        {children}
    </Button>
  )
}
