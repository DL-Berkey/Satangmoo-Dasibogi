import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logoimg from "/togethertangmoo.png";

import loginModalAtom from "@/recoil/loginModalAtom";
import useAccount from "@/hooks/useAccount";
import { gray, mainRed } from "@/styles/colors";
import { logo, mediumSize } from "@/styles/fontSize";
import { headerMedia } from "@/styles/media";

const Header = () => {
    const setLoginModal = useSetRecoilState(loginModalAtom);

    const { userDataQuery, logout } = useAccount();
    const userData = userDataQuery.data;

    const onClick = () => {
        setLoginModal(true);
    };

    return (
        <Wrapper>
            <img src={logoimg} alt="logo_image" />
            <h1>사탕무 다시보기</h1>
            <Menu>
                <ul>
                    {userData !== null ? (
                        <li>
                            <button onClick={logout}>로그아웃</button>
                        </li>
                    ) : (
                        <li>
                            <button onClick={onClick}>로그인</button>
                        </li>
                    )}
                    <li>
                        <Link to="/">북마크</Link>
                    </li>
                    <li>
                        <Link to="/">기록</Link>
                    </li>
                </ul>
            </Menu>
        </Wrapper>
    );
};

const Wrapper = styled.header`
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

const Menu = styled.div`
    flex-grow: 1;

    margin-left: 5%;

    font-size: ${mediumSize};
    color: black;

    & ul {
        display: flex;
        gap: 3%;

        list-style: none;
    }

    & ul li {
        border-bottom: 2px solid ${mainRed};
    }

    & ul li button {
        font-size: ${mediumSize};
    }

    & ul li a {
        font-weight: normal;
    }
`;

export default Header;
