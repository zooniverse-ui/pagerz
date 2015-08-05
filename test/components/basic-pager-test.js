import dom from '../test-setup';

import React, {addons} from 'react/addons';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
let {expect, spy} = chai;

import BasicPager from '../../src/components/basic-pager';

var Child = React.createClass({
    displayName: "Child",

    getDefaultProps() {
        return {
            testProp: true
        };
    },

    render() {
        return( <p {...this.props}>{this.props.resource}</p>);
    }
});

describe("BasicPager", () => {
    var pager;

    it("should exist", () => {
        expect(BasicPager).to.be.ok;
    });


    beforeEach(() => {
        let pageFn = (page) => {
            let data = [[1,2,3], [4,5,6]];
            return Promise.resolve({
                currentPage: page,
                nextPage: page == 2 ? null : 2,
                lastPage: 2,
                firstPage: 1,
                previousPage: page == 1 ? null : 1 ,
                data: data[page - 1]
            });
        };
        pager = addons.TestUtils.renderIntoDocument(<BasicPager getPage={pageFn}>
                                                        <Child otherProp={false} />
                                                    </BasicPager>);
    });

    describe("#getPage", () => {
        it("should call the onPageChange callback", () => {
            let opcCbSpy = spy();
            pager = addons.TestUtils.renderIntoDocument(<BasicPager onPageChange={opcCbSpy}>
                                                            <Child otherProp={false} />
                                                        </BasicPager>);
            return pager.getPage(2).then( () => {
                expect(opcCbSpy).to.have.been.called.twice();
            });
        });

        it("should update the pager state", () => {
            return pager.getPage(2).then(() => {
                expect(pager.state).to.deep.equal({
                    currentPage: 2,
                    data: [[1,2,3],[4,5,6]],
                    firstPage: 1,
                    lastPage: 2,
                    previousPage: 1,
                    nextPage: null
                });
            });
        });
    });

    describe("#componentWillMount", () => {
        var getPageSpy;

        beforeEach(() => {
            getPageSpy = spy.on(pager, 'getPage');
        });

        context("when state.currentPage is set", () => {
            it("should call this.getPage with state.currentPage", () => {
                pager.state.currentPage = 5;
                pager.componentWillMount();
                expect(getPageSpy).to.have.been.called.with(5);
            });
        });

        context("when props.currentPage is set", () => {
            it("should call this.getPage with props.currentPage", () => {
                pager.state.currentPage = null;
                pager.componentWillMount();
                expect(getPageSpy).to.have.been.called.with(1);
            });
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
