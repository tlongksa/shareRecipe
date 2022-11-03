import React, { useEffect, useState } from 'react';
import { getUserBmiListRequest } from '../../api/requests';

const User = () => {
    const [listUsers, setListUsers] = useState([]);

    const fetchBmiUserInfo = async () => {
        const { data } = await getUserBmiListRequest();
        setListUsers(data?.data || []);
    };

    useEffect(() => {
        fetchBmiUserInfo();
    }, []);

    return (
        <div className="demo">
            {listUsers?.map((item, index) => (
                <div className="child" key={item.User}>
                    {item.email}
                </div>
            ))}
        </div>
    );
};

export default User;
