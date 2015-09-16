import React from 'react';
import BasicPager from './basic-pager';

export default class PageNumberPager extends BasicPager {
    get displayName() {
        return 'Paginator';
    }

    getPage(activePage, previous) {
        super.getPage(activePage, previous);
        if (this.props.scrollOnChange) {
            window.scrollTo(0,0);
        }
    }

    onSelectPage(e) {
        let selectedPage = this.refs.pageSelect.getDOMNode().value;
        let previous = false;
        if (selectedPage < this.props.currentPage) {
            previous = true;
        }
        this.getPage(selectedPage, previous);
    }

    pageOption(n, i) {
        return (<option key={i} value={n+1}>
                    {n+1}
                </option>);
    }

    firstButton(page) {
        if (this.props.firstAndLast) {
            return (<button className="paginator-first" onClick={() => this.getPage(1, true)} disabled={page === 1}>
                        <i className="fa fa-fast-backward" /> First
                    </button>
                   );
        }
        else {
            return null;
        }
    }

    lastButton(page, pageCount) {
        if (this.props.firstAndLast) {
            return (
                    <button className="paginator-last" onClick={this.getPage.bind(this, pageCount, false)} disabled={page === pageCount}>
                        Last <i className="fa fa-fast-forward" />
                    </button>
            );
        }
        else {
            return null;
        }
    }

    render() {
        let {currentPage, pageCount} = this.props;

        return(<div className="paginator">
                   {super.render()}
                   {this.firstButton(currentPage)}
                   <button className="paginator-prev" onClick={this.getPage.bind(this, this.props.currentPage - 1, true)} disabled={currentPage === 1}>
                       <i className="fa fa-long-arrow-left" /> Previous
                   </button>

                   <div className="paginator-page-selector">
                       Page&nbsp;
                       <select value={currentPage} onChange={this.onSelectPage.bind(this)} ref="pageSelect">
                           {Array.from(Array(pageCount).keys()).map(this.pageOption)}
                       </select> of {pageCount}
                   </div>

                   <button className="paginator-next" onClick={this.getPage.bind(this, this.props.currentPage + 1, false)} disabled={currentPage === pageCount}>
                       Next <i className="fa fa-long-arrow-right" />
                   </button>
                   {this.lastButton(currentPage, pageCount)}
               </div>);
    }
};

PageNumberPager.defaultProps = Object.assign({}, BasicPager.getDefaultProps(), {
    firstAndLast: true,
    scrollOnChange: true
});

//PageNumberPager.propTypes = {
    //pageCount: React.PropTypes.number,
    //page: React.PropTypes.number,                  // page number
    //onPageChange: React.PropTypes.func.isRequired, // passed (page) on change
    //firstAndLast: React.PropTypes.bool,            // optional, add 'first' & 'last' buttons
    //scrollOnChange: React.PropTypes.bool          // optional, scroll to top of page on change
//};
