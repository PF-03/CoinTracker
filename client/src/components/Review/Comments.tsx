import style from "./Comments.module.css";
import comments from "./dummyComment";
import ReviewCard from "./ReviewCard";



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
