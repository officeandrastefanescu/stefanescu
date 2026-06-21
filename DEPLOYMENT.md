# Deployment Documentation

## Site and repo
- GitHub repo: `https://github.com/officeandrastefanescu/stefanescu.git`
- Netlify project: `stefanescu-andra`
- Netlify site URL: `https://andrahartlieb.com`
- Netlify project ID: `b64ff6af-b96d-41e0-abde-8a2e4dcdd030`

## What was done
1. Verified this folder is a Git repository tracking `origin` on branch `master`.
2. Verified the Netlify CLI is installed and authenticated for the user `Andra Stefanescu`.
3. Confirmed `.netlify/state.json` contains the linked Netlify site ID.
4. Linked this local repo to the existing Netlify project with `netlify link --id b64ff6af-b96d-41e0-abde-8a2e4dcdd030`.
5. Published the current repo contents to Netlify with `netlify deploy --prod --dir . --message 'Publish latest local site changes'`.
6. Committed local changes and pushed them to GitHub with `git add -A`, `git commit -m 'Sync local site changes for Netlify publish'`, and `git push origin master`.

## Deploy next time
### Option 1: Update + push
1. Make your changes in the repo files.
2. Stage and commit your changes:
   ```powershell
   git add -A
   git commit -m "Describe the change"
   git push origin master
   ```
3. Netlify will usually deploy automatically when GitHub receives the push.

### Option 2: Manual Netlify production deploy
If you want to force an immediate deploy from the local machine:
```powershell
cd "C:\Users\Andra\Downloads\hello claude\stefanescu"
netlify deploy --prod --dir . --message "Publish latest local site changes"
```

### Option 3: Check Netlify link status
To confirm the repository is linked before deploying:
```powershell
cd "C:\Users\Andra\Downloads\hello claude\stefanescu"
netlify status
```

## Redirect from andrastefanescu.com
If you want `andrastefanescu.com` to redirect to `andrahartlieb.com`, add `andrastefanescu.com` as a custom domain alias in the Netlify site settings and point its DNS to Netlify. Then this repository already contains a redirect rule in `.netlify/netlify.toml`:

```toml
[[redirects]]
  from = "https://andrastefanescu.com/*"
  to = "https://andrahartlieb.com/:splat"
  status = 301
  force = true
```

The redirect will send all requests from `andrastefanescu.com` to the matching path on `andrahartlieb.com`.

## Notes
- The repository root is the Netlify publish directory.
- No build command is configured in this project; Netlify serves the files directly from the repo root.
- If you change the GitHub branch, make sure Netlify is set to deploy from `master` or update the branch in the Netlify UI.
