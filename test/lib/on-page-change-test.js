import {changeSearchString, updatePageQueryParam} from '../../src/lib/on-page-change';
import {expect} from 'chai';

describe("changeSearchString", () => {
    it("should substitute out new keys in the query string", () => {
        let queryString = changeSearchString("?test=1&a=b&c=d", {a: "z"});
        expect(queryString).to.equal("?test=1&a=z&c=d");
    });
});

describe("updatePageQueryParam", () => {
    it("should substitute the page param", () => {
        location.hash = "/bogus_man?test=1&a=b&page=4";
        updatePageQueryParam(5);
        expect(location.hash).to.equal("#/bogus_man?test=1&a=b&page=5");
    });
});
