const fs = require('fs');
const path = require('path');

const infraDir = path.join(__dirname, 'src', 'infra');

fs.readdirSync(infraDir).forEach(file => {
    const fullPath = path.join(infraDir, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith('.js')) {
        require(fullPath);
    }
});
