import { LitElement } from 'lit';

export class LoggedUser extends LitElement {
    static _instance = null;
    static getInstance() {
        if (LoggedUser._instance === null) {
            LoggedUser._instance = new LoggedUser();
        }
        return LoggedUser._instance;
    }

    static properties = {
        jwt: {
            type: 'string',
        },
        user: {
            type: 'object',
        },
    };

    constructor() {
        super();
        LoggedUser._instance = this;
        this._getFromSession().then((payload) => this._setData(payload.jwt, payload.user));
    }

    async setJwt(jwt) {
        if (jwt === null) {
            this._setData(jwt, null);
            return 200;
        }

        // Get the information of the logged in user
        const getUserResponse = await fetch('https://api.mogaland.io/tradelite-apis/user/user/me', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
        });

        // Report user detail retrieval error
        const status = getUserResponse.status;
        if (status !== 200) {
            return status;
        }

        // Extract the user infos
        const loggedUser = await getUserResponse.json();

        // Set the property `user` and change the state for the attribute display
        this._setData(jwt, loggedUser);

        return status;
    }

    _setData(jwt, user) {
        this.jwt = jwt;
        if (jwt !== null) {
            this.user = user;
        } else {
            this.user = {
                email: null,
                nickname: 'Anonymous',
            };
        }

        this._saveInSession(jwt, user);

        // FIXME: find out why this.dispatchEvent does not work but this does
        document.querySelector('tl-logged-user').dispatchEvent(
            new CustomEvent('user-credentials-update', {
                bubbles: true,
                composed: true,
                detail: {
                    user,
                },
            })
        );
    }

    async _saveInSession(jwt, user) {
        if (jwt !== null) {
            sessionStorage.setItem('jwt', jwt);
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('jwt');
            sessionStorage.removeItem('user');
        }
    }

    async _getFromSession() {
        const jwt = sessionStorage.getItem('jwt');
        const user = JSON.parse(sessionStorage.getItem('user'));
        return { jwt, user };
    }
}

customElements.define('tl-logged-user', LoggedUser);
