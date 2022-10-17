import styled from "styled-components";

export const Wrapper = styled.div`
    .predict {
        text-align: center;
        margin-top: 20px;
        color: #027581;
        font-size: 1.3rem;
    }

    .predict-chart {
        width: 95% !important;
        margin: 0 auto;
        margin-bottom: 25px;
    }
`;

export const GridTwo = styled.div`
    display: grid !important;
    grid-template-columns: 2fr 1fr;
    grid-gap: 2rem;
    margin-top: 15px;
    div {
        margin-bottom: 15px;
    }
`;

export const OptionField = styled.div`
    width: 50%;
    margin-top: 15px;
    margin-left: 25px;
`;

export const Title1 = styled.h3`
    margin-bottom: 15px;
`;
