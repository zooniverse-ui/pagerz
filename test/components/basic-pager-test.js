import {Child, pageData} from '../test-setup';

import React, {addons} from 'react/addons';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
let {expect, spy} = chai;

import BasicPager from '../../src/components/basic-pager';

describe("BasicPager", () => {
    var pager;

    it("should exist", () => {
        expect(BasicPager).to.be.ok;
    });


    beforeEach(() => {
        pager = addons.TestUtils.renderIntoDocument(<BasicPager {...pageData}>
                                                       <Child otherProp={false} />
                                                    </BasicPager>);
    });

    describe("#getPage", () => {
        it("should call the onPageChange callback", () => {
            let opcCbSpy = spy();
            pager = addons.TestUtils.renderIntoDocument(<BasicPager onPageChange={opcCbSpy}>
                                                            <Child otherProp={false} />
                                                        </BasicPager>);
            pager.getPage(2);
            expect(opcCbSpy).to.have.been.called.with(2);
        });

    });

    describe("#componentWillMount", () => {
        var getPageSpy;

        it("should create a map of data", () => {
            pager.componentWillMount();
            expect(pager.state.data).to.be.an.instanceof(Map);
        });

        it("should assign the currentPage to the appropriate part of the component", () => {
            pager.componentWillMount();
            expect(pager.state.data.get(pager.props.currentPage)).to.deep.equal([1,2,3]);
        });
    });

    describe("#children", () => {
        var childrens;

        beforeEach(() => {
            childrens = pager.children([1,2,3,4]);
        });

        it("should return children equal to the page size", () => {
            expect(childrens).to.have.length(4);
        });

        it("should return children with a resource prop", () => {
            childrens.forEach((childs) => {
                expect(childs.props).to.have.property('resource');
            });
        });

        it("should preserve original properties of the child", () => {
            childrens.forEach((childs) => {
                expect(childs.props).to.have.property("testProp");
                expect(childs.props).to.have.property("otherProp");
            });
        });
    });

    describe("#render", () => {
        var firstChild;

        beforeEach( () => {
           ([firstChild] = addons.TestUtils.scryRenderedDOMComponentsWithTag(pager, 'p'));
        });

        it("should apply data to each child", () => {
            expect(firstChild.getDOMNode().textContent).to.eq('1');
        });

        it("should preserve the child element's default Props", () => {
            expect(firstChild.props).to.have.property("testProp").that.is.true;
        });

        it("should preserve props passed to the child", () => {
            expect(firstChild.props).to.have.property("otherProp").that.is.false;
        });
    });
});
