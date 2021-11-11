const getElementById = require('../../_common/common_functions').getElementById;
const BinarySocket = require('../base/socket');
const getLanguage       = require('../../_common/language').get;
const isEuCountry   = require('../../app/common/country_base').isEuCountry;
const State = require('../../_common/storage').State;
const Client = require('../base/client');

const RedirectBanner = (() => {

    let el_redirect_banner_container, el_redirect_link;

    const onLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {

            if (isEuCountry()) {

                el_redirect_banner_container = getElementById('redirect_banner_container');
                el_redirect_link = getElementById('redirect-link');
                el_redirect_banner_container.setVisibility(1);
                const lang = getLanguage().toLowerCase();
                const multiplier_href = `https://deriv.com/${lang}/`;

                el_redirect_link.href = multiplier_href;
            }
            
        });

    };

    const showBanner = () => {
        el_redirect_banner_container = getElementById('redirect_banner_container');
        el_redirect_link = getElementById('redirect-link');
        el_redirect_banner_container.setVisibility(1);
        const lang = getLanguage().toLowerCase();
        const multiplier_href = `https://deriv.com/${lang}/`;

        el_redirect_link.href = multiplier_href;
    };

    const loginOnLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const client_account = Client.get('landing_company_shortcode') === 'maltainvest';
            const virtual_account = Client.get('landing_company_shortcode') === 'virtual';

            const maltainvest = State.getResponse('authorize.account_list').filter(item => item.landing_company_name === 'maltainvest').length;
            const iom = State.getResponse('authorize.account_list').filter(item => item.landing_company_name === 'iom').length;
            const malta = State.getResponse('authorize.account_list').filter(item => item.landing_company_name === 'malta').length;
            
            if (isEuCountry() && State.getResponse('authorize.account_list').length === 1) {
                showBanner();
            } else if (isEuCountry() && virtual_account && maltainvest && !iom && !malta) {
                showBanner();
            } else if (isEuCountry() && client_account) {
                showBanner();
            }

        });

    };

    return { onLoad, loginOnLoad };

})();

module.exports = RedirectBanner;
