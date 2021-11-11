const getElementById = require('../../_common/common_functions').getElementById;
const BinarySocket = require('../base/socket');
const getLanguage       = require('../../_common/language').get;
const isEuCountry   = require('../../app/common/country_base').isEuCountry;
const State = require('../../_common/storage').State;

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

    const loginOnLoad = () => {
        BinarySocket.wait('authorize', 'website_status', 'landing_company').then(() => {
            const client_account = State.getResponse('landing_company.financial_company.shortcode') === 'maltainvest';
            
            if (isEuCountry() && client_account) {

                el_redirect_banner_container = getElementById('redirect_banner_container');
                el_redirect_link = getElementById('redirect-link');
                el_redirect_banner_container.setVisibility(1);
                const lang = getLanguage().toLowerCase();
                const multiplier_href = `https://deriv.com/${lang}/`;

                el_redirect_link.href = multiplier_href;
            }
            
        });

    };

    return { onLoad, loginOnLoad };

})();

module.exports = RedirectBanner;
