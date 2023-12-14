import { css } from "styled-components";

import { bigSize } from "./fontSize";
import { mainRed } from "./colors";

type MediaSizeType = "large";

const mediaSize: Record<MediaSizeType, number> = {
    large: 1500,
};

const media = {
    large: `(max-width: ${mediaSize.large}px)`,
};

export const sortingMenuMedia = css`
    @media ${media.large} {
        display: none;
    }
`;

export const dateCardMedia = css`
    @media ${media.large} {
        width: 90%;
        height: 280px;

        margin: auto;

        font-size: ${bigSize};

        border: 2px solid ${mainRed};

        & + & {
            margin-top: 10%;
        }

        &#prevMonth,
        &#nextMonth {
            display: none;
        }
    }
`;

export const cardInfoMedia = css`
    @media ${media.large} {
        font-size: ${bigSize};

        & button svg {
            transform: scale(3);
        }
    }
`;

export const dateCardContainerMedia = css`
    @media ${media.large} {
        display: block;

        height: 100vh;

        overflow: scroll;
    }
`;

export const dayOfWeekCardContainerMedia = css`
    @media ${media.large} {
        display: none;
    }
`;

export const headerMedia = css`
    @media ${media.large} {
        & img {
            width: 10%;
            height: 100%;

            margin-right: 2%;
        }
    }
`;
