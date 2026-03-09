import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const placeholder = (text: string) =>
  `https://placehold.co/800x800/png?text=${encodeURIComponent(text)}`;

type SeedProduct = {
  name: string;
  category: string;
  technicalDetails: string;
  annualValue: number;
  photos: string[];
};

const officialProducts: SeedProduct[] = [
  {
    name: 'Notebook Acer Nitro V RTX 3050 i5 8GB',
    category: 'Notebook',
    technicalDetails:
      'Placa de vídeo RTX 3050 com 6GB, tela 15.6” Full HD 144Hz, SSD 512GB, Intel Core i5 13ª geração, 8GB RAM.',
    annualValue: 2508,
    photos: [
      'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B2%2520%25281%2529.jpeg',
      'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B3%2520%25281%2529.jpeg',
      'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B4%2520%25281%2529.jpeg',
      'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B5%2520%25281%2529.jpeg',
      'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B6%2520%25281%2529.jpeg',
    ],
  },
  {
    name: 'Desktop Gamer Predator Orion RTX 3070',
    category: 'Desktop',
    technicalDetails:
      'NVIDIA GeForce RTX 3070 8GB GDDR6, SSD 1TB, 16GB DDR4 3200MHz, Intel Core i7-11700 11ª geração.',
    annualValue: 2998.8,
    photos: [
      'https://images.digital.allugator.com/products/acer%20orion%201.png',
      'https://images.digital.allugator.com/products/acer%20orion%202.webp',
    ],
  },
  {
    name: 'Desktop Acer Orion i5 RTX 3060 16GB',
    category: 'Desktop',
    technicalDetails:
      'NVIDIA GeForce RTX 3060 12GB GDDR6, SSD 512GB, 16GB DDR4 3200MHz, Intel Core i5-11400 11ª geração.',
    annualValue: 3418.8,
    photos: [
      'https://images.digital.allugator.com/products/acer%20orion%202.png',
      'https://images.digital.allugator.com/products/acer%20orion%202.webp',
      'https://images.digital.allugator.com/products/allu.nv_specs-acer_orion%20i5%203060%2016GB_PO5-620-BR12_900x900px.png',
    ],
  },
  {
    name: 'Desktop Acer Orion i7 RTX 3060 16GB',
    category: 'Desktop',
    technicalDetails:
      'NVIDIA GeForce RTX 3060 12GB GDDR6, SSD 1TB, 16GB DDR4 3200MHz, Intel Core i7-11700 11ª geração.',
    annualValue: 2638.8,
    photos: [
      'https://images.digital.allugator.com/products/acer%20orion%203.png',
      'https://images.digital.allugator.com/products/acer%20orion%202.webp',
    ],
  },
  {
    name: 'Desktop Acer Orion i7 RTX 3080 32GB Linux',
    category: 'Desktop',
    technicalDetails:
      'NVIDIA GeForce RTX 3080 10GB GDDR6, SSD 1TB, 32GB RAM, Intel Core i7-11700 11ª geração, Linux.',
    annualValue: 3058.8,
    photos: [
      'https://images.digital.allugator.com/products/acer%20orion%201.webp',
      'https://images.digital.allugator.com/products/acer%20orion%202.webp',
    ],
  },
  {
    name: 'Notebook Acer Vero i5 16GB 512GB',
    category: 'Notebook',
    technicalDetails:
      'Intel Core i5 11ª geração, 16GB RAM, SSD 512GB.',
    annualValue: 1678.8,
    photos: [
      'https://images.digital.allugator.com/products/PACK_AV15-51_0.jpg',
      'https://images.digital.allugator.com/products/PACK_AV15-51_03.jpg',
      'https://images.digital.allugator.com/products/PACK_AV15-51_01.jpg',
      'https://images.digital.allugator.com/products/PACK_AV15-51_02.jpg',
      'https://images.digital.allugator.com/products/PACK_AV15-51_04.jpg',
    ],
  },
  {
    name: 'Notebook Acer Predator Helios Neo RTX 4060 i7 16GB',
    category: 'Notebook',
    technicalDetails:
      'RTX 4060, tela 16” 165Hz, SSD 1TB, 16GB RAM, Intel Core i7 13ª geração.',
    annualValue: 3828.01,
    photos: [
      'https://images.digital.allugator.com/products/thumb_acer_helios_CS_500x500.jpeg',
      'https://images.digital.allugator.com/products/PHN16-71-72W6%2520-%25202.jpeg',
      'https://images.digital.allugator.com/products/PHN16-71-72W6%2520-%25203.jpeg',
      'https://images.digital.allugator.com/products/PHN16-71-72W6%2520-%25204.jpeg',
    ],
  },
  {
    name: 'Notebook Acer Predator Triton RTX 3060 i7 16GB',
    category: 'Notebook',
    technicalDetails:
      'RTX 3060, tela 16”, SSD 512GB, 16GB RAM, Intel Core i7 12ª geração.',
    annualValue: 3948.01,
    photos: [
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+HELIOS+NEO+16/Acer+Predator+Helios+Neo+16+Thumb.png',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+HELIOS+NEO+16/Acer+Predator+Helios+Neo+16+2.jpg',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+HELIOS+NEO+16/Acer+Predator+Helios+Neo+16+3.jpg',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/ACER+PREDATOR+HELIOS+NEO+16/Acer+Predator+Helios+Neo+16+4.jpg',
    ],
  },
  {
    name: 'POLAR Pacer Pro + Assessoria',
    category: 'Smartwatch',
    technicalDetails: 'Relógio esportivo com GPS avançado e assessoria.',
    annualValue: 3348,
    photos: [
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
      'https://images.digital.allugator.com/products/82d4b0ce59cd54b5ad49c9a112ea51ad9158f129-1000x1000-1000.webp',
    ],
  },
  {
    name: 'POLAR Pacer + Assessoria',
    category: 'Smartwatch',
    technicalDetails: 'Relógio esportivo com GPS e assessoria.',
    annualValue: 2868,
    photos: [
      'https://images.digital.allugator.com/products/57ddd3233147109800d8c866ac870bce75d3d9c1-4000x4000-1000.webp',
      'https://images.digital.allugator.com/products/b93be3e3f8e673a8d9bd5abe10c1619380de5528-4000x4000-1000.webp',
      'https://images.digital.allugator.com/products/bffdd436aeacd45cc2018551cd66c217940e8968-5500x5500-1000.webp',
      'https://images.digital.allugator.com/products/37e27c8e873bcb4b637ce73044db7a43fb9b02c1-5000x5000-1000.webp',
    ],
  },
  {
    name: 'POLAR Pacer Pro',
    category: 'Smartwatch',
    technicalDetails: 'Relógio esportivo com GPS avançado.',
    annualValue: 1608,
    photos: [
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+Thumb+2.png',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+2.jpg',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+3.jpg',
      'https://yacare-products-image.s3.sa-east-1.amazonaws.com/new-site/POLAR+PACER+PRO/Polar+Pacer+Pro+4.jpg',
      'https://images.digital.allugator.com/products/82d4b0ce59cd54b5ad49c9a112ea51ad9158f129-1000x1000-1000.webp',
    ],
  },
  {
    name: 'POLAR Pacer',
    category: 'Smartwatch',
    technicalDetails: 'Relógio esportivo com GPS.',
    annualValue: 1128,
    photos: [
      'https://images.digital.allugator.com/products/57ddd3233147109800d8c866ac870bce75d3d9c1-4000x4000-1000.webp',
      'https://images.digital.allugator.com/products/b93be3e3f8e673a8d9bd5abe10c1619380de5528-4000x4000-1000.webp',
      'https://images.digital.allugator.com/products/bffdd436aeacd45cc2018551cd66c217940e8968-5500x5500-1000.webp',
      'https://images.digital.allugator.com/products/37e27c8e873bcb4b637ce73044db7a43fb9b02c1-5000x5000-1000.webp',
    ],
  },
  {
    name: 'iPhone 15 Pro Max 256GB',
    category: 'Smartphone',
    technicalDetails: 'Chip A17 Pro com GPU de 6 núcleos.',
    annualValue: 4558.87,
    photos: [
      'https://images.digital.allugator.com/products/iPhone%2B15%2BPro%2BMax%2BThumb.png',
      'https://images.digital.allugator.com/products/iPhone%2B15%2BPro%2BMax%2B-%2B2.jpeg',
      'https://images.digital.allugator.com/products/iPhone%2B15%2BPro%2BMax%2B-%2B3.jpeg',
    ],
  },
  {
    name: 'iPhone 15 Pro 128GB',
    category: 'Smartphone',
    technicalDetails: 'Chip A17 Pro com GPU de 6 núcleos.',
    annualValue: 3958.86,
    photos: [
      'https://images.digital.allugator.com/products/iPhone%2B15%2BPro%2BThumb.png',
      'https://images.digital.allugator.com/products/iPhone%2B15%2BPro%2B-%2B3.jpeg',
      'https://images.digital.allugator.com/products/iPhone%2B15%2BPro%2B-%2B2.jpeg',
    ],
  },
  {
    name: 'iPhone 15 128GB',
    category: 'Smartphone',
    technicalDetails:
      'Chip A16 Bionic com GPU de 5 núcleos e sistema avançado de câmera dupla.',
    annualValue: 3118.8,
    photos: [
      'https://images.digital.allugator.com/products/iPhone%2B15%2BThumb.png',
      'https://images.digital.allugator.com/products/iPhone%2B15%2B%2B-%2B2.jpeg',
      'https://images.digital.allugator.com/products/iPhone%2B15%2B%2B-%2B3.jpeg',
    ],
  },
  {
    name: 'iPhone 14 Pro 128GB',
    category: 'Smartphone',
    technicalDetails:
      '6.1”, A15 Bionic, Super Retina XDR OLED, câmera tripla e 5G.',
    annualValue: 3238.8,
    photos: [
      'https://images.digital.allugator.com/products/iPhone%2B14%2BPro%2BThumb.png',
      'https://images.digital.allugator.com/products/iPhone%2B14%2BPro%2B-%2B3.jpeg',
      'https://images.digital.allugator.com/products/iPhone%2B14%2BPro%2B-%2B2.jpeg',
      'https://images.digital.allugator.com/products/iPhone%2B14%2BPro%2B-%2B4.jpeg',
    ],
  },
  {
    name: 'iPhone 14 Pro Max 128GB',
    category: 'Smartphone',
    technicalDetails:
      '6.7”, LTPO Super Retina XDR OLED, Always-On Display, HDR10+, A16 Bionic.',
    annualValue: 3718.87,
    photos: [
      'https://images.digital.allugator.com/products/iPhone%2B14%2BPro%2BMax.png',
    ],
  },
  {
    name: 'iPhone 14 128GB',
    category: 'Smartphone',
    technicalDetails:
      '6.1”, A15, Super Retina XDR OLED, Ceramic Shield, câmera dupla e 5G.',
    annualValue: 2362.8,
    photos: [
      'https://images.digital.allugator.com/products/thumb-iphone-14-128-01-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-14-128-04-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-14-128-02-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-14-128-05-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-14-128-06-500x500px.png',
    ],
  },
  {
    name: 'iPhone 13 128GB',
    category: 'Smartphone',
    technicalDetails:
      '6.1”, A15 Bionic, Super Retina XDR OLED, câmera dupla e 5G.',
    annualValue: 2218.8,
    photos: [
      'https://images.digital.allugator.com/products/thumb-iphone-13-128-01-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-13-128-02-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-13-128-03-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-13-128-05-500x500px.png',
      'https://images.digital.allugator.com/products/thumb-iphone-13-128-06-500x500px.png',
    ],
  },
  {
    name: 'PlayStation 5',
    category: 'Console',
    technicalDetails:
      '4K, SSD, 825GB de armazenamento e PSN Essential inclusa.',
    annualValue: 2099,
    photos: [
      'https://images.digital.allugator.com/products/PSVR%20%2B%20PS4%20bundle%20-%20full%20-%201%20dualshock.jpg',
    ],
  },
];

