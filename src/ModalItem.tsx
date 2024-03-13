import {
    ModalCard,
    ModalPageHeader,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
interface User {
    "first_name": string,
    "last_name": string
}

function ModalItem({ id, onClose, activeModal }) {
    return (
        <ModalCard
            id={id}
            onClose={onClose}
            header={
                <ModalPageHeader>
                    Мои друзья
                </ModalPageHeader>
            }
        >
            <div style={{
                backgroundColor: 'var(--vkui--color_background_content)',
                borderRadius: 8,
                position: 'relative',
                padding: '12px',
            }}>
                Содержимое вашего модального окна
            </div>
        </ModalCard>
    );
}

export default ModalItem;