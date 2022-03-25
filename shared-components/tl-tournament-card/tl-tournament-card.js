import { LitElement, html, css } from 'lit';
import '@material/mwc-button';

import { LoggedUser } from '../tl-logged-user.js';
import '../tl-date-time-card/tl-date-time-card.js';
import { tournamentCardStyles } from './tl-tournament-card-css.js';

const tournaments = {
    9871203: {
        id: 9871203,
        calculated: true,
        currencyId: 52,
        created: 1647682020000,
        dateEnd: 1647867900000,
        dateStart: 1647838800000,
        updated: 1647682020000,
        description: 'Tournament description 3',
        fee: 100,
        name: 'Tournament name 3',
        prizeConfigurationType: 'FIXED_VALUE',
        prizeConfigurationDistribution: [
            { rank: 1, distribution: 50 },
            { rank: 2, distribution: 25 },
            { rank: 3, distribution: 15 },
            { rank: 4, distribution: 10 }
        ],
        registration: true,
        img: '/assets/tournament-img.png'
    },
    9957603: {
        id: 9957603,
        calculated: false,
        currencyId: 52,
        created: 1647858720000,
        dateEnd: 1647954300000,
        dateStart: 1647925200000,
        updated: 1647858720000,
        description: 'Tournament description 3',
        fee: 100,
        name: 'Tournament name 3',
        prizeConfigurationType: 'FIXED_VALUE',
        prizeConfigurationDistribution: [
            { rank: 1, distribution: 50 },
            { rank: 2, distribution: 25 },
            { rank: 3, distribution: 15 },
            { rank: 4, distribution: 10 }
        ],
        registration: true,
        img: '/assets/tournament-img-2.png'
    },
    9957604: {
        id: 9957604,
        calculated: false,
        currencyId: 52,
        created: 1647858720000,
        dateEnd: 1647954300000,
        dateStart: 1647925200000,
        updated: 1647858720000,
        description: 'Tournament description 4',
        fee: 100,
        name: 'Tournament name 4',
        prizeConfigurationType: 'FIXED_VALUE',
        prizeConfigurationDistribution: [
            { rank: 1, distribution: 50 },
            { rank: 2, distribution: 25 },
            { rank: 3, distribution: 15 },
            { rank: 4, distribution: 10 }
        ],
        registration: true,
        img: '/assets/tournament-img-3.png'
    },
    9957605: {
        id: 9957605,
        calculated: false,
        currencyId: 52,
        created: 1647858720000,
        dateEnd: 1647954300000,
        dateStart: 1647925200000,
        updated: 1647858720000,
        description: 'Tournament description 5',
        fee: 100,
        name: 'Tournament name 5',
        prizeConfigurationType: 'FIXED_VALUE',
        prizeConfigurationDistribution: [
            { rank: 1, distribution: 50 },
            { rank: 2, distribution: 25 },
            { rank: 3, distribution: 15 },
            { rank: 4, distribution: 10 }
        ],
        registration: true,
        img: '/assets/tournament-img.png'
    },
}
const currencies = {
    52: {
        id: 52,
        tenantId: 1,
        dateCreated: '2022-03-01T02:03:04.555555+01:00',
        dateUpdated: '2022-03-01T02:03:04.555555+01:00',
        name: 'In Game',
        symbol: 'Coin',
        description: 'In Game Currency',
        gameId: 1,
        currencyType: 'IN_GAME_CURRENCY',
        active: true
    },
}

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
        return [tournamentCardStyles,
            css`
                :host {
                    /* Temporary style before the task is officially tackled */
                    display: flex;
                    flex-direction: column;

                    align-items: center;
                    justify-content: center;
                    position: relative;
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
                    --mdc-typography-button-font-size: var(--button-large-label-font-size);
                    --mdc-typography-button-line-heightt: var(--button-large-label-line-height);
                    --mdc-typography-button-font-weight: var(--button-large-label-font-weight);
                    --mdc-typography-button-text-transform: none;
                    --mdc-typography-button-letter-spacing: none;
                }
            `,
        ];
    }

    constructor() {
        super();
        this.entityId = null;
        this._state = State.EMPTY;
        this.loggedUser = LoggedUser.getInstance();
    }

    _handleDetailsButton() {
        console.log('redirect will be implmented here');
        // TODO: implment page redirect, will most probably user an event to trigger the redirect
        // this.dispatchEvent(
        //     new CustomEvent('tournament-details-button-clicked', {
        //         bubbles: true,
        //         composed: true,
        //         details: {
        //             detail: {
        //                 tournament: this.tournament,
        //             },
        //         },
        //     })
        // );
    }

    async _fetchTournamentInformation(entityId) {
        this._state = State.LOADING;

        // const getTournamentResponse = await fetch(`${env.baseUrl}${env.tournamentServicePath}/${entityId}`, {
        //     method: 'GET',
        //     mode: 'cors',
        //     credentials: 'include',
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${LoggedUser.getInstance().getJWT()}`,
        //         'Content-Type': 'application/json',
        //     },
        //     redirect: 'follow',
        // });
        // // Report error
        // const status = getTournamentResponse.status;
        // if (status !== 200) {
        //     this._state = State.ERROR;
        //     return;
        // }
        // // Extract the tournament infos
        // this.tournament = await getTournamentResponse.json();

        // const getCurrencyResponse = await fetch(`${env.baseUrl}${env.currencyServicePath}/${entityId}`, {
        //     method: 'GET',
        //     mode: 'cors',
        //     credentials: 'include',
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${LoggedUser.getInstance().getJWT()}`,
        //         'Content-Type': 'application/json',
        //     },
        //     redirect: 'follow',
        // });
        // // Report error
        // const status = getCurrencyResponse.status;
        // if (status !== 200) {
        //     this._state = State.ERROR;
        //     return;
        // }
        // // Extract the currency infos
        // this.tournament.currency = await getCurrencyResponse.json();

        // TODO: implment the fetch to get the tournament data from the api
        this.tournament = tournaments[entityId];
        this.tournament.currency = currencies[this.tournament.currencyId];

        this._state = State.LOADED;

        return this.tournament;
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
        const options = { month: 'short', day: 'numeric' };

        var start = new Date(this.tournament.dateStart);
        var end = new Date(this.tournament.dateEnd);
        start = start.toLocaleDateString(undefined, options) + this._nth(start.getDate());
        end = end.toLocaleDateString(undefined, options) + this._nth(end.getDate());

        return start + ' - ' + end;
    }

    render() {
        switch (this._state) {
            case State.EMPTY:
                return html` <h4>default view</h4> `;
            case State.LOADING:
                return html` <h4>loading</h4> `;
            case State.LOADED:
                return html`
                    <div class="image-wrapper">
                        <tl-date-time-card id="date-time-card" icon = "/icons/date-icon.png" text="${this._formatDates()}"></tl-date-time-card>
                        <img class="tournament-img" src=${this.tournament.img} alt="Tournament">
                    </div>
                    <div class="tournament-wrapper">
                        <div class="tournament-details">
                            <div class="tournament-head" >
                                <h4>${this.tournament.name}</h4>
                                <!-- FIXME: change the value of the substring to match official given value -->
                                <div class="paragraph-large">${this.tournament.description.substring(0, 30)}</div>
                            </div>
                            <div class="prize-wrapper">
                                <!-- FIXME: show real prize amount -->
                                <!-- FIXME: use the localization API to generate the plural of the currency symbol -->
                                <span class="paragraph-large">Prize money</span>
                                <div><h5>${this.tournament.fee}&nbsp;${this.tournament.currency.symbol}s</h5></div>
                            </div>
                        </div>
                        <mwc-button class="details-button button-label-large" label="Details" outlined @click="${(event) => this._handleDetailsButton(event)}"></mwc-button>
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
}

customElements.define('tl-tournament-card', TournamentCard);