const extraProducts: SeedProduct[] = [
  {
    name: 'Galaxy S24 256GB',
    category: 'Smartphone',
    technicalDetails:
      'Tela AMOLED 120Hz, câmera tripla, 256GB e desempenho premium.',
    annualValue: 3299,
    photos: [placeholder('Galaxy S24')],
  },
  {
    name: 'Galaxy S24 Ultra 256GB',
    category: 'Smartphone',
    technicalDetails:
      'Tela AMOLED de alta resolução, S Pen, câmeras avançadas e 256GB.',
    annualValue: 4699,
    photos: [placeholder('Galaxy S24 Ultra')],
  },
  {
    name: 'Galaxy A55 128GB',
    category: 'Smartphone',
    technicalDetails:
      'Tela AMOLED 120Hz, boa autonomia e conjunto equilibrado para o dia a dia.',
    annualValue: 2199,
    photos: [placeholder('Galaxy A55')],
  },
  {
    name: 'Moto G84 256GB',
    category: 'Smartphone',
    technicalDetails:
      'Tela pOLED 120Hz, 256GB, 8GB RAM e design fino.',
    annualValue: 1899,
    photos: [placeholder('Moto G84')],
  },
  {
    name: 'Moto Edge 50 Fusion 256GB',
    category: 'Smartphone',
    technicalDetails:
      'Tela curva, boa performance, 256GB e câmeras equilibradas.',
    annualValue: 2399,
    photos: [placeholder('Moto Edge 50 Fusion')],
  },
  {
    name: 'Xiaomi Redmi Note 13 Pro 256GB',
    category: 'Smartphone',
    technicalDetails:
      'Tela AMOLED, câmera de alta resolução e 256GB de armazenamento.',
    annualValue: 2099,
    photos: [placeholder('Redmi Note 13 Pro')],
  },
  {
    name: 'MacBook Air M2 256GB',
    category: 'Notebook',
    technicalDetails:
      'Chip Apple M2, design ultrafino, 8GB RAM e SSD 256GB.',
    annualValue: 7499,
    photos: [placeholder('MacBook Air M2')],
  },
  {
    name: 'Dell Inspiron 15 i5 16GB',
    category: 'Notebook',
    technicalDetails:
      'Intel Core i5, 16GB RAM, SSD 512GB e tela Full HD.',
    annualValue: 4599,
    photos: [placeholder('Dell Inspiron 15')],
  },
  {
    name: 'Lenovo LOQ RTX 4050 i5 16GB',
    category: 'Notebook',
    technicalDetails:
      'Notebook gamer com RTX 4050, 16GB RAM e SSD 512GB.',
    annualValue: 5599,
    photos: [placeholder('Lenovo LOQ RTX 4050')],
  },
  {
    name: 'ASUS TUF Gaming F15 RTX 4060',
    category: 'Notebook',
    technicalDetails:
      'Tela 144Hz, RTX 4060, Intel Core i7 e refrigeração robusta.',
    annualValue: 6299,
    photos: [placeholder('ASUS TUF F15')],
  },
  {
    name: 'iPad 10ª geração 64GB',
    category: 'Tablet',
    technicalDetails:
      'Tela 10.9”, chip A14 Bionic e compatibilidade com acessórios Apple.',
    annualValue: 3299,
    photos: [placeholder('iPad 10')],
  },
  {
    name: 'Galaxy Tab S9 FE 128GB',
    category: 'Tablet',
    technicalDetails:
      'Tela 10.9”, S Pen inclusa e boa experiência multimídia.',
    annualValue: 2899,
    photos: [placeholder('Galaxy Tab S9 FE')],
  },
  {
    name: 'Xiaomi Pad 6 128GB',
    category: 'Tablet',
    technicalDetails:
      'Tela de alta taxa de atualização, ótimo para estudos e consumo de mídia.',
    annualValue: 2499,
    photos: [placeholder('Xiaomi Pad 6')],
  },
  {
    name: 'AirPods Pro 2',
    category: 'Fone',
    technicalDetails:
      'Cancelamento de ruído ativo, áudio espacial e estojo MagSafe.',
    annualValue: 1899,
    photos: [placeholder('AirPods Pro 2')],
  },
  {
    name: 'Galaxy Buds2 Pro',
    category: 'Fone',
    technicalDetails:
      'ANC, áudio Hi-Fi e encaixe confortável para uso diário.',
    annualValue: 1299,
    photos: [placeholder('Galaxy Buds2 Pro')],
  },
  {
    name: 'Sony WH-1000XM5',
    category: 'Fone',
    technicalDetails:
      'Headphone premium com cancelamento de ruído e excelente autonomia.',
    annualValue: 2399,
    photos: [placeholder('Sony WH-1000XM5')],
  },
  {
    name: 'Apple Watch SE GPS',
    category: 'Smartwatch',
    technicalDetails:
      'Monitoramento de atividades, sono, notificações e integração com iPhone.',
    annualValue: 2499,
    photos: [placeholder('Apple Watch SE')],
  },
  {
    name: 'Galaxy Watch6 44mm',
    category: 'Smartwatch',
    technicalDetails:
      'Tela AMOLED, sensores corporais e integração com Android.',
    annualValue: 2199,
    photos: [placeholder('Galaxy Watch6')],
  },
  {
    name: 'PlayStation 5 Slim',
    category: 'Console',
    technicalDetails:
      'Console com SSD de alta velocidade, ray tracing e suporte a 4K.',
    annualValue: 2399,
    photos: [placeholder('PS5 Slim')],
  },
  {
    name: 'Xbox Series X',
    category: 'Console',
    technicalDetails:
      'Console de alta performance com SSD e foco em jogos em alta resolução.',
    annualValue: 2599,
    photos: [placeholder('Xbox Series X')],
  },
];

const products: SeedProduct[] = [...officialProducts, ...extraProducts];

async function main() {
  await prisma.$transaction([
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.product.deleteMany(),
  ]);

  await prisma.product.createMany({
    data: products.map((product) => ({
      name: product.name,
      category: product.category,
      technicalDetails: product.technicalDetails,
      annualValue: product.annualValue,
      photos: product.photos,
    })),
  });

  console.log(`Seed finalizado com ${products.length} produtos.`);
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });