import { serviceDetails } from "@/data/services";
import { Feature } from "@/types/feature";

const featuresData: Feature[] = serviceDetails.map((service, index) => ({
  id: index + 1,
  title: service.title,
  audience: service.audience[0],
  keywords: service.serviceContent.slice(0, 3),
  path: `/services/${service.slug}`,
}));

export default featuresData;