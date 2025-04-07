# Glims' Backend

NestJS is used for the backend framework.

The database technology is PostgreSQL, with Prisma as the ORM.

The object-storage service we plan to use is Cloudflare's R2, but it is likely
to change in the future, and be different depending on the environment, so it
will be isolated from the business logic as so:

```
            ┌────────────┐
            │ Controller │
            └─────┬──────┘
                  │
           ┌──────▼───────┐
           │ MediaService │   <─── Domain logic
           └──────┬───────┘
                  │
        ┌─────────▼──────────┐
        │  MediaStoragePort  │   <─── Interface (abstraction)
        └─────────┬──────────┘
                  │
   ┌──────────────┼───────────────┐
   │              │               │
   ▼              ▼               ▼
R2Adapter     S3Adapter      LocalFSAdapter
```

