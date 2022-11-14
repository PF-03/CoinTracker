import styled from 'styled-components';

type Props = {
  size?: 'large' | 'medium' | 'small';
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
  color?: 'purple' | 'blue-light' | 'blue-dark' | 'red';
};
const Bubble = styled.div<Props>`
    z-index: -1;
    position: absolute;
    border-radius: 100%;
    width: ${props => props.size === 'large' ? '560px' : props.size === 'medium' ? '315px' : props.size === 'small' ? '162px' : '676px'};
    height: ${props => props.size === 'large' ? '560px' : props.size === 'medium' ? '315px' : props.size === 'small' ? '162px' : '676px'};
    left: ${props => props.left ?? 'auto'};
    top: ${props => props.top ?? 'auto'};
    right: ${props => props.right ?? 'auto'};
    bottom: ${props => props.bottom ?? 'auto'};
    animation: moving ${props => props.size === 'large' ? '6s' : props.size === 'medium' ? '4s' : props.size === 'small' ? '5s' : '12s'} ease-in-out infinite!important;
    animation-delay: ${props => props.size === 'large' ? '2s' : props.size === 'medium' ? '4s' : props.size === 'small' ? '5s' : '12s'};


  background: ${(props) =>
    props.color === 'red'
      ? 'radial-gradient(76.75% 76.75% at 70% 23.25%, #E7CE4A 0%, #E64467 100%);'
      : props.color === 'blue-dark'
        ? 'radial-gradient(81.25% 81.25% at 67.32% 18.75%, #17B3A9 0%, #0945DF 100%);'
        : props.color === 'blue-light'
          ? 'radial-gradient(81.25% 81.25% at 67.32% 18.75%, #BCEEEB 0%, #5378D9 100%);'
          : props.color === 'purple'
            ? ' radial-gradient(177.68% 177.68% at 74.11% 24.64%, #6D0BA9 0%, #DF0909 100%);'
            : 'radial-gradient(76.75% 76.75% at 70% 23.25%, #8FE74A 0%, #44E6B5 100%);'};

    @keyframes moving {
        0% {
          transform: translateY(0) rotate(0);
        }
        50% {
          transform: translateY(${props => props.size === 'large' ? '2%' : props.size === 'medium' ? '5%' : props.size === 'small' ? '10%' : '15%'}) rotate(45deg);

        }
        100% {
          transform: translateY(0) rotate(0);
        }
    }
`;

export default Bubble;
