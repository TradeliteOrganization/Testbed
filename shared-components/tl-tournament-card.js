import { LitElement, html, css } from 'lit';
import '@material/mwc-button';

import { LoggedUser } from './tl-logged-user.js';

const tournaments = {
    '(trn)2022-04-15-retail-636546': {
        id: '(trn)2022-04-15-retail-636546',
        title: 'Retail market',
        description: 'Identify the trends among the retail companies and submit your predictions',
        timeZone: 'CET',
        registrationStart: '2022-04-09T07:00Z',
        registrationEnd: '2022-04-12T07:00Z',
        activityStart: '2022-04-09T07:00Z',
        activityEnd: '2022-04-15T18:00Z',
        prizeDistribution: {
            type: 'fixed',
            currencyId: 'mglnd-gold',
            totalValue: 10,
            shareBetweenTies: true,
            distribution: [
                2000, 1000, 500, 300, 200, 100, 100, 100, 100, 100, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 50, 50, 50, 50,
                50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25
            ],
            spreadRest: false
        },
    },
    '(trn)2022-04-15-techno-955159': {
        id: '(trn)2022-04-15-techno-955159',
        title: 'Technology market',
        description: 'Identify the trends among the technology companies and submit your predictions',
        timeZone: 'CET',
        registrationStart: '2022-04-09T07:00Z',
        registrationEnd: '2022-04-12T07:00Z',
        activityStart: '2022-04-09T07:00Z',
        activityEnd: '2022-04-15T18:00Z',
        ruleId: 'mglnd-tournament-rule-2022-04-14',
        sponsorIds: [],
        assets: {
            heroImgCard: 'https://cdn.mogaland.io/assets/data-related/tournament/2022-04-15-techno-955159-400x200.png'
        },
        registrationFee: {
            value: 0,
            currencyId: 'mglnd-coin'
        },
        prizeDistribution: {
            type: 'fixed',
            currencyId: 'mglnd-gold',
            totalValue: 10,
            shareBetweenTies: true,
            distribution: [
                2000, 1000, 500, 300, 200, 100, 100, 100, 100, 100, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 50, 50, 50, 50,
                50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25
            ],
            spreadRest: false
        },
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
        return [
            css`
                :host {
                    /* Temporary style before the task is officially tackled */
                    display: flex;
                    flex-direction: column;

                    align-items: center;
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
        //
        // 3. To be update with a proposal to interact with a router that is listening
        //
    }

    async _fetchTournamentInformation(entityId) {
        //
        // 2. To be replaced with live code
        //
        this._state = State.LOADING;

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
                //
                // 1. To be reorganized and styled
                //
                return html`
                    <h4>Title: ${this.tournament.title}</h4>
                    <div class="paragraph-large">Short description: ${this.tournament.description.substring(0, 30)}</div>
                    <div class="paragraph-medium">Event dates: ${this._formatDates()}</div>
                    <div class="paragraph-large">Prize: <img src="https://cdn.mogaland.io/assets/currency/mglnd-coin-x1.svg" height="25" width="25"> ${this.tournament.prizeDistribution.totalValue}</div>
                    <mwc-button class="details-button button-label-large" label="Details" outlined @click="${(event) => this._handleDetailsButton(event)}"></mwc-button>
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
