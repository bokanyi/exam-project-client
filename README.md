# PLAYLIST GENERATOR APP client

![ritual2000gif5](https://github.com/bokanyi/RITUAL2000-client/assets/98050006/f90cc87f-9fd7-4942-90e9-b4faef47f325)


This is the client side of a music playlist generator app, where a we can login with our Spotify account using its oauth flow. On the dashboard we can observe and modify a 3D shape generated with Three.js and cinema4D. After a nice setting that fits our actual mood we can ask for a recommendations via Spotify API. We can name and save it to our playlist and navigate to our library. Here we can manage our playlist and get a link to listen on spotify. 

## Run locally

Clone the project using the following command:
```
git clone: https://github.com/bokanyi/RITUAL2000-client.git
```
Install client dependencies and start the client using the following commands:
```
cd RITUAL2000-client
npm install
npm run dev
```
## Environment variables

VITE_REDIRECT_URI=`http://localhost:5173/login`\
VITE_SERVER_URL=`http://localhost:8000/`\
VITE_CLIENT_ID=<YOUR_SPOTIFY_OUATH_CLIENT_ID>

we need to create a spotify app to get client id and overwrite the client_id in config.ts

## Tools

react-typescript
Zod
RxJs
Three.js


