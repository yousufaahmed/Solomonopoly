// src/setupTests.js
import '@testing-library/jest-dom'; // Extends Jest with custom matchers

// Polyfill TextEncoder and TextDecoder for Jest (required for some libraries)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
