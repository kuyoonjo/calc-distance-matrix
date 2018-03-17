## How to run?
1. clone the repo
```bash
git clone https://github.com/kuyoonjo/calc-distance-matrix.git
```
2. install dependencies
```bash
cd calc-distance-matrix
npm install
```
3. start web server
```bash
node index.js
```

## Test
1. POST /route: Submit start point and drop-off locations
```bash
curl -X POST -H "Content-Type: application/json" -d '[[22.372081,114.107877],[22.326442,114.167811],[22.284419,114.15951]]' "http://127.0.0.1:9000/route"
```
2. GET /route/<TOKEN>: Get shortest driving route
```
curl -X GET "http://127.0.0.1:9000/route/YOUR_TOKEN"
```