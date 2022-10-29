import s from '../styles/styles.module.css'
import styled from 'styled-components'

const ThisCard  = styled.div<Props>`
display: flex;
    height: 16rem;
    width: 26rem;

    & div {
        height: 100%;
        min-width: 40%;
        border-radius: 16px;
        background-position: center;
        background-image: url(${props => props.img});
        background-size: cover;
    }

    & h6 {
        font-size: 22px;
    }

    & :not(div) {
        margin: 1.3rem 1rem;
    }
`
type Props = {
    img: string
}
export default function NewsCard({_id, image, name, title}: newsCard) {

    return(
        <ThisCard img={image} key={_id} className={s.card}>
                <div></div>
                <h6>{title}</h6>
        </ThisCard>
    )
}