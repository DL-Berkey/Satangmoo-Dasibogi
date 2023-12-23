import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { FaGithub } from "react-icons/fa";

import Header from "./Header";
import { mainRed } from "@/styles/colors";
import { mediumSize, smallSize } from "@/styles/fontSize";
import { footerMedia } from "@/styles/media";

const Layout = () => {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
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
