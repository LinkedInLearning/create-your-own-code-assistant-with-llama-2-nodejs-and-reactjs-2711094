# Create Your Own Code Assistant with Llama 2, Node.js, and React.js

This is the repository for the LinkedIn Learning course Create Your Own Code Assistant with Llama 2, Node.js, and React.js. The full course is available from [LinkedIn Learning][lil-course-url].

_See the readme file in the main branch for updated instructions and information._

## Instructions

This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches

The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter.
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
Add changes to git using this command: git add .
Commit changes using this command: git commit -m "some message"

## Installing

1. To use these exercise files, you must have the following installed:
   - [list of requirements for course]
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. [Course-specific instructions]

[0]: # "Replace these placeholder URLs with actual course URLs"
[lil-course-url]: https://www.linkedin.com/learning/
[lil-thumbnail-url]: http://

###

install server side pacakges
npm config --location=project set legacy-peer-deps=tru
install i -D pino-pretty
npm i @langchain/community
build out basic server with endpoints for chat
connect to ollama
install global yomen generator for code extension
select web extension.

###

we will be using pgvector for our DB and prisma for our db connection

npm install -D prisma
npm install @prisma/client

add the docker compose info

```
  db:
    image: pgvector/pgvector:pg16
    ports:
      - 5432:5432
    volumes:
      - db:/var/lib/postgresql/data
    env_file:
      - .env
    environment:
      POSTGRES_USER: "${POSTGRES_USER}"
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_DB: "${POSTGRES_DB}"
      POSTGRES_HOST_AUTH_METHOD: "trust"
```

run `npx prisma init`
add the document to schema

````

model Document {
  id String @id @default(uuid())
  content String
  vector Unsupported("vector")?
}``` - Note teh unsupported Vector is added
by langchain for prisma support

start docker compose
`docker-compose up`

run initial migration
`npx prisma migrate dev --create-only`
call the migration init
then update the migration it made
````

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "Document" (
"id" TEXT NOT NULL,
"content" TEXT NOT NULL,
"vector" vector,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")

);

```
next run the migration again
`npx prisma migrate dev`
```

connect ollama to the db


// generate the extension 
either we will use blueprint or degit

npx bp vscode/extension extension

npx degit microsoft/vscode-webview-ui-toolkit-samples/frameworks/hello-world-react-vite extension

// Update names of variables

run test to ensure it shows in our env. 

build ui chatbox, history

connect to backend ensure it works e2e≠


startNode -> retriever -> vectordb
                                  -> graders
                       -> websearch
