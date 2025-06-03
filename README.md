# 🔍 Glims

A web application designed to manage, share, and engage with event-related media content.  
It allows users to upload, browse, react, and download photos and videos within event-based folders, with customizable access rights and intuitive navigation.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js + TailwindCSS
- **Backend**: Node.js / Nest.js + Prisma
- **Database**: PostgreSQL / Firestore
- **Storage**: Cloudflare R2, AWS S3 or Garage
- **Infra**: Docker + Github (CI)
- **Hosting**: School VPS

---

## 📌 Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/JohannaStoicanescu/glims.git
cd glims

# 2. Install front dependencies and set up environment variables
cd front
npm install

# 3. Install back dependencies
cd back
pnpm install

# 4. Build containers and run dev environment project
make docker-dev
```

## Notes for developers

The current version of this project is a prototype meant to show to investors.
It therefore doesn't use a backend, but will in the future.
Once a backend is ready, please remove the following library: `jszip`.
