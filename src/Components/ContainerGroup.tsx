import React, {useState}  from 'react';
import FriendsModal from './FriendsModal';
import { GroupType, User } from './lib/Types'
import {
    Header,
    Avatar,
    SimpleCell,
    Separator,
    Spacing,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
interface ContainerProps {
    groupData: GroupType[];
}


const ContainerGroup: React.FC<ContainerProps> = ({ groupData}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
    const openModal = (friends: User[]) => {  
        setSelectedFriends(friends);  
        setModalIsOpen(true);  
    };     
    return (
        <div>
        {groupData.map((group) => (
            <div key={group.id} >
                <SimpleCell className='info' before={<Avatar size={100} style={{ backgroundColor: group.avatar_color}} />}> 
                    <Header mode="secondary">{group.name}</Header> 
                    <p>
                        {group.closed === true ? 'Закрытое сообщество' : 'Открытое сообщество'}
                    </p>
                    <p>
                        {group.members_count}{' '}
                        {group.members_count % 10 === 1 && group.members_count % 100 !== 11 ? 'подписчик' :
                        group.members_count % 10 >= 2 && group.members_count % 10 <= 4 && (group.members_count % 100 < 10 || group.members_count % 100 >= 20) ? 'подписчика' :
                        'подписчиков'}
                    </p>
                    <div className='friends'onClick={() => group.friends && openModal(group.friends)}>
                        {group.friends ? `${group.friends.length} друзей в сообществе` : ''}
                    </div> 
                </SimpleCell>
            <Spacing size={24}>
                <Separator />
            </Spacing>
            </div>
        ))}
        <FriendsModal
        isOpen={modalIsOpen}
        friends={selectedFriends}
        closeModal={() => setModalIsOpen(false)}
        />
    </div>
);
}

export default ContainerGroup;
