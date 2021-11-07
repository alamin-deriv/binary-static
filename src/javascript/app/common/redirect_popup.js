/* eslint-disable no-console */
const getElementById = require('../../_common/common_functions').getElementById;
const BinarySocket = require('../base/socket');
const Client = require('../base/client');
const State = require('../../_common/storage').State;
const isEuCountrySelected      = require('../../_common/utility').isEuCountrySelected;

const RedirectPopup = (() => {
    let el_redirect_popup;

    const onLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const is_uk_residence = (Client.get('residence') === 'gb' || State.getResponse('website_status.clients_country') === 'gb');
            const eu_country      = isEuCountrySelected(Client.get('residence')) || isEuCountrySelected(State.getResponse('website_status.clients_country'));

            if (is_uk_residence || eu_country) {
                console.log('HI');
                // el_gaming_popup = getElementById('gaming-close-popup');
                el_redirect_popup = getElementById('redirect-popup');
                // el_redirect_popup.setVisibility(1);
                // el_accept_btn = getElementById('redirect_banner_btn');
            }
            
            // el_redirect_banner_container.setVisibility(0);

        });
    };
    const loginOnLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const is_uk_residence = (Client.get('residence') === 'gb' || State.getResponse('website_status.clients_country') === 'gb');
            const eu_country      = isEuCountrySelected(Client.get('residence')) || isEuCountrySelected(State.getResponse('website_status.clients_country'));

            if (is_uk_residence || eu_country) {
                // el_gaming_popup = getElementById('gaming-close-popup');
                el_redirect_popup = getElementById('redirect-popup');
                el_redirect_popup.setVisibility(1);
                // el_accept_btn = getElementById('redirect_banner_btn');
            }
            // el_redirect_banner_container.setVisibility(0);

        });
    };

    const onClosePopup = () => {
        el_redirect_popup.setVisibility(0);
        const el_top_bar = getElementById('topbar');
        el_top_bar.style.zIndex = 4;
        document.body.style.overflow = 'auto';
    };

    return { loginOnLoad, onLoad, onClosePopup };

})();

module.exports = RedirectPopup;
