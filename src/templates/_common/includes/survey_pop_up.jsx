import React from 'react';

const SurveyPopUp = () => (
    <React.Fragment>
        <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
                __html: `

            function getCookieItem(sKey) {
                'use strict';
                if (!sKey) { return null; }
                const match = document.cookie.match(new RegExp('(^| )' + sKey + '=([^;]+)'));
                return match[2] ? match[2] : null
            }

            lang = getCookieItem('language');

            if(lang === "EN") {
               (function (t, e, s, o) { var n, c, l; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), c = n[n.length - 1], l = e.createElement(s), l.type = "text/javascript", l.async = !0, l.id = o, l.src = "https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd6GfzIDE5U4iBoGHViZI_2FNYtWH3wmgu5iu667yZdN8zw.js", c.parentNode.insertBefore(l, c)) })(window, document, "script", "smcx-sdk");
            } else if (lang === "ES") {
               (function (t, e, s, o) { var n, c, l; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), c = n[n.length - 1], l = e.createElement(s), l.type ="text/javascript", l.async = !0, l.id = o, l.src ="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd6GfzIDE5U4iBoGHViZI_2FNaPu6PYrJ5D3PUpQkB_2B0Q9j.js",c.parentNode.insertBefore(l,c))})(window,document,"script","smcx-sdk");
            } else if (lang === "PT") {
               (function (t, e, s, o) { var n, c, l; t.SMCX = t.SMCX || [], e.getElementById(o) || (n = e.getElementsByTagName(s), c = n[n.length - 1], l = e.createElement(s), l.type ="text/javascript", l.async = !0, l.id = o, l.src ="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd6GfzIDE5U4iBoGHViZI_2FNY8210JV7z00CXO94lyob2f.js",c.parentNode.insertBefore(l,c))})(window,document,"script","smcx-sdk");
            }

            ` }}
        />
    </React.Fragment>
);

export default SurveyPopUp;
