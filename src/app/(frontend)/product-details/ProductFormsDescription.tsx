import Image from 'next/image'
import React from 'react'

const SOLID_PRODUCTS_DIR = 'solid products'
const LIQUID_PRODUCT_SRC = `/${encodeURIComponent('liquid product 2.jpeg')}`

function solidProductSrc(filename: string) {
  return `/${encodeURIComponent(SOLID_PRODUCTS_DIR)}/${encodeURIComponent(filename)}`
}

type ProductFormCardProps = {
  name: string
  detail: string
  image: string
  imageAlt: string
  imageFit?: 'cover' | 'contain'
}

function ProductFormCard({ name, detail, image, imageAlt, imageFit = 'cover' }: ProductFormCardProps) {
  const objectClass = imageFit === 'contain' ? 'object-contain' : 'object-cover'

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950/40">
      <div className="relative aspect-[4/3] w-full min-h-[200px] bg-slate-100 sm:min-h-[240px] md:aspect-[3/2] md:min-h-[280px] lg:min-h-[320px] dark:bg-slate-800">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={`${objectClass} object-center`}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 560px"
          quality={92}
        />
      </div>
      <div className="px-4 py-3.5 sm:px-4 sm:py-4">
        <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-600 dark:text-white/60">{detail}</p>
      </div>
    </article>
  )
}

const solidForms = [
  {
    name: 'Granules',
    detail: 'Coarse product with a particle size ranging from 2 to 6.5 mm',
    image: solidProductSrc('Granular 2.jpeg'),
    imageAlt: 'Granules aluminium sulphate — coarse crystals, 2 to 6.5 mm particle size.',
  },
  {
    name: 'Fines',
    detail: 'Finely crushed product with a particle size ranging from 0.5 to 2 mm',
    image: solidProductSrc('Fines 2.jpeg'),
    imageAlt: 'Fines aluminium sulphate — finely crushed product, 0.5 to 2 mm particle size.',
  },
  {
    name: 'Kibbles',
    detail: 'Loosely crushed product with a particle size ranging from 30 to 60 mm',
    image: solidProductSrc('Kibbles 1.jpeg'),
    imageAlt: 'Kibbles aluminium sulphate — loosely crushed product, 30 to 60 mm particle size.',
  },
  {
    name: 'Flakes',
    detail: 'Flaked sheets with a thickness between 3 to 6.5 mm',
    image: solidProductSrc('Flakes 2.jpeg'),
    imageAlt: 'Flaked aluminium sulphate — sheet form, 3 to 6.5 mm thickness.',
  },
] as const

export function ProductFormsDescription() {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-6 text-left text-[0.9375rem] leading-relaxed text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/50 dark:text-white/62 sm:px-6 sm:py-8 sm:text-base lg:px-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            1. Solid Aluminium sulphate
          </h3>
          <p className="mt-3 text-pretty">
            Is a white to off-white crystalline salt that comes in four product forms:
          </p>

          <ul className="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 sm:gap-8 lg:gap-10">
            {solidForms.map((form) => (
              <li key={form.name}>
                <ProductFormCard
                  name={form.name}
                  detail={form.detail}
                  image={form.image}
                  imageAlt={form.imageAlt}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-200/80 pt-6 dark:border-white/10">
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            2. Liquid Aluminium sulphate
          </h3>
          <div className="mt-6 sm:max-w-xl lg:max-w-2xl">
            <ProductFormCard
              name="Liquid Aluminium sulphate"
              detail="A pale yellow to light brown liquid with customer specified Al₂O₃ content."
              image={LIQUID_PRODUCT_SRC}
              imageAlt="Liquid aluminium sulphate at Chilmund Chemicals."
              imageFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
