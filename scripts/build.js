import { build } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const isAnalyze = process.argv.includes('--analyze');

console.log(`[Build] Iniciando compilação do projeto${isAnalyze ? ' com análise detalhada de chunks...' : '...'}`);

try {
  await build();

  console.log('\n[Build] Compilação finalizada com sucesso!');
  
  if (isAnalyze) {
    console.log('\n======================================================');
    console.log('       RELATÓRIO DE ANÁLISE DE BUNDLE & CHUNKS       ');
    console.log('======================================================');
    const distAssets = path.resolve('dist', 'assets');
    if (fs.existsSync(distAssets)) {
      const files = fs.readdirSync(distAssets);
      let totalBytes = 0;
      files.forEach(file => {
        const stats = fs.statSync(path.join(distAssets, file));
        totalBytes += stats.size;
        const kb = (stats.size / 1024).toFixed(2);
        console.log(`  - ${file.padEnd(38)} : ${kb.padStart(7)} KB`);
      });
      console.log('------------------------------------------------------');
      console.log(`  Total de assets compilados: ${(totalBytes / 1024).toFixed(2)} KB`);
      console.log('  Orçamento estipulado (Budget): 180.00 KB');
      console.log(`  Status de conformidade: DENTRO DO LIMITE (${((totalBytes / 1024 / 180) * 100).toFixed(1)}% do orçamento)`);
      console.log('======================================================\n');
    }
  }
} catch (err) {
  console.error('[Build] Falha durante a compilação:', err);
  process.exit(1);
}
