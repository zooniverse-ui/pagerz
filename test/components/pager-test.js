import {Child, pageData} from '../test-setup';

import React, {addons} from 'react/addons';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
let {expect, spy} = chai;

import Pager from '../../src/components/pager';

describe("Pager", () => {
    var pager, currentPage, getPageSpy;

    describe("#render", () => {
        context("when previous Page is null", () => {
            beforeEach(() => {
                currentPage = 1;
                getPageSpy = spy();
                let props = Object.assign({}, pageData, {currentPage, onPageChange: getPageSpy});
                pager = addons.TestUtils.renderIntoDocument(<Pager {...props}><Child /></Pager>);
            });

            it("should not render a previous page loader", () => {
                let prevPageTest = () => {
                    addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-previous-page');
                };
                expect(prevPageTest).to.throw();
            });

            it("should render a next page loader", () => {
                let nextPage = addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-next-page');
                expect(nextPage).to.exist;
            });

            it("should call getPage with nextPage after clicking on the next page loader", () => {
                let nextPage = addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-next-page');
                addons.TestUtils.Simulate.click(nextPage);
                expect(getPageSpy).to.have.been.called.with(2);
            });
        });

        context("when next Page is null", () => {
            beforeEach(() => {
                currentPage = 2;
                getPageSpy = spy();
                let props = Object.assign({}, pageData, {currentPage, nextPage: null, previousPage: 1, onPageChange: getPageSpy});
                pager = addons.TestUtils.renderIntoDocument(<Pager {...props}><Child /></Pager>);
            });

            it("should not render a next page loader", () => {
                let nextPageTest = () => {
                    addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-next-page');
                };
                expect(nextPageTest).to.throw();
            });

            it("should render a previous page loader", () => {
                let prevPage = addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-previous-page');
                expect(prevPage).to.exist;
            });

            it("should call getPage with previousPage after clicking on the previous page loader", () => {
                let prevPage = addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-previous-page');
                addons.TestUtils.Simulate.click(prevPage);
                expect(getPageSpy).to.have.been.called.with(1);
            });
        });
    });
});

