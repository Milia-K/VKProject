import Modal from 'react-modal';
Modal.setAppElement('#root');
import {
    Header,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
interface FriendsModalProps {
    isOpen: boolean;
    friends: { first_name: string; last_name: string }[];
    closeModal: () => void;
}


const FriendsModal: React.FC<FriendsModalProps> = ({ isOpen, friends, closeModal }) => {
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={closeModal}>
            <Header mode="secondary">Мои друзья в сообществе</Header>
            {friends.map((friend, index) => (
                <p key={index}>{friend.first_name} {friend.last_name}</p>
            ))}
            <button onClick={closeModal}>Закрыть</button>
        </Modal>
    );
};

export default FriendsModal;
