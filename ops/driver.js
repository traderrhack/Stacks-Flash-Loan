
import { processFeature } from './automator.js';

const features = [
    {
        name: "initial-setup",
        type: "chore",
        scope: "project",
        description: "Initialize project structure, gitignore, and basic configuration.",
        files: [
            {
                path: ".gitignore",
                content: `node_modules/\ndist/\n.env\n.DS_Store\ncoverage/\n.Clarinet/`
            },
            {
                path: "README.md",
                content: `# Stacks Flash Loans\n\nHigh-performance flash loan provider on Stacks blockchain.\n\n## Tech Stack\n- Clarity\n- React\n- Stacks.js`
            }
        ]
    },
    {
        name: "update-clarinet-config",
        type: "config",
        scope: "clarity",
        description: "Update Clarinet configuration to Clarity 4 and Epoch 3.3.",
        files: [
            {
                path: "Clarinet.toml",
                content: `[project]
name = 'stacks-flash-loans'
description = ''
authors = []
telemetry = false
cache_dir = './.cache'

[[project.requirements]]
contract_id = 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard'

[contracts.flasher]
path = 'contracts/flasher.clar'
clarity_version = 4
epoch = 3.3

[contracts.flashloans-trait]
path = 'contracts/flashloans-trait.clar'
clarity_version = 4
epoch = 3.3

[contracts.mock-flash-recipient]
path = 'contracts/mock-flash-recipient.clar'
clarity_version = 4
epoch = 3.3

[contracts.mock-token]
path = 'contracts/mock-token.clar'
clarity_version = 4
epoch = 3.3

[repl.analysis]
passes = ['check_checker']

[repl.analysis.check_checker]
strict = false
trusted_sender = false
trusted_caller = false
callee_filter = false

[repl.remote_data]
enabled = false
api_url = 'https://api.hiro.so'
`
            }
        ]
    },
    {
        name: "setup-vite-react",
        type: "feat",
        scope: "frontend",
        description: "Scaffold Vite + React application structure.",
        files: [
            {
                path: "index.html",
                content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stacks Flash Loans</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
            },
            {
                path: "vite.config.ts",
                content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`
            },
            {
                path: "src/vite-env.d.ts",
                content: `/// <reference types="vite/client" />`
            },
            {
                path: "package.json",
                content: `{
  "name": "stacks-flash-loans",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@stacks/connect": "^7.3.0",
    "@stacks/network": "^6.0.0",
    "@stacks/transactions": "^6.0.0",
    "@hirosystems/chainhooks-client": "^1.0.0" 
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`
            }
        ]
    }
];

async function main() {
    for (const feature of features) {
        await processFeature(feature);
    }
}

main().catch(console.error);
