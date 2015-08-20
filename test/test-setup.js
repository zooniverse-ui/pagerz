import {jsdom} from 'node-jsdom';
import React from 'react';

if (typeof document === 'undefined') {
    global.document = jsdom("<html><head></head><body></body></html>");
    global.window = document.parentWindow;
    global.location = document.location;
    global.navigator = {
        userAgent: 'node.js'
    };
}

var Child = React.createClass({
    displayName: "Child",

    getDefaultProps() {
        return {
            testProp: true
        };
    },

    render() {
        return( <p {...this.props}>{this.props.resource}</p>);
    }
});

let pageData = {
    nextPage: 2,
    previousPage: null,
    currentPage: 1,
    data: [1,2,3]
};

export {Child, pageData};
