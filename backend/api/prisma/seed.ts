import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

async function main() {
    await prisma.product.createMany({
    data: [

      {
        name: 'Notebook Acer Nitro V RTX 3050',
        category: 'Notebook',
        technicalDetails:
          'RTX 3050 6GB, Intel Core i5 13ª geração, 8GB RAM, SSD 512GB, Tela 15.6 Full HD 144Hz.',
        annualValue: 2508,
        photos: [
          'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B2%2520%25281%2529.jpeg',
          'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B3%2520%25281%2529.jpeg',
          'https://images.digital.allugator.com/products/Acer%252BNitro%252B5%252B3050%252B4%2520%25281%2529.jpeg'
        ]
      },

      {
        name: 'Notebook Dell G15 RTX 3050',
        category: 'Notebook',
        technicalDetails:
          'RTX 3050, Intel Core i5 12ª geração, 16GB RAM, SSD 512GB, Tela 15.6 Full HD 120Hz.',
        annualValue: 2899,
        photos: [
          'https://images.digital.allugator.com/products/dell-g15-1.webp',
          'https://images.digital.allugator.com/products/dell-g15-2.webp'
        ]
      },

      {
        name: 'MacBook Air M2',
        category: 'Notebook',
        technicalDetails:
          'Chip Apple M2, 8GB RAM, SSD 256GB, Tela Retina 13.6, bateria de longa duração.',
        annualValue: 4999,
        photos: [
          'https://images.digital.allugator.com/products/macbook-air-m2-1.webp',
          'https://images.digital.allugator.com/products/macbook-air-m2-2.webp'
        ]
      },

      {
        name: 'Desktop Gamer Predator Orion RTX 3070',
        category: 'Desktop',
        technicalDetails:
          'Intel Core i7, RTX 3070 8GB, 16GB RAM DDR4, SSD 1TB NVMe.',
        annualValue: 5999,
        photos: [
          'https://images.digital.allugator.com/products/acer%20orion%201.png',
          'https://images.digital.allugator.com/products/acer%20orion%202.webp'
        ]
      },

      {
        name: 'iPhone 14 128GB',
        category: 'Smartphone',
        technicalDetails:
          'Tela OLED 6.1, chip A15 Bionic, câmera dupla 12MP, FaceID.',
        annualValue: 3999,
        photos: [
          'https://images.digital.allugator.com/products/iphone14-1.webp',
          'https://images.digital.allugator.com/products/iphone14-2.webp'
        ]
      },

      {
        name: 'Samsung Galaxy S23',
        category: 'Smartphone',
        technicalDetails:
          'Snapdragon 8 Gen 2, tela AMOLED 120Hz, 8GB RAM, câmera 50MP.',
        annualValue: 3599,
        photos: [
          'https://images.digital.allugator.com/products/s23-1.webp',
          'https://images.digital.allugator.com/products/s23-2.webp'
        ]
      },

      {
        name: 'iPad Air M1',
        category: 'Tablet',
        technicalDetails:
          'Chip M1, tela Liquid Retina 10.9, compatível com Apple Pencil.',
        annualValue: 3299,
        photos: [
          'https://images.digital.allugator.com/products/ipad-air-1.webp',
          'https://images.digital.allugator.com/products/ipad-air-2.webp'
        ]
      },

      {
        name: 'Apple Watch Series 9',
        category: 'Smartwatch',
        technicalDetails:
          'Tela Always-On Retina, GPS, monitoramento de saúde e exercícios.',
        annualValue: 2499,
        photos: [
          'https://images.digital.allugator.com/products/apple-watch-1.webp',
          'https://images.digital.allugator.com/products/apple-watch-2.webp'
        ]
      },

      {
        name: 'Notebook Lenovo Legion 5',
        category: 'Notebook',
        technicalDetails:
          'RTX 3060, Ryzen 7, 16GB RAM, SSD 1TB, tela 165Hz.',
        annualValue: 4299,
        photos: [
          'https://images.digital.allugator.com/products/legion-1.webp',
          'https://images.digital.allugator.com/products/legion-2.webp'
        ]
      },

      {
        name: 'Monitor Gamer LG UltraGear 27"',
        category: 'Monitor',
        technicalDetails:
          '27 polegadas, 144Hz, 1ms, painel IPS, resolução QHD.',
        annualValue: 1899,
        photos: [
          'https://images.digital.allugator.com/products/lg-ultragear-1.webp',
          'https://images.digital.allugator.com/products/lg-ultragear-2.webp'
        ]
      }

    ]
    })

    console.log('Seed executado com sucesso')
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })