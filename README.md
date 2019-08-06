# Example of micropython in the browser

### Usage

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
yarn install

# See https://github.com/rafi16jan/micropython-wasm
mkdir -p assets/webpack_bundles
cp node_modules/micropython/lib/firmware.wasm assets/webpack_bundles

# in one terminal
./node_modules/.bin/webpack --config webpack.config.js --watch
# in another terminal
python manage.py runserver
```