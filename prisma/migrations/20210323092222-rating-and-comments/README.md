# Migration `20210323092222-rating-and-comments`

This migration has been generated by Tom Klaver at 3/23/2021, 10:22:22 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "SpotReview" ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "comments" TEXT NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210323083204-spot-review..20210323092222-rating-and-comments
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -31,7 +31,8 @@
   spot      Spot     @relation(fields: [spotId], references: [id])
   spotId    Int      @map(name: "spot_id")
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
-
+  rating    Int
+  comments  String
   @@index([spotId], name: "spot_reviews.spotId")
 }
```


