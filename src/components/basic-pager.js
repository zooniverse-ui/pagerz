import React from 'react';

let NOOP = Function.prototype;

export default React.createClass({
    displayName: 'BasicPager',

    getDefaultProps() {
        return {
            currentPage: 1,
            resourceProp: "resource",
            onPageChange: NOOP,
            getPage: (page) => { return Promise.resolve({}); }
        };
    },

    getInitialState() {
        return {
            nextPage: 0,
            previousPage: 0,
            firstPage: 0,
            currentPage: null,
            lastPage: 0,
            data: []
        };
    },

    getPage(page) {
        return this.props.getPage(page)
            .then(({currentPage, nextPage, lastPage, firstPage, previousPage, data}) => {
                this.state.data[currentPage - 1] = data;
                data = this.state.data;
                this.setState({currentPage, nextPage, lastPage, firstPage, previousPage, data}, () => {
                    this.props.onPageChange(this.state.currentPage);
                });
            });
    },

    componentWillMount() {
        this.getPage(this.state.currentPage || this.props.currentPage);
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
