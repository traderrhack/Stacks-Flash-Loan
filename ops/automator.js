
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPO_ROOT = process.cwd();

function run(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (e) {
        console.error(`Command failed: ${command}`);
        throw e;
    }
}

function runQuiet(command) {
    try {
        return execSync(command, { encoding: 'utf8' }).trim();
    } catch (e) {
        return '';
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Ensure conventional commit format
function formatCommitMessage(type, scope, message) {
    return `${type}(${scope}): ${message}`;
}

/**
 * processFeature
 * @param {Object} feature
 * @param {string} feature.name - Name of the feature (used for branch name)
 * @param {string} feature.type - Commit type (feat, fix, docs, etc.)
 * @param {string} feature.scope - Commit scope
 * @param {string} feature.description - Commit message
 * @param {Array<{path: string, content: string}>} feature.files - Files to write
 */
export async function processFeature(feature) {
    const branchName = `feat/${feature.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    console.log(`\n=== Processing Feature: ${feature.name} ===`);
    
    // 1. Create and Checkout Branch
    run(`git checkout -b ${branchName}`);
    
    // 2. Write Files (Micro-commits per file could be done here, but usually a feature touches multiple files)
    // The user wants "Break every feature into the smallest possible commits". 
    // So we iterate files and commit each one.
    
    for (const file of feature.files) {
        const absolutePath = path.join(REPO_ROOT, file.path);
        const dir = path.dirname(absolutePath);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Check if file exists to determine if it's 'create' or 'update'
        const exists = fs.existsSync(absolutePath);
        
        fs.writeFileSync(absolutePath, file.content);
        
        // 3. Add and Commit
        run(`git add "${file.path}"`);
        
        const action = exists ? 'update' : 'create';
        const msg = formatCommitMessage(feature.type, feature.scope, `${action} ${path.basename(file.path)} for ${feature.name}`);
        
        try {
            run(`git commit -m "${msg}"`);
        } catch (e) {
            console.log("Nothing to commit or commit failed, continuing...");
        }
    }

    // 4. Push Branch
    try {
        run(`git push -u origin ${branchName}`);
    } catch (e) {
        console.error("Push failed (maybe remote not set?), continuing local...");
    }

    // 5. Create PR (if GH CLI is available)
    try {
        const prBody = `
## ${feature.name}

### Description
${feature.description}

### Changes
${feature.files.map(f => `- ${f.path}`).join('\n')}

### Type of Change
- [x] ${feature.type}
`;
        // Write body to temp file to avoid escaping issues
        fs.writeFileSync('pr_body.md', prBody);
        
        // Check if PR already exists? No, new branch.
        run(`gh pr create --title "${feature.type}: ${feature.name}" --body-file pr_body.md --base main`); // Assuming main is default
        fs.unlinkSync('pr_body.md');
        
        // 6. Merge PR
        // Get the PR number we just created? Or just merge the branch.
        // run(`gh pr merge --merge --auto --delete-branch`); 
        // "Auto-merge all PRs"
        run(`gh pr merge ${branchName} --merge --delete-branch`);

        // Switch back to main and pull
        run(`git checkout main`);
        run(`git pull origin main`);

    } catch (e) {
        console.error("PR Automation failed (gh cli might be missing or auth failed).");
        console.error(e.message);
        // Fallback: Merge locally
        run(`git checkout main`);
        run(`git merge ${branchName}`);
    }
}
