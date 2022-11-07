import styled from "styled-components";

const Load = styled.div`
  background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
  margin: auto;
  margin-top: 4rem;
  width: 30vw;
  height: 30vw;
  animation: spinning 1.7s linear infinite;
  text-align: center;
  border-radius: 50%;
  filter: blur(4px);
  box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
  display: grid;
  align-self: center;

  & div {
    background-color: rgb(36, 36, 36);
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
  filter: blur(10px);
  }

  @keyframes spinning {
  to {
    transform: rotate(360deg);
  }
}
`

const Loading = () => <Load><div></div></Load>

export default Loading;