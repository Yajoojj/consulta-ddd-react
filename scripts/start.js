const { spawn } = require('child_process');

const extraArgs = process.argv.slice(2);
const wantsWeb = extraArgs[0] === 'web' || extraArgs.includes('--web');

const expoArgs = wantsWeb ? ['expo', 'start', '--web'] : ['expo', 'start'];

const child = spawn('npx', expoArgs, {
  stdio: 'inherit',
  shell: true,
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});