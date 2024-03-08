import { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { FaGoogle } from "react-icons/fa";

import loginModalAtom from "@/recoil/loginModalAtom";
import useAccount from "@/hooks/useAccount";
import heart from "@/assets/hearttangmoo.png";

const LoginModal = () => {
    const [loginModal, setLoginModal] = useRecoilState(loginModalAtom);

    const { login } = useAccount();

    const portal = document.getElementById("root");

    const onBlur = (e: MouseEvent<HTMLElement>) => {
        if (e.target !== e.currentTarget) {
            return;
        }

        setLoginModal(false);
    };

    return (
        <>
            {loginModal &&
                portal &&
                createPortal(
                    <Wrapper onClick={onBlur}>
                        <Section>
                            <Title>
                                <img src={heart} />
                                <span>로그인</span>
                            </Title>
                            <ButtonContainer>
                                <GoogleLoginButton onClick={login}>
                                    <FaGoogle />
                                    <span>구글 로그인</span>
                                </GoogleLoginButton>
                            </ButtonContainer>
                        </Section>
                    </Wrapper>,
                    portal
                )}
        </>
    );
};

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;

    width: 100vw;
    height: 108vh;

    background: rgba(0, 0, 0, 0.6);

    &:hover {
        cursor: pointer;
    }
`;

const Section = styled.section`
    position: fixed;

    width: 15%;
    height: 20%;

    padding: 1%;

    background: white;
    border-radius: 8%;

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.3);

    &:hover {
        cursor: default;
    }
`;

const Title = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;

    height: 30%;

    & img {
        position: absolute;
        left: 10%;

        width: 20%;
    }

    & span {
        font-size: ${({ theme }) => theme.fontSize.big};
    }
`;

const ButtonContainer = styled.div`
    display: grid;
    place-items: center;

    height: 70%;
`;

const GoogleLoginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6%;

    width: 10vw;
    height: 6vh;

    background: ${({ theme }) => theme.color.mainRed};
    border-radius: 4%;

    & svg {
        transform: scale(2);

        fill: white;
    }

    & span {
        font-size: ${({ theme }) => theme.fontSize.medium};
        color: white;
    }
`;

export default LoginModal;
