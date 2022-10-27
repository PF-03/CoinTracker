import { createContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const myContext = createContext({});

export const Context = (props: any) => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    axios
      .get('http://localhost:3001/googleauth/getuser', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        if (res.data) {
          setUserData(res.data);
        }
      });
  }, []);

  axios;

  return (
    <myContext.Provider value={userData}>{props.children}</myContext.Provider>
  );
};
