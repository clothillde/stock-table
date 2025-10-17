# Live Stock Application

Application built as a recruitment task - Application which takes stock data from ready WebSocket and present them in a dynamic responsive table. There should be highlight changes when:
  - Green flash – value increased
  - Red flash – value decreased
  - Blue flash – date/time field updated

Requirements for technologies to be used:
- Angular v18+
- TailwindCSS
- SignalR
- NgRx Signals
- RxJS

## Installation and Running

### 1. Start the backend (Docker)

docker run -p 32770:8080 --rm kubamichalek/statscore-websocket-recruitment

### 2. Start the frontend

Project is using proxy to avoid CORS issues while getting data from backend

npm install
npm start -> it will automatically use the proxy

### 3. Application will be ready at

http://localhost:4200
