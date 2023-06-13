#!/usr/bin/env node

// \x1B means escape character to indicate special things will be printed
// m: select graphic rendition, [41 for background red, [31 for foreground red
console.log('\x1B[41m%s \x1B[4mMike\x1B[0m. I know you.', 'Your name is');
console.log('\x1B[4G   %s', "I'm tab right.");
console.log('\x1B[8G%s', "I'm tab right.");
console.log('\x1B[1m\x1B[31m%s', "I'm tab right.");
