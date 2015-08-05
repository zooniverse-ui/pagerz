import {jsdom} from 'node-jsdom';
import React from 'react';

if (typeof document === 'undefined') {
    global.document = jsdom("<html><head></head><body></body></html>");
    global.window = document.parentWindow;
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

let pageFn = (page) => {
    let data = [[1,2,3], [4,5,6]];
    return Promise.resolve({
        currentPage: page,
        nextPage: page == 2 ? null : 2,
        lastPage: 2,
        firstPage: 1,
        previousPage: page == 1 ? null : 1 ,
        data: data[page - 1]
    });
};

export {Child, pageFn};
