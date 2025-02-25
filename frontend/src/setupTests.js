import '@testing-library/jest-dom';

// Polyfill TextEncoder if it's not defined (Node may not include it by default)
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
