# Production Migrations - Quick Guide

## Automatic (Recommended)

Migrations run automatically on deploy. Just push your code:

```bash
git push origin main
```

Railway/Render will run migrations before starting the app.

---

## Manual (If Needed)

### Railway
```bash
railway run npm run prisma:migrate:prod
```

### Render
Dashboard → Shell → Run: `npm run prisma:migrate:prod`

### VPS/Server
```bash
ssh user@server
cd backend
npm run prisma:migrate:prod
```

---

## First Time Setup

1. Create migration locally:
   ```bash
   cd backend
   npm run prisma:migrate dev --name add_new_tables
   ```

2. Push to production:
   ```bash
   git add prisma/migrations/
   git commit -m "Add migrations"
   git push origin main
   ```

3. Done! Migrations run automatically.

---

## Commands Reference

```bash
npm run prisma:generate          # Generate Prisma Client
npm run prisma:migrate:prod      # Run migrations (production-safe)
npx prisma migrate status         # Check migration status
```
