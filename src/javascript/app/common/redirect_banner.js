/* eslint-disable no-console */
const getElementById = require('../../_common/common_functions').getElementById;
const BinarySocket = require('../base/socket');
const Client = require('../base/client');
const State = require('../../_common/storage').State;
const isEuCountrySelected      = require('../../_common/utility').isEuCountrySelected;

const RedirectBanner = (() => {

    let el_redirect_banner_container, el_redirect_popup, el_learn_more;

    const onLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const is_uk_residence = (Client.get('residence') === 'gb' || State.getResponse('website_status.clients_country') === 'gb');
            const eu_country      = isEuCountrySelected(Client.get('residence')) || isEuCountrySelected(State.getResponse('website_status.clients_country'));

            if (is_uk_residence || eu_country) {
                el_redirect_popup = getElementById('redirect-popup');
                el_redirect_banner_container = getElementById('redirect_banner_container');
                el_redirect_banner_container.setVisibility(1);
                el_learn_more = getElementById('redirect_banner_btn');
                el_learn_more.addEventListener('click', onShowPopup);
            }
            // el_redirect_banner_container.setVisibility(0);
            
        });

    };

    const onShowPopup = () => {
        console.log('hello');
        el_redirect_popup.setVisibility(1);
        const el_top_bar = getElementById('topbar');
        el_top_bar.style.zIndex = 0;
        document.body.style.overflow = 'hidden';
    };

    return { onLoad, onShowPopup };

})();

module.exports = RedirectBanner;
