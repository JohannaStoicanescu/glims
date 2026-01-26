import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

const prisma = new PrismaClient();

// Initialize S3 client for Garage storage
function getStorageClient() {
  const endpoint = process.env.GARAGE_ENDPOINT;
  const accessKeyId = process.env.GARAGE_ACCESS_KEY;
  const secretAccessKey = process.env.GARAGE_SECRET_KEY;
  const bucketName = process.env.GARAGE_BUCKET_NAME;
  const region = process.env.GARAGE_REGION || 'garage';

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucketName) {
    console.warn(
      '⚠️  Storage environment variables not set. Skipping image uploads to storage.'
    );
    return null;
  }

  return {
    client: new S3Client({
      endpoint: endpoint,
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      forcePathStyle: true,
    }),
    bucketName,
  };
}

// Download image from Picsum and upload to storage
async function downloadAndUploadImage(
  storageClient: { client: S3Client; bucketName: string },
  imageUrl: string,
  key: string
): Promise<string> {
  try {
    console.log(`📥 Downloading image from ${imageUrl}...`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    console.log(`📤 Uploading to storage as ${key}...`);
    const command = new PutObjectCommand({
      Bucket: storageClient.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await storageClient.client.send(command);
    console.log(`✅ Successfully uploaded ${key}`);
    return key;
  } catch (error) {
    console.error(`❌ Error uploading ${key}:`, error);
    // Return the key anyway so we can continue seeding
    return key;
  }
}

/// Seed function to populate the database with initial data
/// This includes users, folders, tags, reaction types, media (with images from Picsum), and reactions
async function main() {
  console.log('🌱 Starting database seed...\n');

  const storage = getStorageClient();

  // Create users
  console.log('👤 Creating users...');
  const user_one = await prisma.user.upsert({
    where: { email: 'one@glims-app.com' },
    update: {},
    create: {
      email: 'one@glims-app.com',
      name: 'Alice Johnson',
      emailVerified: true,
      image: 'https://i.pravatar.cc/150?img=1',
    },
  });

  const user_two = await prisma.user.upsert({
    where: { email: 'two@glims-app.com' },
    update: {},
    create: {
      email: 'two@glims-app.com',
      name: 'Bob Smith',
      emailVerified: true,
      image: 'https://i.pravatar.cc/150?img=2',
    },
  });

  const user_three = await prisma.user.upsert({
    where: { email: 'three@glims-app.com' },
    update: {},
    create: {
      email: 'three@glims-app.com',
      name: 'Charlie Brown',
      emailVerified: false,
      image: 'https://i.pravatar.cc/150?img=3',
    },
  });

  console.log(`✅ Created users: ${user_one.name}, ${user_two.name}, ${user_three.name}\n`);

  // Create tags
  console.log('🏷️  Creating tags...');
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'vacation' },
      update: {},
      create: { name: 'vacation' },
    }),
    prisma.tag.upsert({
      where: { name: 'nature' },
      update: {},
      create: { name: 'nature' },
    }),
    prisma.tag.upsert({
      where: { name: 'city' },
      update: {},
      create: { name: 'city' },
    }),
    prisma.tag.upsert({
      where: { name: 'family' },
      update: {},
      create: { name: 'family' },
    }),
    prisma.tag.upsert({
      where: { name: 'work' },
      update: {},
      create: { name: 'work' },
    }),
    prisma.tag.upsert({
      where: { name: 'art' },
      update: {},
      create: { name: 'art' },
    }),
    prisma.tag.upsert({
      where: { name: 'travel' },
      update: {},
      create: { name: 'travel' },
    }),
    prisma.tag.upsert({
      where: { name: 'photography' },
      update: {},
      create: { name: 'photography' },
    }),
  ]);

  console.log(`✅ Created ${tags.length} tags\n`);

  // Create reaction types
  console.log('😊 Creating reaction types...');
  const reactionTypes = await Promise.all([
    prisma.reactionType.upsert({
      where: { name: 'like' },
      update: {},
      create: {
        name: 'like',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
      },
    }),
    prisma.reactionType.upsert({
      where: { name: 'love' },
      update: {},
      create: {
        name: 'love',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
      },
    }),
    prisma.reactionType.upsert({
      where: { name: 'laugh' },
      update: {},
      create: {
        name: 'laugh',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      },
    }),
    prisma.reactionType.upsert({
      where: { name: 'wow' },
      update: {},
      create: {
        name: 'wow',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>',
      },
    }),
    prisma.reactionType.upsert({
      where: { name: 'sad' },
      update: {},
      create: {
        name: 'sad',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      },
    }),
    prisma.reactionType.upsert({
      where: { name: 'angry' },
      update: {},
      create: {
        name: 'angry',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      },
    }),
  ]);

  console.log(`✅ Created ${reactionTypes.length} reaction types\n`);

  // Create folders
  console.log('📁 Creating folders...');
  const folder_one = await prisma.folder.upsert({
    where: { upload_url: 'folder-one-upload-url' },
    update: {},
    create: {
      owner_id: user_one.id,
      title: 'Vacation Photos',
      description: 'Photos from my summer vacation in the mountains',
      upload_url: randomUUID(),
      download_url: randomUUID(),
      tags: {
        connect: [
          { name: 'vacation' },
          { name: 'nature' },
          { name: 'travel' },
        ],
      },
      available_reactions: {
        connect: reactionTypes.map((rt) => ({ id: rt.id })),
      },
    },
  });

  const folder_two = await prisma.folder.upsert({
    where: { upload_url: 'folder-two-upload-url' },
    update: {},
    create: {
      owner_id: user_two.id,
      title: 'Work Projects',
      description: 'Screenshots and images from work projects',
      upload_url: randomUUID(),
      download_url: randomUUID(),
      tags: {
        connect: [{ name: 'work' }],
      },
      available_reactions: {
        connect: reactionTypes.slice(0, 4).map((rt) => ({ id: rt.id })),
      },
    },
  });

  const folder_three = await prisma.folder.upsert({
    where: { upload_url: 'folder-three-upload-url' },
    update: {},
    create: {
      owner_id: user_one.id,
      title: 'Family Memories',
      description: 'Family photos and memories',
      upload_url: randomUUID(),
      download_url: randomUUID(),
      password: 'secure123',
      tags: {
        connect: [{ name: 'family' }, { name: 'photography' }],
      },
      available_reactions: {
        connect: reactionTypes.map((rt) => ({ id: rt.id })),
      },
    },
  });

  // Make user_two a member of folder_one
  await prisma.folder.update({
    where: { id: folder_one.id },
    data: {
      members: {
        connect: { id: user_two.id },
      },
    },
  });

  console.log(`✅ Created 3 folders\n`);

  // Create unauthenticated user
  const unlogged_user = await prisma.unauthenticatedUser.upsert({
    where: {
      unique_name_per_folder: {
        folder_id: folder_one.id,
        name: 'Guest User',
      },
    },
    update: {},
    create: {
      name: 'Guest User',
      folder_id: folder_one.id,
    },
  });

  console.log(`✅ Created unauthenticated user\n`);

  // Download and upload images, then create media
  console.log('🖼️  Creating media with images from Picsum...');
  const mediaData = [
    {
      folder: folder_one,
      user: user_one,
      imageUrl: 'https://picsum.photos/800/600?random=1',
      type: 'image/jpeg',
      metadata: { width: 800, height: 600, title: 'Beautiful Landscape' },
    },
    {
      folder: folder_one,
      user: user_one,
      imageUrl: 'https://picsum.photos/800/600?random=2',
      type: 'image/jpeg',
      metadata: { width: 800, height: 600, title: 'Cityscape' },
    },
    {
      folder: folder_one,
      user: user_one,
      imageUrl: 'https://picsum.photos/800/600?random=3',
      type: 'image/jpeg',
      metadata: { width: 800, height: 600, title: 'Nature Scene' },
    },
    {
      folder: folder_one,
      user: user_two,
      imageUrl: 'https://picsum.photos/1920/1080?random=4',
      type: 'image/jpeg',
      metadata: { width: 1920, height: 1080, title: 'Wide Landscape' },
    },
    {
      folder: folder_two,
      user: user_two,
      imageUrl: 'https://picsum.photos/800/600?random=5',
      type: 'image/jpeg',
      metadata: { width: 800, height: 600, title: 'Portrait' },
    },
    {
      folder: folder_two,
      user: user_two,
      imageUrl: 'https://picsum.photos/600/600?random=6',
      type: 'image/png',
      metadata: { width: 600, height: 600, title: 'Square Format' },
    },
    {
      folder: folder_two,
      user: user_three,
      imageUrl: 'https://picsum.photos/1200/800?random=7',
      type: 'image/jpeg',
      metadata: { width: 1200, height: 800, title: 'Wide Photo' },
    },
    {
      folder: folder_three,
      user: user_one,
      imageUrl: 'https://picsum.photos/800/600?random=8',
      type: 'image/jpeg',
      metadata: { width: 800, height: 600, title: 'Abstract Art' },
    },
    {
      folder: folder_three,
      user: user_one,
      imageUrl: 'https://picsum.photos/1024/768?random=9',
      type: 'image/jpeg',
      metadata: { width: 1024, height: 768, title: 'High Resolution' },
    },
    {
      folder: folder_one,
      user: user_one,
      imageUrl: 'https://picsum.photos/800/600?random=10',
      type: 'image/jpeg',
      metadata: { width: 800, height: 600, title: 'Final Image' },
    },
  ];

  const createdMedia = [];
  for (const mediaItem of mediaData) {
    const storageKey = randomUUID();
    let finalStorageId: string = storageKey;

    // Upload to storage if available
    if (storage) {
      try {
        finalStorageId = await downloadAndUploadImage(
          storage,
          mediaItem.imageUrl,
          storageKey
        );
      } catch (error) {
        console.error(`Failed to upload ${storageKey}, using key as storage_id`);
      }
    } else {
      // If storage is not available, use the Picsum URL as storage_id for development
      finalStorageId = mediaItem.imageUrl;
    }

    const media = await prisma.media.create({
      data: {
        type: mediaItem.type,
        storage_id: finalStorageId,
        metadata: mediaItem.metadata,
        folder_id: mediaItem.folder.id,
        user_id: mediaItem.user.id,
      },
    });

    createdMedia.push(media);
  }

  console.log(`✅ Created ${createdMedia.length} media items\n`);

  // Create reactions
  console.log('👍 Creating reactions...');
  const reactions = [
    {
      media: createdMedia[0],
      user: user_one,
      reactionType: reactionTypes[0], // like
    },
    {
      media: createdMedia[0],
      user: user_two,
      reactionType: reactionTypes[1], // love
    },
    {
      media: createdMedia[1],
      user: user_one,
      reactionType: reactionTypes[0], // like
    },
    {
      media: createdMedia[1],
      user: user_two,
      reactionType: reactionTypes[2], // laugh
    },
    {
      media: createdMedia[2],
      user: user_one,
      reactionType: reactionTypes[1], // love
    },
    {
      media: createdMedia[3],
      user: user_two,
      reactionType: reactionTypes[0], // like
    },
    {
      media: createdMedia[3],
      user: user_one,
      reactionType: reactionTypes[3], // wow
    },
    {
      media: createdMedia[4],
      user: user_two,
      reactionType: reactionTypes[0], // like
    },
    {
      media: createdMedia[5],
      user: user_one,
      reactionType: reactionTypes[1], // love
    },
    {
      media: createdMedia[6],
      user: user_three,
      reactionType: reactionTypes[0], // like
    },
  ];

  for (const reaction of reactions) {
    await prisma.reaction.create({
      data: {
        media_id: reaction.media.id,
        reaction_type_id: reaction.reactionType.id,
        user_id: reaction.user.id,
      },
    });
  }

  console.log(`✅ Created ${reactions.length} reactions\n`);

  console.log('🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: 3`);
  console.log(`   - Folders: 3`);
  console.log(`   - Tags: ${tags.length}`);
  console.log(`   - Reaction Types: ${reactionTypes.length}`);
  console.log(`   - Media: ${createdMedia.length}`);
  console.log(`   - Reactions: ${reactions.length}`);
  console.log(`   - Unauthenticated Users: 1`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
