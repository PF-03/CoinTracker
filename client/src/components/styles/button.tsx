import styled from 'styled-components'

type Props = {
    gradient?: boolean
}

const Button = styled.button<Props>` 
    color: white;
    cursor: pointer;
    min-width: 160px;
    padding: 8px 3rem;
    border-radius: 36px;
    border: none;
    font-weight: 600;
    background: ${props => props.gradient
        ? 'linear-gradient(270deg, #7745C8 0%, #B588FF 100%);'
        : 'rgba(63, 62, 62, 1)'
    };

    &:active {
        filter: brightness(0.9);
    }

    &:disabled {
        filter: brightness(.6);
        cursor: no-drop;
    }
`

export default Button;