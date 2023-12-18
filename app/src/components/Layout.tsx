import styled from "styled-components";

import { FaGithub } from "react-icons/fa";

import logoimg from "/togethertangmoo.png";
import Calendar from "./calendar/Calendar";
import { gray, mainRed } from "@/styles/colors";
import { logo, mediumSize, smallSize } from "@/styles/fontSize";
import { footerMedia, headerMedia } from "@/styles/media";

const Layout = () => {
    return (
        <>
            <Header>
                <img src={logoimg} alt="logo_image" />
                <h1>사탕무 다시보기</h1>
            </Header>
            <Main>
                <Calendar />
            </Main>
            <Footer>
                <p>영상에 대한 모든 저작권은 사탕무님께 있습니다.</p>
                <div>
                    <span>버전 1.0.0</span>
                    <span>
                        <a
                            href="https://github.com/DL-Berkey/Satangmoo-Dasibogi"
                            target="_blank"
                        >
                            <FaGithub />
                        </a>
                    </span>
                </div>
            </Footer>
        </>
    );
};

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 1%;

    height: 8vh;

    margin-bottom: 1vh;
    padding: 0 2%;

    font-weight: bold;
    color: ${mainRed};

    border-bottom: 3px solid ${gray};

    & img {
        width: 2%;
        height: 100%;

        object-fit: contain;
    }

    h1 {
        font-size: ${logo};
    }

    ${headerMedia};
`;

const Main = styled.main`
    padding: 0 10%;
`;

const Footer = styled.footer`
    position: relative;

    margin: 0 11%;
    padding: 1% 0;

    ${footerMedia};

    & p {
        width: fit-content;

        margin: 0 auto;

        color: ${mainRed};

        font-size: ${mediumSize};
    }

    & div {
        position: absolute;
        top: 50%;
        left: 0;

        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 7%;

        transform: translateY(-50%);

        font-size: ${smallSize};
    }

    & div span a {
        display: grid;
        place-items: center;
    }
`;

export default Layout;
