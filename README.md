# Uploading Mast

![Uploading Mast](https://i.ibb.co/C7rzbPq/uploading-mast.png)

Uploading Mast is a music web player

## Prerequisites

**Node Version 18.x.x**

## Cloning the repository

```shell
git clone https://github.com/abhisheknaik24/uploading-mast.git
```

## Setup .env file

```js
NEXT_PUBLIC_API=
DATABASE_URL=
NEXT_PUBLIC_JWT_SECRET=
CRYPTO_SECRET=
```

## Update prisma schema path in package.json

### If MongoDB then

```js
"prisma": {
    "schema": "prisma/mongodb/schema.prisma"
}
```

### If MySQL then

```js
"prisma": {
    "schema": "prisma/mysql/schema.prisma"
}
```

## Start the app

```shell
docker compose up -d --build
```
