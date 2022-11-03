

## Running the project locally with mongodb database in docker
- `docker run -p 27017:27017 mongo` (  stop MongoDb instance if running - `sudo service mongod stop`)
- create a `.env` file in the root, add JWT_KEY=kabeer
- navigate to your desired service and type `npm run dev:start`
- navigate to client directory and type `npm run dev`