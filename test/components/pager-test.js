import dom from '../test-setup';

import React, {addons} from 'react/addons';
import chai from 'chai';
let {expect} = chai;

import Pager from '../../src/components/pager';

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

describe("Pager", () => {
    it("should exist", () => {
        expect(Pager).to.be.ok;
    });

    describe("#render", () => {
        var pager, child;

        beforeEach( () => {
            pager = addons.TestUtils.renderIntoDocument(<Pager><Child otherProp={false} /></Pager>);
            ([child] = addons.TestUtils.scryRenderedDOMComponentsWithTag(pager, 'p'));
        });

        it("should apply data to each child", () => {
            expect(child.getDOMNode().textContent).to.eq('1');
        });

        it("should preserve the child element's default Props", () => {
            expect(child.props).to.have.property("testProp").that.is.true;
        });

        it("should preserve props passed to the child", () => {
            expect(child.props).to.have.property("otherProp").that.is.false;
        });
    });
});
