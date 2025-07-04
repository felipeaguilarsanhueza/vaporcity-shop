import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "VaporCity - Siente el Vapor, Vive la Experiencia",
  description:
    "Explora los mejores vapers, líquidos y accesorios premium. Calidad, estilo y envío rápido en todo Chile.",
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
        className="relative h-[70vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg1.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />
        {/* Content */}
        <div className="relative z-10 max-w-2xl p-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 uppercase">
            Siente el Vapor, Vive la Experiencia
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explora los mejores vapers, líquidos y accesorios premium. Calidad, estilo y envío rápido en todo Chile.
          </p>
          <a
            href="/"
            className="inline-block bg-black bg-opacity-80 hover:bg-opacity-90 text-white uppercase py-3 px-6 rounded-md transition"
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
