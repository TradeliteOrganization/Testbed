import { LitElement, html, css } from 'lit';
import '@material/mwc-button';

import { LoggedUser } from './tl-logged-user.js';

const State = {
    EMPTY: 'emtpy',
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error',
};

export class TournamentCard extends LitElement {
    static properties = {
        entityId: {
            type: 'string',
            attribute: 'entity-id',
            reflect: true,
        },
        _state: {
            state: true,
            attribute: 'state',
            type: 'string',
            reflect: false,
        },
        currency: {
            type: 'Object',
            reflect: false,
        },
        tournament: {
            type: 'Object',
            reflect: false,
        },
    };

    static get styles() {
        return [
            css`
                :host {
                /* Temporary style before the task is officially tackled */
                display: flex;
                flex-direction: column;
                padding: 2rem;
                min-height: 10rem;
                height: auto !important;
                justify-content: center;
                }
                h4 {
                font-size: var(--header-4-font-size);
                font-weight: var(--header-4-font-weight);
                line-height: var(--header-4-line-height);
                }

                .paragraph-large {
                font-size: var(--paragraph-medium-font-size);
                line-height: var(--paragraph-medium-line-height);
                font-weight: var(--paragraph-medium-font-weight);
                }

                .paragraph-medium {
                font-size: var(--paragraph-medium-font-size);
                line-height: var(--paragraph-medium-line-height);
                font-weight: var(--paragraph-medium-font-weight);
                }

                mwc-button[outlined] {
                --mdc-shape-small: 2rem;
                --mdc-theme-on-primary: white;

                --mdc-button-disabled-fill-color: #7644b5;
                --mdc-button-disabled-outline-color: var(--mdc-theme-primary);

                filter: drop-shadow(0px 1px 23px #b973e0);
                --mdc-theme-primary: null;
                --mdc-button-outline-color: #c078e4;
                }

                .button-label-large {
                --mdc-typography-button-font-family: var(--font-family);
                --mdc-typography-button-font-size: var(
                    --button-large-label-font-size
                );
                --mdc-typography-button-line-heightt: var(
                    --button-large-label-line-height
                );
                --mdc-typography-button-font-weight: var(
                    --button-large-label-font-weight
                );
                --mdc-typography-button-text-transform: none;
                --mdc-typography-button-letter-spacing: none;
                }

                .card-header {
                position: relative;
                }

                .card-image {
                width: 100%;
                height: 20rem;
                border: 2px solid rgba(34, 45, 56, 0.5);
                border-radius: 2rem;
                object-fit: cover;
                }

                .card-active-date {
                position: absolute;
                top: 0;
                right: 2.5rem;
                transform: translate(0, -50%);
                border-radius: 255px;
                padding: 0 1rem;
                background-color: #00ffe6;
                color: black;
                display: flex;
                align-items: center;
                gap: 4px;
                }

                .card-active-date > .cal-icon {
                --mdc-icon-size: 14px;
                }

                .card-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                }

                .card-content {
                margin-top: 1rem;
                }

                .card-content > h4 {
                margin: 0;
                }

                .card-price {
                margin-top: 2rem;
                display: flex;
                column-gap: 1rem;
                align-items: center;
                }

                .in-game-money {
                display: flex;
                padding: 2px 10px 2px 30px;
                border-radius: 255px;
                //   background-color: var(--video-overlay-color);
                background-color: #7843b0; // it can be defined in the theme.css file as a variable
                justify-content: center;
                position: relative;
                }

                .in-game-money:before {
                    position: absolute;
                    left: 2px;
                display: inline-block;
                content: '';
                width: 20px;
                height: 20px;
                background-image: url('https://cdn.mogaland.io/assets/currency/mglnd-coin-x1.svg');
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                }
            `,
        ];
    }

    constructor() {
        super();
        this.entityId = null;
        this._state = State.EMPTY;
        this.loggedUser = LoggedUser.getInstance();
        this._timeOut = null;
    }

    _handleDetailsButton() {
        console.log('redirect will be implmented here');
        //
        // 3. To be update with a proposal to interact with a router that is listening
        //
        const event = new CustomEvent('tl-tournament-card-detail', { bubbies: true, composed: true, detail: this.tournament })
        this.dispatchEvent(event);
    }

    async _fetchTournamentInformation(entityId) {
        //
        // 2. To be replaced with live code
        //
        this._state = State.LOADING;
        const data = await fetch(`../data/${entityId}.json`).then((res) =>
            res.json()
        );
        this.tournament = data;

        this._timeOut = setTimeout(() => {
            this._state = State.LOADED;
        }, 1000);
    }

    _nth(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }

    _formatDates() {
        const options = {
            month: 'short',
            day: 'numeric',
        };

        var start = new Date(this.tournament.activityStart);
        var end = new Date(this.tournament.activityEnd);
        start =
            start.toLocaleDateString('en-US', options) + this._nth(start.getDate());
        end = end.toLocaleDateString('en-US', options) + this._nth(end.getDate());

        return start + ' - ' + end;
    }

    render() {
        switch (this._state) {
            case State.EMPTY:
                return html` <h4>default view</h4> `;
            case State.LOADING:
                return html` <h4>loading</h4> `;
            case State.LOADED:
                //
                // 1. To be reorganized and styled
                //
                return html`
                    <div class="card-header">
                        <img
                        class="card-image"
                        src="https://www.localrevibe.com/wp-content/uploads/2020/08/IMG_0248.0.0.jpg"
                        alt=""
                        />
                        <div class="paragraph-medium card-active-date">
                        <mwc-icon class="cal-icon">calendar_today</mwc-icon>
                        ${this._formatDates()}
                        </div>
                    </div>
                    <div class="card-container">
                        <div class="card-content">
                        <h4>${this.tournament.title}</h4>
                        <div class="paragraph-large">${this.tournament.description}</div>
                        <div class="paragraph-large card-price">
                            Prize money:
                            <span class="in-game-money">
                                ${this.tournament.prizeDistribution.totalValue}
                            </span>
                        </div>
                        </div>
                        <mwc-button
                        class="details-button button-label-large"
                        label="Details"
                        outlined
                        @click="${(event) => this._handleDetailsButton(event)}"
                        ></mwc-button>
                    </div>
                `;
            case State.ERROR:
                return html` <h4>error</h4> `;
        }
    }

    willUpdate() {
        if (this.entityId !== null && this._state === State.EMPTY) {
            this._fetchTournamentInformation(this.entityId);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this._timeOut);
    }
}

customElements.define('tl-tournament-card', TournamentCard);
