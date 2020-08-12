import React from 'react';
import { data } from './UserData';
import User from './User';
import './Users.css';

function Users() {
    return (
        <div className="users">
            {data.members.map((user) => (
                <User key={user.id} user={user} />
            ))
            }

        </div>
    )
}

export default Users;