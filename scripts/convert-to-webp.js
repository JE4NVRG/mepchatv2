// Script para converter imagens PNG/JPG para WebP
// Requer: npm install sharp

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de imagens para converter
const imagesToConvert = [
  'beneficio-cpfcnpj.png',
  'beneficio-historico.png', 
  'beneficio-multi.png',
  'beneficio-setores.png',
  'case-clinica.png',
  'case-loja.png',
  'case-oficina.png',
  'og-image.png',
  'pricing-tabela.png',
  'recurso-conexao.png',
  'recurso-multinumero.png',
  'recurso-relatorios.png',
  'recurso-respostas.png',
  'recurso-transfer.png',
  'segmentos-negocio.png',
  'hero-dashboard.png'
];

// Função principal
async function convertToWebP() {
  try {
    const sharp = (await import('sharp')).default;
    console.log('✅ Sharp encontrado! Convertendo imagens...');
    
    const publicDir = path.join(__dirname, '..', 'public');
    let convertedCount = 0;
    
    for (const imageName of imagesToConvert) {
      const inputPath = path.join(publicDir, imageName);
      const outputPath = path.join(publicDir, imageName.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      
      if (fs.existsSync(inputPath)) {
        try {
          await sharp(inputPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(outputPath);
          
          console.log(`✅ Convertido: ${imageName} -> ${path.basename(outputPath)}`);
          convertedCount++;
        } catch (conversionError) {
          console.log(`❌ Erro ao converter ${imageName}:`, conversionError.message);
        }
      } else {
        console.log(`⚠️  Arquivo não encontrado: ${imageName}`);
      }
    }
    
    console.log(`\n🎉 Conversão concluída! ${convertedCount} imagens convertidas.`);
    console.log('\n📝 Próximos passos:');
    console.log('1. Verifique se todas as imagens WebP foram criadas');
    console.log('2. Teste o componente OptimizedImage');
    console.log('3. Monitore o desempenho no DevTools');
    
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      console.log('📦 Sharp não está instalado. Instale com:');
      console.log('npm install sharp --save-dev');
      console.log('\nOu use uma ferramenta online como:');
      console.log('- https://squoosh.app/');
      console.log('- https://convertio.co/png-webp/');
      console.log('\n💡 Dica: Mantenha as imagens PNG como fallback');
    } else {
      console.error('❌ Erro na conversão:', error.message);
    }
  }
}

// Executa a conversão
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🚀 Iniciando conversão para WebP...');
  convertToWebP();
}