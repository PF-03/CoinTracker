import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CarouselNews from '../../components/crousel-news/carousel';
import Bubble from '../../components/styles/bubbles';
import s from './news.module.css'

type Prop = {
    img: string
}

const Card = styled.div<Prop>`
border-radius: 1rem;
width: 280px;
height: 300px;
backdrop-filter: blur(8px);
background-color: rgba(63, 63, 63, 0.54);
position: relative;

& article {
    padding: 0 2rem;

    a {
        text-decoration: none;
        color: white;

        h5 {
            font-size: 20px;
            margin: 0;
            margin-top: 2rem;
        }

        p {
            opacity: .5;
        }

        p, h5 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}

& div {
    width: 100%;
    height: 30%;
    background: center url(${props => props.img});
    background-size: cover;
    background-repeat: no-repeat;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;

}
`

const NewCard = ({ title, image, url, description }) => (
    <Card img={image}>
        <div>{/*This is a image */}</div>
        <article>
            <a href={url}>
                <h5>{title}</h5>
                <p>{description}</p>
            </a>
        </article>
    </Card>
)

function News() {
    const news = useSelector((state: state) => state.newsAll.slice(10));

    return (
        <main className={s.container}>
            <Bubble size='small' left={'17vw'} bottom='10vh' />
            <Bubble color='red' right={0} size='medium' />
            <h4 className={s.title}>Most Relevant News</h4>
            <section>
                <CarouselNews />
            </section>

            <h4 className={s.title}>News that may interest you.</h4>
            <section className={s.allNews}>
                {news.map((item: newsCard) => <NewCard title={item.title} image={item.image} url={item.url} description={item.description} />)}
            </section>
        </main>
    );
}

export default News;