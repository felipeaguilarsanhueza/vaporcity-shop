import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "VaporCity - Siente el Vapor, Vive la Experiencia",
  description: "Explora los mejores vapers, líquidos y accesorios premium. Calidad, estilo y envío rápido en todo Chile.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('/path-to-your-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded">
          <h1 className="text-4xl font-bold mb-4 uppercase">
            Siente el Vapor, Vive la Experiencia
          </h1>
          <p className="text-lg mb-6">
            Explora los mejores vapers, líquidos y accesorios premium. Calidad, estilo y envío rápido en todo Chile.
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white uppercase py-3 px-6 rounded"
          >
            Explora nuestros productos
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
