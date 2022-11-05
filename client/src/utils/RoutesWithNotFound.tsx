import { Route, Routes } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function PageNotFound() {
  return (
    <section style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h4>Sorry, we are working on this page.</h4>
      <p>You can comunicate with us and report this error</p>
    </section>
  )
}

function RoutesWithNotFound({ children }: Props) {
  return <Routes>{children}
    <Route path='*' element={<PageNotFound />} />
  </Routes>;
}

export default RoutesWithNotFound;
