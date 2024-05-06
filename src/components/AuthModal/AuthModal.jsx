import { Modal } from '../ui/Modal/Modal'
import { AuthForm } from '../AuthForm/AuthForm'

export const AuthModal = ({ formType, isOpen, onClose }) => {
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <AuthForm formType={formType} />
        </Modal>
    )
}
