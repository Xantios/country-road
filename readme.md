<p align="center"><a href="#"><img src="./assets/logo.png" width="450"></a></p>

# Country road
A reverse proxy to take you home

## Installation
`yarn install`

## Config
See config.example.json

```json
{
    // Port to listen on
    "port": 8102,
    // Host to listen on or 0.0.0.0 for all
    "host": "0.0.0.0",
    // Show available routes in /route-table
    "showRouteMap": true,
    // Map hosts to whatever you please
    "hostMap": {
        // Reverse HTTP Proxy
        "json-api": {
            "source": "/api",
            "destination": "http://jsonplaceholder.typicode.com"
        },
        // Some included assets
        // Refer to symbol table for more info
        "rel-static": {
            "source": "/file",
            "destination": "^/assets/"
        }
    }
}
```

## Start
`yarn start`

## Special symbols
|Symbol|Usage|
|--|---------|
|@ | root of current path |
|~ | home  |
|^ | this folder|

## Thanks to
- Steven Chim for the excellent http-proxy-middleware package
- webstockreview for the logo