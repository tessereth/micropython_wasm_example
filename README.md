# Example of micropython in the browser

This is a django/react app which does celsius to fahrenheit conversion
in python client-side using micropython-wasm.

All the interesting code is in [app.js](assets/js/app.js).

## Usage

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
yarn install

mkdir -p assets/webpack_bundles
cp node_modules/micropython/lib/firmware.wasm assets/webpack_bundles

# in one terminal
./node_modules/.bin/webpack --watch
# in another terminal
python manage.py runserver
# open http://localhost:8000
```

### Appease webpack

Micropython doesn't appear to work with this version of webpack. If
you run webpack you may get something like this:

```
ERROR in ./node_modules/micropython/index.js
Module not found: Error: Can't resolve 'fs' in './node_modules/micropython'
 @ ./node_modules/micropython/index.js 21:9-22
 @ ./assets/js/app.js
 @ ./assets/js/index.js

ERROR in ./node_modules/micropython/lib/micropython.js
Module not found: Error: Can't resolve 'fs' in './node_modules/micropython/lib'
 @ ./node_modules/micropython/lib/micropython.js 39:15-28 80:13-26 179:28-41 3005:23-36
 @ ./node_modules/micropython/index.js
 @ ./assets/js/app.js
 @ ./assets/js/index.js
```

The code appears to be trying to check if we're running with webpack or with node but
webpack is still trying to require the things on the node code path.
You can get around this by finding each line webpack's complaining about, finding the
preceding if condition that checks for `webpackJsonp` or `window` or similar
and adding `typeof __webpack_require__ !== 'function' &&` to it.
