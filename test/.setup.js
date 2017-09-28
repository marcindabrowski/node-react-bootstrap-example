require('babel-register')();
// jsdom 11.x +:
const jsdom = require('jsdom');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const { JSDOM } = jsdom;

Enzyme.configure({ adapter: new Adapter() });

global.window = new JSDOM('').window;
global.document = global.window.document;

global.navigator = {
  userAgent: 'node.js',
};

let documentRef = document;
