# Frontend for [Reaktor assignment](https://assignments.reaktor.com/birdnest)

Live version: [https://monadikuikka.fly.dev](https://monadikuikka.fly.dev)

The frontend connects via Socket.IO to the [backend](https://github.com/luupanu/monadikuikka_backend) and (hopefully) is given data every 2000 milliseconds (configurable).

The instructions to package the frontend and backend together are [here](https://github.com/luupanu/monadikuikka_backend#package-together-with-frontend).

# Installation
1) `git clone https://github.com/luupanu/monadikuikka_frontend.git`
2) `npm install`
3) Create an `.env.development` file with the key `REACT_APP_WEBSOCKET_ADDRESS="ws://localhost:3001"`. The port must match `PORT` key from backend's env.
4) (Create an `.env.production` file with the key `REACT_APP_WEBSOCKET_ADDRESS`)

# Run standalone
1) Make sure [the backend is running](https://github.com/luupanu/monadikuikka_backend#run)
2) `npm start`

# Build

1) `npm run build:dev` or `npm run build:prod`

# Package together with backend

See instructions [here](https://github.com/luupanu/monadikuikka_backend#package-together-with-frontend).
