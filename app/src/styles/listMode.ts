import { css } from "styled-components";

export const dateCardContainerListMode = css`
    &.list {
        display: block;
        width: 60%;
        height: fit-content;

        margin: 0 auto;
        padding-top: 2%;
    }
`;

export const dateCardListMode = css`
    &.list {
        width: 90%;
        height: 24%;

        margin: 0 auto;

        border-radius: 10px;

        overflow: hidden;

        & + & {
            margin-top: 4%;
        }
    }
`;

export const cardInfoListMode = css`
    &.list {
        bottom: 0;
        right: 0;

        display: block;

        width: 5%;

        padding: 0;

        & button {
            float: right;

            width: 100%;

            padding: 25%;
        }

        & button svg {
            width: 100%;
            height: 100%;
        }
    }
`;

export const thumbnailListMode = css`
    &.list {
        width: 40%;
    }
`;

export const goUpButtonListMode = css`
    &.list {
        display: block;
    }
`;

export const emptyPageListMode = css`
    &.list {
        display: grid;
    }
`;
