import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "Bogi Zilol";
const BASE_URL = "https://bogizilol.uz";

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  path,
  type = "website",
  image,
  jsonLd,
}) => {
  const fullTitle = path === "/" ? `${SITE_NAME} — Modern Uzbek Culinary Experience` : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/og-image.jpg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default PageSEO;

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Bogi Zilol",
  description: "A modern Uzbek culinary experience in the heart of Tashkent. Traditional recipes with contemporary refinement.",
  url: "https://bogizilol.uz",
  telephone: "+998 71 200 00 00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Amir Temur Avenue",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.3111,
    longitude: 69.2797,
  },
  servesCuisine: "Uzbek",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "23:00",
  },
  image: "https://bogizilol.uz/og-image.jpg",
  acceptsReservations: "True",
};
