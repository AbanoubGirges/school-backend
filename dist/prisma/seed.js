import { PrismaClient } from "@prisma/client";
import { testUsers } from "./testData.js";
const prisma = new PrismaClient();
async function seed() {
    console.log("🌱 Starting to seed database with test users...");
    try {
        for (const user of testUsers) {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { userName: user.userName },
                });
                if (existingUser) {
                    console.log(`✓ User "${user.userName}" already exists. Skipping...`);
                    continue;
                }
                const createdUser = await prisma.user.create({
                    data: user,
                });
                console.log(`✓ Created user: ${createdUser.name} (${createdUser.userName})`);
            }
            catch (error) {
                console.error(`Error creating user ${user.userName}:`, error);
            }
        }
        console.log("✅ Database seeding completed!");
        console.log(`📊 Total test users: ${testUsers.length}`);
    }
    catch (error) {
        console.error("❌ Fatal error during seeding:", error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
seed()
    .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
})
    .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
});
