import React, { useContext, useState, useEffect } from 'react';
import { myContext } from '../../Context';

export const DemoWelcome = () => {
  const userData = useContext(myContext);

  const [data, setData] = useState({});

  useEffect(() => {
    if (userData) setData(userData);
  });

  return (
    <div>
      {data.username ? <h1>Welcome {userData.username}</h1> : <h1>Welcome</h1>}
    </div>
  );
};
