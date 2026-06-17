# Cinema Ghar — GitHub + Cloudflare Pages Deployment Guide (Mobile)

Ye guide poori tarah mobile se GitHub + Cloudflare Pages par deploy karne ke liye hai — koi computer/terminal nahi chahiye.

## Part 1: GitHub par code daalna

**Sabse aasan tareeka — git client app se** (folder structure perfectly preserve hota hai):

- **Android**: "Termux" app install karein (Play Store/F-Droid). Usme: zip extract karein, phir `git init`, `git add .`, `git commit`, aur `git remote add origin <apni repo URL>` + `git push` chalayein.
- **iPhone**: "Working Copy" app install karein — isme zip import karke directly GitHub repo bana sakte hain aur push kar sakte hain, sab touch-based UI se.

**Bina extra app ke (manual, thoda slow par reliable)**:

1. github.com par jaayein, login karein, naya repository banayein (jaise `cinema-ghar`).
2. Repo ke andar **"Add file" -> "Create new file"** par click karein.
3. File ka naam likhte waqt poora path type karein, jaise `css/style.css` -- GitHub automatically folder bana dega.
4. Iss zip mein se har file ka content copy karke paste karein, "Commit" dabayein.
5. Yeh repeat karein har file ke liye: `index.html`, `css/style.css`, `js/app.js`, `functions/api/seed.js`, `functions/api/movies.js`, `functions/api/movies/[id].js`.

(`server.js`, `package.json`, `data/movies.json` Cloudflare deployment ke liye zaroori nahi hain -- wo sirf local computer testing ke liye hain, GitHub par skip kar sakte hain.)

## Part 2: Cloudflare Pages par deploy karna

1. dash.cloudflare.com par login/signup karein (mobile browser se bhi chal jaata hai).
2. Left menu mein **"Workers & Pages"** -> **"Create"** -> **"Pages"** tab -> **"Connect to Git"**.
3. Apni GitHub account connect karein, `cinema-ghar` repo select karein.
4. Build settings mein:
   - Build command: **khaali chhod dein**
   - Build output directory: **/** (ya khaali chhod dein)
5. **"Save and Deploy"** dabayein. 1-2 minute mein website live ho jaayegi (URL jaisa `cinema-ghar.pages.dev`).

## Part 3: KV Storage setup (admin "add movie" feature ke liye zaroori)

1. Cloudflare dashboard mein **"Workers & Pages"** -> **"KV"** section mein jaayein -> **"Create a namespace"** -> naam dein (jaise `movies-kv`) -> Create.
2. Apne Pages project ke **Settings -> Functions -> KV namespace bindings** mein jaayein.
3. **"Add binding"**: Variable name = `MOVIES_KV`, KV namespace = wahi jo aapne banaya (`movies-kv`). Save karein.
4. Project ko **redeploy** karein (Settings ya Deployments tab se "Retry deployment").

## Part 4: Shuruati movies seed karna

Deploy hone ke baad, apne mobile browser mein ye URL kholein (apne actual domain se):

```
https://cinema-ghar.pages.dev/api/seed
```

Ek baar yeh khol lene se 4 shuruati movies database mein add ho jaayengi. Bas, website fully ready hai!

## Troubleshooting

- **"MOVIES_KV binding nahi mila" error** -> Part 3 ke steps dobara check karein, aur redeploy karna na bhoolen.
- **Admin se movie add nahi ho rahi** -> pehle `/api/seed` zaroor visit karein, taaki KV mein base data ho.
- **Website blank dikh rahi hai** -> build output directory setting check karein, "/" hona chahiye.

## Local computer par test karna (optional)

Agar kabhi computer par bhi test karna ho:
```
npm install
npm start
```
phir http://localhost:3000 kholein. Ye `server.js` (Express) use karta hai, alag se, Cloudflare se independent.
