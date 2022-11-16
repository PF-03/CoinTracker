import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import st from './HelpUsMail.module.css'
import s from '../../styles/styles.module.css'
import { getReviews } from '../../../redux/actions/index'
import ReviewCard from '../../Review/ReviewCard'
import Bubble from '../../styles/bubbles'


export default function HelpUsMail() {

    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(getReviews());
    }, [dispatch, getReviews]);

    const messages = useSelector((state: any) => state.reviews)

    console.log(messages)

    return (

        <div className={st.Container}>
            <h3 className={st.title}> Feedback Mail  </h3>
            <Bubble size='large' color='red' right='10%' />
            <div className={st.listMessages}>
                {messages && messages.map((item: review, index: number) => <ReviewCard username={item.user} rate={item.calification} message={item.comment} />).reverse()}
            </div>
        </div>
    )
}
