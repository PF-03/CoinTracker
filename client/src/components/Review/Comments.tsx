import style from "./Comments.module.css";
import s from "../styles/styles.module.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from "styled-components";
import comments from "./dummyComment";

const Card = styled.article`
  width: 300px;
  min-height: 150px;
  background: rgba(219, 219, 219, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  padding: 1rem 2rem;
  & h6 {
    margin: .4rem 0;
  }
  & p {
    opacity: .3;
    display: inline-block;
  }
  & div {
    display: flex;
    align-items: center;
    b {
      margin-top: 4px;
      font-size: 14px;
      opacity: .5;
    }
  }
`
const ReviewCard = ({ username, rate, message }) => (
  <Card>
    <h6>{username}</h6>
    <div>
      <svg fill='rgb(255, 192, 4)' xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m5.062 18 1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062Z" /></svg>
      <b>{rate}</b>
    </div>


    <p>{message}</p>
  </Card>
)

const Comments = () => {
  return (
    <div>
      <h3 className={style.title}>See what people say about us.</h3>
      <div className={style.container}>
        {comments.map(item => <ReviewCard username={item.username} rate={item.rate} message={item.message} />)}
      </div>
    </div>
  );
};
export default Comments;
