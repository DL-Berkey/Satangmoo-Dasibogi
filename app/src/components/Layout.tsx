import styled from "styled-components";

import logoimg from "/togethertangmoo.png";
import Calendar from "./Calendar";
import { gray, mainRed } from "@/styles/colors";
import { logo } from "@/styles/fontSize";
import { headerMedia } from "@/styles/media";

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
        </>
    );
};

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 1%;

    height: 8%;

    margin-bottom: 1%;
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
    height: 90%;

    padding: 0 10%;
`;

export default Layout;
