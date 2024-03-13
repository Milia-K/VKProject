import React, { useEffect, useState} from 'react';
import groups from './lib/groups.json';
import { GroupType } from './lib/Types'
import Loader from './Loader';
import {
Group, 
Header, 
FormItem, 
FormField, 
Select
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ContainerGroup from './ContainerGroup'


const ContainerMain: React.FC = () => {
    const [groupData, setGroupData] = useState<GroupType[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [filteredData, setFilteredData] = useState<GroupType[]>([]);
    const [filterParams, setFilterParams] = useState({
        color: '',
        type: 'all',
        friends: 'all'
    });
    const handleInputChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterParams({ ...filterParams, color: event.target.value });
    };
    const handleSelectChange = (key: string, value: string) => {
        setFilterParams({ ...filterParams, [key]: value });
    };
    const handleFilter = () => {
        const filteredData = groupData.filter(group => {
            let matchColor= true;
            if (filterParams.color) {
                matchColor = group.avatar_color && group.avatar_color.includes(filterParams.color);
            }            
            let matchType = true;
            if (filterParams.type !== 'all') {
                matchType = (filterParams.type === 'open' && !group.closed) || (filterParams.type === 'closed' && group.closed);
            }
            let matchFriends = true;
            if (filterParams.friends !== 'all') {
                matchFriends = (filterParams.friends === 'yes' && group.friends) || (filterParams.friends === 'no' && !group.friends);
            }
            return matchColor && matchType && matchFriends;
            
        });
        setFilteredData([...filteredData]);
    };
    const handleReset = () => {
        setFilteredData([]);
        setFilterParams({
            color: '',
            type: 'all',
            friends: 'all'
        });
    }
    useEffect(() => {
        setTimeout(() => {
            setGroupData(groups);
            setIsLoading(false);
        }, 1000);
    }, []); 
    return (
        <div className='containerMain'>
            <Header mode="primary">Мои группы</Header>
            <FormItem top="Цвет аватара">
                <FormField>
                <input
                type="text"
                placeholder='Введите цвет (in english please)'
                value={filterParams.color}
                onChange={handleInputChangeType}
                />
                </FormField>    
            </FormItem>
            <FormItem top="Тип сообщества">
            <Select
                value={filterParams.type}
                onChange={(e) => handleSelectChange('type', e.currentTarget.value)}
                options={[
                { label: 'Все', value: 'all' },
                { label: 'Открытое', value: 'open' },
                { label: 'Закрытое', value: 'closed' },
                ]}
            />
            </FormItem>
            <FormItem top="Друзья в сообществе">
            <Select
                value={filterParams.friends}
                onChange={(e) => handleSelectChange('friends', e.currentTarget.value)}
                options={[
                { label: 'Все', value: 'all' },
                { label: 'Есть', value: 'yes' },
                { label: 'Нет', value: 'no' },
                ]}
            />
            <button onClick={handleFilter}>поиск</button>
            <button onClick={handleReset}>сброс</button>
            </FormItem>
            {isLoading ? ( 
                <Loader />
            ) : ( <Group >
                <ContainerGroup groupData={filteredData.length !== 0? filteredData : groupData} />
                </Group>
            )}
        </div>
    )
}
export default ContainerMain