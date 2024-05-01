import { Modal } from '../ui/Modal/Modal'

export const AuthModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>Форма регистрации</div>
        </Modal>
    )
}
