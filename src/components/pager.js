import React from 'react';
import BasicPager from './basic-pager';

export default class Pager extends BasicPager {
    get displayName() {
        return 'Pager';
    }

    clickToLoadNext() {
        if (this.state.nextPage) {
            return (
                <div className="pager-next-page" onClick={this.getPage.bind(this, this.state.nextPage)}>
                    Click To Load More
                </div>
            );
        }
    }

    clickToLoadPrevious() {
        if (this.state.previousPage) {
            return (
                <div className="pager-previous-page" onClick={this.getPage.bind(this, this.state.previousPage)}>
                    Click To Load More
                </div>
            );
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
