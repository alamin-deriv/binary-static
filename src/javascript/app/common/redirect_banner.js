const DerivBanner = require('./deriv_banner');
const getElementById = require('../../_common/common_functions').getElementById;
const BinarySocket = require('../base/socket');
const getLanguage       = require('../../_common/language').get;
const State = require('../../_common/storage').State;
const Client = require('../base/client');
const isEuCountrySelected      = require('../../_common/utility').isEuCountrySelected;

const RedirectBanner = (() => {

    let el_redirect_banner_container, el_redirect_link;

    const onLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {

            const eu_country = isEuCountrySelected(Client.get('residence')) || isEuCountrySelected(State.getResponse('website_status.clients_country'));
            if (eu_country) {

                el_redirect_banner_container = getElementById('redirect_banner_container');
                el_redirect_link = getElementById('redirect-link');
                el_redirect_banner_container.setVisibility(1);
                const lang = getLanguage().toLowerCase();
                const multiplier_href = `https://deriv.com/${lang}/`;

                el_redirect_link.href = multiplier_href;
            }
            
        });

    };

    const handleRedirect = () => {
        window.location.href = '/move-to-deriv/';
    };

    const loginOnLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const eu_country = isEuCountrySelected(Client.get('residence')) || isEuCountrySelected(State.getResponse('website_status.clients_country'));
            const landing_company_shortcode = Client.get('landing_company_shortcode');

            const client_account = ['maltainvest', 'iom', 'malta'].includes(landing_company_shortcode);
            const virtual_account = landing_company_shortcode === 'virtual';

            const svg = State.getResponse('authorize.account_list').filter(item => item.landing_company_name === 'svg').length;
            
            if (eu_country && State.getResponse('authorize.account_list').length === 1) {
                handleRedirect();
            } else if (svg && virtual_account) {
                DerivBanner.redBanner();
            } else if (eu_country && client_account) {
                handleRedirect();
            } else if (eu_country && virtual_account) {
                handleRedirect();
            }

        });

    };

    return { onLoad, loginOnLoad };

})();

module.exports = RedirectBanner;
