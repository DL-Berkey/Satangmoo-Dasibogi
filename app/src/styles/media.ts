import { css } from "styled-components";

import { bigSize, mediumSize } from "./fontSize";
import { mainRed } from "./colors";

type MediaSizeType = "small" | "medium" | "large";

export const mediaSize: Record<MediaSizeType, number> = {
    small: 500,
    medium: 1500,
    large: 1760,
};

const media = {
    small: `(min-width: ${mediaSize.small}px)`,
    medium: `(max-width: ${mediaSize.medium}px)`,
    large: `(max-width: ${mediaSize.large}px)`,
};

export const headerMedia = css`
    @media ${media.medium} {
        & img {
            width: 10%;
            height: 100%;

            margin-right: 2%;
        }
    }
`;

export const footerMedia = css`
    @media ${media.medium} {
        display: none;
    }
`;

export const NavigateMonthMedia = css`
    @media ${media.medium} {
        width: 12%;
    }
`;

export const datePickerMedia = css`
    @media ${media.medium} {
        width: 80%;

        font-size: ${mediumSize};
    }

    @media (${media.small}) and (${media.medium}) {
        width: 55%;
    }
`;

export const sortingMenuMedia = css`
    @media ${media.large} {
        width: 10%;

        & button {
            width: 40%;
        }

        & button svg {
            margin: 0 auto;
        }

        & button span {
            display: none;
        }
    }

    @media ${media.medium} {
        display: none;
    }
`;

export const dayOfWeekCardContainerMedia = css`
    @media ${media.medium} {
        display: none;
    }
`;

export const dateCardContainerMedia = css`
    @media ${media.medium} {
        display: block;

        height: 100%;
    }
`;

export const dateCardMedia = css`
    @media ${media.medium} {
        aspect-ratio: 16 / 9;

        margin: 0 auto;

        font-size: ${bigSize};

        border: 3px solid ${mainRed};
        border-radius: 10px;

        overflow: hidden;

        & + & {
            margin-bottom: 10%;
        }

        &#prevMonth,
        &#nextMonth {
            display: none;
        }

        &:not([videoid]) {
            display: none;
            background: red;
        }
    }
`;

export const cardInfoMedia = css`
    @media ${media.medium} {
        font-size: ${bigSize};

        & button svg {
            transform: scale(2);
        }
    }
`;

export const goUpButtonMedia = css`
    @media ${media.medium} {
        right: 5%;

        display: block;
    }
`;

export const emptyPageMedia = css`
    @media ${media.medium} {
        display: grid;
    }
`;
