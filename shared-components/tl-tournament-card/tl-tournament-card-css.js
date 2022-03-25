import { css } from 'lit';

export const tournamentCardStyles = css`
    .details-button {
        justify-content: center;
        align-items: center;
        width: 10em;
        min-height: 4em;
    }
    .image-date-wrapper {
        position: relative;
    }
    #date-time-card {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0 3.6em;
        z-index: 1;
    }
    .tournament-img {
        position: absolute;
        top: 0;
        margin-top: 1em;
        width: 100%;
    }
    .prize-wrapper {
        display: grid; 
        grid-template-columns: repeat(2, 1fr);
    }
    .prize-wrapper div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: #7644B5;
        border-radius: 4em;
        min-width: 8.7em;
        min-height: 2.6em;
    }
    .prize-wrapper div h5 {
        font-size: var(--header-5-font-size);
        font-weight: var(--header-5-font-weight);
        line-height: 1.4em;
        margin: 0;
    }
    .prize-wrapper span {
        display: inline-flex;
        align-items: center;
    }
    .tournament-head {
        margin-bottom: 2.4em;
    }
    .tournament-head h4 {
        margin:0;
    }
    .tournament-wrapper {
        min-height: 11.1em; 
        min-width: 93%; 
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
    }
    .image-wrapper {
        width: 100%; 
        min-height: 22.2em;
    }

    @media all and (max-width: 400px) {
        .image-wrapper {
            min-height: 19.2em;
        }
    }
    @media all and (max-width: 300px) {
        .image-wrapper {
            min-height: 15.2em;
        }
    }
`;