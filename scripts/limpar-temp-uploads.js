const fs = require('fs');
const path = require('path');

const diretorio = path.join(process.cwd(), 'public', 'temp-uploads');

// Cria o diretório se não existir
if (!fs.existsSync(diretorio)) {
  fs.mkdirSync(diretorio, { recursive: true });
}

// Limpa arquivos existentes
fs.readdir(diretorio, (err, arquivos) => {
  if (err) throw err;

  for (const arquivo of arquivos) {
    fs.unlink(path.join(diretorio, arquivo), err => {
      if (err) throw err;
    });
  }
});