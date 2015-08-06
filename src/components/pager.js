import React from 'react';
import BasicPager from './basic-pager';

export default class Pager extends BasicPager {
    get displayName() {
        return 'Pager';
    }

    nextPage() {
        var page = null;
        this.state.data.slice(this.props.currentPage - 1).forEach((item, idx) => {
            if (typeof item[0] === 'undefined') {
                page = this.props.currentPage + idx;
            }
        });
        return page;
    }

    clickToLoadNext() {
        let page = this.nextPage();
        if (page !== null) {
            return (
                <div className="pager-next-page" onClick={this.getPage.bind(this, page)}>
                    Click To Load More
                </div>
            );
        }
        else {
            return null;
        }
    }

    previousPage() {
        var page = null;
        this.state.data.slice(0, this.props.currentPage).forEach((item, idx) => {
            if (typeof item[0] === 'undefined') {
                page = idx + 1;
            }
        });
        return page;
    }

    clickToLoadPrevious() {
        let page = this.previousPage();
        if (page !== null) {
            return (
                <div className="pager-previous-page" onClick={this.getPage.bind(this, page)}>
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
