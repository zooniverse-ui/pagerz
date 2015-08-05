# pagerz

An infinite paging library. 

## Usage

Available on [npm](http://npmjs.com), include as a dependency using `npm install --save pagerz` 


```javascript

<Pager getPage={pagedFunctionThatReturnsAPromise} currentPage={1} lastPage={10} firstPage={0}>
  <ChildToRenderForEachThing resource={resourceFromPager}/>
</Pager>

<ScrollingPager getPage={pagedFunctionThatReturnsAPromise} currentPage={1} lastPage={10} firstPage={0}>
  <ChildToRenderForEachThing resource={resourceFromPager}/>
</ScollingPager>
```

## Supported Properties

### Module name

| property | default | effect |
|----------|:-------:|--------|
| name  | `defaultValue` | short description |

## Contributing

See [CONTRIBUTING.md](https://github.com/zooniverse-ui/markdownz/tree/master/CONTRIBUTING.md)

## License

Copyright 2015 by The Zooniverse. Licensed under the Apache Public License v2. See [LICENSE](https://github.com/zooniverse-ui/markdownz/tree/master/LICENSE) for details.
