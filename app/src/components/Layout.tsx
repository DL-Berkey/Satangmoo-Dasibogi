import styled from "styled-components";

import logoimg from "/logoImg.jpg";
import { gray, mainRed } from "@/styles/colors";
import { logo } from "@/styles/fontSize";

const Layout = () => {
    return (
        <>
            <Header>
                <img src={logoimg} alt="logo_image" />
                <span>사탕무 다시보기</span>
            </Header>
            <Main />
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

    font-size: ${logo};
    font-weight: bold;
    color: ${mainRed};

    border-bottom: 3px solid ${gray};

    & img {
        width: 2%;
        height: 100%;

        object-fit: contain;
    }
`;

const Main = styled.main`
    height: 90%;

    padding: 0 3%;
`;

export default Layout;
