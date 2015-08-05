import React from 'react';


export default React.createClass({
    displayName: 'Pager',

    getDefaultProps() {
        return {
            currentPage: 1
        };
    },

    getInitialState() {
        return {
            data: [1, 2, 3]
        };
    },

    render() {
        let childTemplate = React.Children.only(this.props.children);
        let children = this.state.data.map((datum, idx) => {
            let newProps = Object.assign({}, childTemplate.props, {resource: datum, key: idx});
            return React.createElement(childTemplate.type, newProps);
        });
        return(
                <div className="paged">
                    {children}
                </div>
        );
    }
});
