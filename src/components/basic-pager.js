import React from 'react';
import {updatePageQueryParam} from '../lib/on-page-change';

let NOOP = Function.prototype;

export default React.createClass({
    displayName: 'BasicPager',

    getDefaultProps() {
        return {
            pageCount: null,
            currentPage: null,
            resourceProp: "resource",
            data: [],
            onPageChange: updatePageQueryParam
        };
    },

    getInitialState() {
        return {
            data: null
        };
    },

    getPage(page) {
        this.props.onPageChange(page);
    },

    componentWillMount() {
        let data = Array.apply(null, Array(this.props.pageCount)).map(() => { return []; });
        data[this.props.currentPage - 1] = this.props.data;
        this.setState({data: data});
    },

    componentWillReceiveProps({currentPage, data}) {
        let newData = this.state.data;
        newData[currentPage - 1] = data;
        this.setState({data: newData});
    },

    children(dataPage) {
        let childTemplate = React.Children.only(this.props.children);
        return dataPage.map((datum, idx) => {
            let newProps = Object.assign({}, childTemplate.props, {key: idx});
            newProps[this.props.resourceProp] = datum;
            return React.createElement(childTemplate.type, newProps);
        });
    },

    renderPage(page, idx) {
        return (
            <div key={idx} className="page">
                {this.children(page)}
            </div>
        );
    },

    render() {
        return(
            <div className="pager">
                <div className="paged-resources">
                    {this.state.data.map(this.renderPage)}
                </div>
            </div>
        );
    }
});
