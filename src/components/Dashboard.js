import React from 'react';

const Dashboard = props => {
    return(
        <div>
            <div>
                <h1>Dashboard</h1>
                <h1>Status: {props.loggedInStatus}</h1>
                <div>Email: {props.user.email}</div>
            </div>  
        </div>
    );
}

export default Dashboard;