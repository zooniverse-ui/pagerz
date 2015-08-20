import React from 'react';
import {updatePageQueryParam} from '../lib/on-page-change';

export default React.createClass({
    displayName: 'BasicPager',

    getDefaultProps() {
        return {
            previousPage: null,
            nextPage: null,
            currentPage: null,
            resourceProp: "resource",
            data: [],
            onPageChange: updatePageQueryParam
        };
    },

    getInitialState() {
        return {
            previous: false,
            data: null
        };
    },

    getPage(page, previous) {
        this.setState({previous}, () => {
            this.props.onPageChange(page);
        });
    },

    componentWillMount() {
        let data = new Map();
        data.set(this.props.currentPage, this.props.data);
        this.setState({data: data});
    },

    componentWillReceiveProps({currentPage, data}) {
        let newData = this.state.data;
        if (this.state.previous) {
            let mapContents = [[currentPage, data]];
            for (let entry of newData.entries()) {
                mapContents.push(entry);
            }

            newData = new Map(mapContents);
        }
        else {
            newData.set(currentPage, data);
        }
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

    renderPage(data, page) {
        return (
            <div key={page} className="page">
                {this.children(data)}
            </div>
        );
    },

    render() {
        let children = [];

        this.state.data.forEach((data, page) => {
            children.push(this.renderPage(data, page));
        });

        return(
            <div className="pager">
                <div className="paged-resources">
                    {children}
                </div>
            </div>
        );
    }
});
