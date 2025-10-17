
const admin = require('firebase-admin');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '..', 'firebase-admin-service-account.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'cazadeals-56767918-79225'
});

const db = getFirestore();

async function calculatePopularity() {
  console.log("Iniciando el cálculo de popularidad para todas las marcas...");

  const brandsRef = db.collection('brands');
  const dealsRef = db.collection('deals');
  const batch = db.batch();

  try {
    const brandsSnapshot = await brandsRef.get();
    if (brandsSnapshot.empty) {
      console.log("No se encontraron marcas.");
      return;
    }

    for (const brandDoc of brandsSnapshot.docs) {
      const brand = brandDoc.data();
      const brandName = brand.name;

      // --- CONTROL DE ERRORES AÑADIDO ---
      if (!brandName) {
        console.warn(`- Se ha encontrado una marca sin nombre (ID: ${brandDoc.id}). Se omitirá.`);
        continue; // Saltar a la siguiente iteración del bucle
      }

      const dealsSnapshot = await dealsRef.where('brand', '==', brandName).get();
      const dealCount = dealsSnapshot.size;
      const dealFactor = Math.min(10, (dealCount / 20) * 10);

      const rating = brand.rating || 0;
      const reviewCount = brand.reviewCount || 0;
      const ratingFactor = rating * 2;

      let newDealsCount = 0;
      const oneWeekAgo = Timestamp.now().toDate();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      dealsSnapshot.forEach(dealDoc => {
        const deal = dealDoc.data();
        if (deal.createdAt && deal.createdAt.toDate() > oneWeekAgo) {
          newDealsCount++;
        }
      });
      const noveltyFactor = Math.min(10, newDealsCount * 2);

      const popularityScore = (dealFactor * 0.4) + (ratingFactor * 0.4) + (noveltyFactor * 0.2);
      const finalScore = parseFloat(popularityScore.toFixed(1));

      batch.update(brandDoc.ref, { 
        popularityScore: finalScore,
        totalVotes: reviewCount
      });

      console.log(`- Popularidad para '${brandName}': ${finalScore}/10`);
    }

    await batch.commit();
    console.log("\n✅ ¡Popularidad de todas las marcas actualizada en la base de datos!");

  } catch (error) {
    console.error("Error al calcular la popularidad:", error);
  }
}

calculatePopularity();
