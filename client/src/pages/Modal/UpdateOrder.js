import React from "react";
import Button from "../../components/Button";
import { Content, Wrapper, ButtonLocal } from "./styles";

const UpdateStore = ({ setOpenModal }) => {
    return (
        <Wrapper>
            <Content>
                <h1>Update order</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>

                <h3>
                    <i>This feature is not supported!</i>
                </h3>

                <Button onClick={() => setOpenModal(false)} block>
                    I understand
                </Button>
            </Content>
        </Wrapper>
    );
};

export default UpdateStore;
