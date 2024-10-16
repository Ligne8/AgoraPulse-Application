import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'jane@example.com';

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    // Créer un utilisateur seulement si l'email n'existe pas
    const newUser = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: email,
        posts: {
          create: {
            title: 'Premier post',
            content: 'Ceci est le contenu du post.',
          },
        },
      },
      include: {
        posts: true,
      },
    });

    console.log('Nouvel utilisateur créé :', newUser);
  } else {
    console.log('Un utilisateur avec cet email existe déjà :', existingUser);
  }
}

main()
  .catch((e) => {
    console.error('Erreur rencontrée :', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });