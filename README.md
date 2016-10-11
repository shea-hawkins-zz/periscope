# Periscope
Redux Periscope: In-depth monitoring for Redux applications

![N|Solid](http://i.imgur.com/IZws0Zc.png)

# Features
* Click each state on the timeline to hop to it!
* Drag timeline slider to view your application at all times!
* Drag slider handles to change the viewable timeline range!
* View state and action details in depth!
* Group action events by type!
* Adjust the dock to hide the tools!

# Installation

```sh
$ npm install redux-periscope --save-dev
```

Then, import as a normal react component and pass to [Redux Devtools] [reduxdevtools]

```sh
import { createDevTools } from 'redux-devtools';
import Periscope from 'redux-periscope';

let DevTools = createDevTools(
    <Periscope />
);

ReactDOM.render(<Provider store={store}><App /><DevTools /></Provider>, getElementById('app'));
```


# Examples

Navigate to examples/todomvc and run npm install -> npm start.

# Thanks

Many Thanks to [Dan Abramov] [dan]!

[reduxdevtools]: <https://github.com/gaearon/redux-devtools>
[dan]: <https://github.com/gaearon>
