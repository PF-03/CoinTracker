import {Route,  Routes } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function RoutesWithNotFound({ children }: Props) {
  return <Routes>{children}
    <Route path = '*' element = {<h3>Page Not Found</h3>}/>
  </Routes>;
}

export default RoutesWithNotFound;
