import { LitElement, html, css} from "lit";
import "@material/mwc-button";

import { LoggedUser } from "./tl-logged-user.js";
import "../shared-components/tl-tournament-countdown.js";

const tournaments = {
    9871203: {
        id: 9871203,
        calculated: true,
        currencyId: 52,
        created: 1647682020000,
        dateEnd: 1648217710000,
        dateStart: 1648217401000,
        updated: 1647682020000,
        description: "Tournament 3",
        fee: 100,
        name: "T3",
        prizeConfigurationType: "FIXED_VALUE",
        prizeConfigurationDistribution: [
            { rank: 1, distribution: 50 },
            { rank: 2, distribution: 25 },
            { rank: 3, distribution: 15 },
            { rank: 4, distribution: 10 },
        ],
        registration: true,
        eventImage:
            "https://images.unsplash.com/photo-1633545491399-54a16aa6a871?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    },
    9957603: {
        id: 9957603,
        calculated: false,
        currencyId: 52,
        created: 1647858720000,
        dateEnd: 1648380181000,
        dateStart: 1648293781000,
        updated: 1647858720000,
        description: "Tournament 3",
        fee: 100,
        name: "T3",
        prizeConfigurationType: "FIXED_VALUE",
        prizeConfigurationDistribution: [
            { rank: 1, distribution: 50 },
            { rank: 2, distribution: 25 },
            { rank: 3, distribution: 15 },
            { rank: 4, distribution: 10 },
        ],
        registration: true,
        eventImage:
            "https://images.unsplash.com/photo-1636036798069-195bd06f340c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    },
};
const currencies = {
    52: {
        id: 52,
        tenantId: 1,
        dateCreated: "2022-03-01T02:03:04.555555+01:00",
        dateUpdated: "2022-03-01T02:03:04.555555+01:00",
        name: "In Game",
        symbol: "Coin",
        description: "In Game Currency",
        gameId: 1,
        currencyType: "IN_GAME_CURRENCY",
        active: true,
    },
};

const State = {
    EMPTY: "emtpy",
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error",
};

export class TournamentCard extends LitElement {
    static properties = {
        entityId: {
            type: "string",
            attribute: "entity-id",
            reflect: true,
        },
        _state: {
            state: true,
            attribute: "state",
            type: "string",
            reflect: false,
        },
        currency: {
            type: "Object",
            reflect: false,
        },
        tournament: {
            type: "Object",
            reflect: false,
        },
        _currentCurrency: {
            type: "string",
            state: true,
        }
    };

    static get styles() {
        return [
            css`
                :host {
                    /* Temporary style before the task is officially tackled */
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    justify-content: center;
                }
                img {
                    width: 97%;
                    align-self: center;
                    height: 18rem;
                    border-radius: 2.8rem;
                    box-shadow: 0 0 0.2rem 0.2rem #3e0697;
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
                    --mdc-button-horizontal-padding: 28px;

                    filter: drop-shadow(0px 1px 23px #b973e0);
                    --mdc-theme-primary: null;
                    --mdc-button-outline-color: #c078e4;
                }

                .button-label-large {
                    --mdc-typography-button-font-family: var(--font-family);
                    --mdc-typography-button-font-size: var(--button-large-font-size);
                    --mdc-typography-button-line-height: var(--button-large-line-height);
                    --mdc-typography-button-font-weight: var(--button-large-font-weight);
                    --mdc-typography-button-text-transform: none;
                    --mdc-typography-button-letter-spacing: none;
                }

                .event-title,
                .event-text {
                    margin: 0 2rem;
                }

                .event-title {
                    margin-top: 1.2rem;
                }

                .event-prize {
                    margin: 2rem 2rem 0;
                }

                .event-dates-label {
                }

                .event-prize-amount {
                    background-color: #c078e4;
                    padding: 0.2rem 1.8rem;
                    margin-left: 1rem;
                    border-radius: 2rem;
                }

                .details-button {
                    position: absolute;
                    align-self: flex-end;
                    bottom: 10%;
                    right: 5%;
                }
            `,
        ];
    }

    constructor() {
        super();
        this.entityId = null;
        this._state = State.EMPTY;
        this.loggedUser = LoggedUser.getInstance();
        this._currentCurrency = "";
    }

    _handleDetailsButton() {
        console.log("redirect will be implmented here");
        // window.location.href = `/tournaments/${this.entityId}`;
        // TODO: implment page redirect, will most probably user an event to trigger the redirect
        // this.dispatchEvent(
        //     new CustomEvent("tournament-details-button-clicked", {
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

        //fake request to get tournament data
        this.tournament = await new Promise((resolve, reject) => {
            setTimeout(() => resolve(tournaments[entityId]), Math.random() * 1000);
        });

        //fake request to get currency data
        this.tournament.currency = await new Promise((resolve, reject) => {
            setTimeout(() => resolve(currencies[this.tournament.currencyId]), Math.random() * 1000);
        });

        this._state = State.LOADED;

        return this.tournament;
    }

    //request to ipgeo api to get user region currency
    async _getUserCurrency() {
        const response = await fetch(
            "https://api.ipgeolocation.io/ipgeo?apiKey=c56ed09b75d4426486fc20d13a23779a"
        );
        const userInfo = await response.json();

        return "USD" || userInfo.currency.code;
    }

    async _convertCurrency() {
        const baseCurrency = {
            rate: 1,
            code: "EUR",
        };

        //i doesnt know real rate and base currency so i set EUR with rate 1:1
        const convertedCoins = this.tournament.fee * baseCurrency.rate;

        const baseCurrencyCode = baseCurrency.code;
        const userCurrencyCode = await this._getUserCurrency();

        //use exchangerate api to conversation Base currency to user region currency
        const response = await fetch(
            `https://api.exchangerate.host/convert?from=${baseCurrencyCode}&to=${userCurrencyCode}&amount=${convertedCoins}`
        );
        const info = await response.json();

        this._currentCurrency = info.result.toLocaleString(undefined, {
            style: "currency",
            currency: userCurrencyCode,
        });
    }

    render() {
        switch (this._state) {
            case State.EMPTY:
                return html` <h4>default view</h4> `;
            case State.LOADING:
                return html` <h4>loading</h4> `;
            case State.LOADED:
                return html`
                    <img src=${this.tournament.eventImage} />
                    <h4 class="event-title">${this.tournament.name}</h4>
                    <!-- FIXME: change the value of the substring to match official given value -->
                    <div class="paragraph-large event-text">
                        ${this.tournament.description.substring(0, 30)}
                    </div>
                    <tl-tournament-countdown
                        class="counter"
                        date-start="${this.tournament.dateStart}"
                        date-end="${this.tournament.dateEnd}"
                    ></tl-tournament-countdown>
                    <div class="paragraph-large event-prize">
                        Prize money <span class="event-prize-amount">${this._currentCurrency}</span>
                    </div>
                    <mwc-button
                        class="details-button button-label-large"
                        label="Details"
                        outlined
                        @click="${(event) => this._handleDetailsButton(event)}"
                    ></mwc-button>
                `;
            case State.ERROR:
                return html` <h4>error</h4> `;
        }
    }

    async willUpdate() {
        if (this.entityId !== null && this._state === State.EMPTY) {
            this._fetchTournamentInformation(this.entityId);
        }
        if (this.tournament && !this._currentCurrency) {
            this._convertCurrency();
        }
    }

    //do this cause mwc-button has fixed height and issue still open https://github.com/material-components/material-web/issues/81
   async updated(){
        if(this.shadowRoot.querySelector("mwc-button")){
            await this.shadowRoot.querySelector("mwc-button").updateComplete
            
            this.shadowRoot.querySelector("mwc-button")
            .shadowRoot.querySelector(".mdc-button")
            .style.height = "30px"
        }
    }
}

customElements.define("tl-tournament-card", TournamentCard);