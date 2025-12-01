import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/// Seed function to populate the database with initial data
/// The data includes two users and two folders with relationships
/// User One owns Folder One
/// User Two owns Folder Two and is a member of Folder One
/// Folder One has an unauthenticated user named "Guest User"
async function main() {
  const user_one = await prisma.user.upsert({
    where: { email: 'one@glims-app.com' },
    update: {},
    create: {
      email: 'one@glims-app.com',
      name: 'One',
      emailVerified: false,
    },
  })

  const folder_one = await prisma.folder.upsert({
    where: { upload_url: 'folder-one-upload-url' },
    update: {},
    create: {
      owner_id: user_one.id,
      title: 'Folder One',
      description: 'This is folder one',
      upload_url: 'folder-one-upload-url',
      download_url: 'folder-one-download-url',
    },
  })

  const user_two = await prisma.user.upsert({
    where: { email: 'two@glims-app.com' },
    update: {},
    create: {
      email: 'two@glims-app.com',
      name: 'Two',
      emailVerified: true,
      owned_folders: {
        create: {
          title: 'Folder Two',
          description: 'This is folder two',
          upload_url: 'folder-two-upload-url',
          download_url: 'folder-two-download-url',
        },
      },
      member_folders: {
        connect: { id: folder_one.id },
      },
    },
  });

  const unlogged_user = await prisma.unauthenticatedUser.upsert({
    where: {
      unique_name_per_folder: {
        folder_id: folder_one.id,
        name: 'Guest User'
      }
    },
    update: {},
    create: {
      name: 'Guest User',
      folder_id: folder_one.id,
    },
  });

  console.log({ user_one, user_two, unlogged_user })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
