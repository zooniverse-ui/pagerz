import React from 'react';
import BasicPager from './basic-pager';

export default class Pager extends BasicPager {
    get displayName() {
        return 'Pager';
    }

    clickToLoadNext() {
        let page = this.state.data.get(this.props.nextPage);
        if ((this.props.nextPage !== null) && (page === undefined)) {
            let handler = this.getPage.bind(this, this.props.nextPage, false);
            return (
                <div className="pager-next-page" onClick={handler}>
                    Click To Load More
                </div>
            );
        }
        else {
            return null;
        }
    }

    clickToLoadPrevious() {
        let page = this.state.data.get(this.props.previousPage);
        if ((this.props.previousPage !== null) && (page === undefined)) {
            let handler = this.getPage.bind(this, this.props.previousPage, true);
            return (
                <div className="pager-previous-page" onClick={handler}>
                    Click To Load More
                </div>
            );
        }
        else {
            return null;
        }
    }

    render() {
        return(
            <div className="pager-container">
                {this.clickToLoadPrevious()}
                {super.render()}
                {this.clickToLoadNext()}
            </div>
        );
    }
};
