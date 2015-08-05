import {Child, pageFn} from '../test-setup';

import React, {addons} from 'react/addons';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
let {expect, spy} = chai;

import Pager from '../../src/components/pager';

describe("Pager", () => {
    var pager, currentPage;


    describe("#render", () => {
        context("when previous Page is null", () => {
            beforeEach(() => {
                currentPage = 1;
                pager = addons.TestUtils.renderIntoDocument(<Pager currentPage={currentPage} getPage={pageFn}><Child /></Pager>);
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

            it("clicking on the next page loader should load the next page", () => {
                let nextPage = addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-next-page');
                addons.TestUtils.Simulate.click(nextPage);
                expect(pager.state.currentPage).to.equal(2);
            });
        });

        context("when next Page is null", () => {
            beforeEach(() => {
                currentPage = 2;
                pager = addons.TestUtils.renderIntoDocument(<Pager currentPage={currentPage} getPage={pageFn}><Child /></Pager>);
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

            it("clicking on the previous page loader should load the previous page", () => {
                let prevPage = addons.TestUtils.findRenderedDOMComponentWithClass(pager, 'pager-previous-page');
                addons.TestUtils.Simulate.click(prevPage);
                expect(pager.state.currentPage).to.equal(1);
            });
        });
    });
});

