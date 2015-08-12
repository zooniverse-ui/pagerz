let changeSearchString = (searchString, changes) => {
    let params = searchString.slice(1).split('&').reduce((accum, query) => {
        let [key, value] = query.split('=');
        if (key && value) {
            accum[key] = value;
        }
        return accum;
    }, {});

    params = Object.assign({}, params, changes);

    let queryString = Object.keys(params).map((key) => {
        let value = params[key];
        return `${key}=${value}`;
    }).join("&");

    return `?${queryString}`;
};

let updatePageQueryParam = (page) => {
    let [beforeQuestionMark, afterQuestionMark] = location.hash.split('?');
    let oldSearch = '?' + afterQuestionMark;
    let newSearch = changeSearchString(oldSearch, {page});
    location.hash = beforeQuestionMark + newSearch;
};

export {changeSearchString, updatePageQueryParam}
