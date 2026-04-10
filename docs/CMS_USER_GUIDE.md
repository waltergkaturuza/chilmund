# Chilmund CMS user guide (Payload)

This guide is for **content editors and admins** using the Payload admin panel for the Chilmund site. It matches the collections and globals defined in this project.

---

## 1. Signing in and finding your way around

1. Open your site’s **admin URL** (for local development it is usually `http://localhost:3000/admin`; production will be your domain + `/admin`).
2. Sign in with the **email and password** your administrator created for you.
3. The **left sidebar** is grouped like a large event / ops admin (section headers in **ALL CAPS**):
   - **CONTENT** — Pages, Posts, Products, Media, Categories, Search results.
   - **MANAGEMENT** — **Forms** and **Form submissions** (leads / enquiries).
   - **SITE** — **Header & main menu**, **Footer links**, **Company contact & CTAs** (globals).
   - **CONFIGURATION** — **Redirects**.
   - **ADMINISTRATION** — **Users** (who can log in).

   (Payload orders these groups **alphabetically** by label.)

---

## 2. Pages (main website pages)

Pages are the primary way to build **static-style** routes such as Home, About, Contact, and corporate sections. Each page has a **slug** that becomes part of the public URL.

| Slug in CMS   | Public URL (typical) |
|---------------|----------------------|
| `home`        | `/` (homepage)      |
| `contact`     | `/contact`          |
| `about-chilmund` | `/about-chilmund` |

**Important:** The homepage must use the slug **`home`**. Other pages should use **lowercase**, **hyphens** between words, and **no spaces** (e.g. `products-services`, not `Products & Services` as a slug—the **title** can still be “Products & Services”).

### 2.1 Creating your first page (step by step)

1. In the sidebar, click **Pages**.
2. Click **Create New** (or **Create new Page** in the empty state).
3. Fill in **Title** (e.g. “Contact us”). The **slug** is usually generated from the title; adjust it if needed (e.g. `contact`).
4. Use the **tabs** at the top of the editor:
   - **Hero**
   - **Page sections**
   - **SEO**

### 2.2 Hero tab

The hero is the **top block** of the page (headline area, optional image, buttons).

1. **Type**
   - **None** — no hero layout; page starts with your sections only.
   - **Low impact** — simple intro (good for inner pages).
   - **Medium impact** / **High impact** — stronger layouts; **Media** (image) becomes **required** for these types.
2. **Rich text** — headings and text for the hero (use the toolbar for bold, headings, lists, links).
3. **Links** — optional buttons (up to two). Each link can be:
   - **Internal link** — pick a **Page**, **Post**, or **Product**.
   - **Custom URL** — e.g. `/products` or `https://…`.
4. **Media** — only when type is Medium or High Impact: choose an image from **Media**.

### 2.3 Page sections tab (layout blocks)

Here you build the **body** of the page by adding **blocks** (stacked sections). Available block types include:

| Block            | Typical use |
|------------------|-------------|
| **Content**      | Multi-column rich text; good for prose and policies. |
| **Call to action** | Prominent message + buttons. |
| **Media**        | Image or embed from the Media library. |
| **Archive**      | Listing of posts (e.g. news-style feed). |
| **Form**         | Embed a form you created under **MANAGEMENT → Forms**. |

**Example — simple text page**

1. Open **Page sections**.
2. Click **Add block** → **Content**.
3. Add one or more **columns**, set width (e.g. **Full**), and type in the rich text.
4. Add more blocks if you need more sections (repeat).

**Minimum:** The **layout** field is **required**. If you truly want an empty body, add a single small **Content** block and a short line of text, or use **Hero** only with hero type **None** and one minimal **Content** block—your editor workflow may prefer always having at least one block.

### 2.4 SEO tab

This controls **search and sharing** metadata (title, description, image). The plugin can **generate** suggestions from your content—use the generate actions where available.

- **Meta title** — browser tab / search result title (often shorter than the on-page title).
- **Meta description** — short summary for Google and social snippets.
- **Meta image** — pick from **Media** (og:image).

Filling SEO is **recommended** for important public pages.

### 2.5 Publishing, drafts, and scheduling

This project uses **draft versions**:

- Save work in progress with **Save draft**.
- When ready, use **Publish** (or your admin’s equivalent) so **visitors** can see the page.
- **Schedule publish** may be available for publishing at a future date/time—check the sidebar / version UI.

**Published at** may be set automatically when you publish; it is used for sorting and sometimes display.

### 2.6 List view: search, columns, filters

On **Pages** (list screen):

- **Search by Title** — quick text search.
- **Columns** — show or hide columns (e.g. slug, dates).
- **Filters** — narrow by status or other criteria.

If you see **“No results”**, either no pages exist yet or filters exclude everything—clear filters and try again.

### 2.7 Live preview and preview

Where configured, **Live preview** / **Preview** opens the **front-end** page while you edit. Use it to check hero, layout, and long copy before publishing.

---

## 3. Media (images and files)

Upload assets **before** you need them in a hero or block.

1. Go to **Media** → **Create New**.
2. Upload the file; add **alt text** where the field exists (important for accessibility and SEO).
3. Save.

Then in **Pages** (or **Products** / **Posts**), pick the file from the **upload** / relationship fields.

---

## 4. Posts (news / blog)

**Posts** are dated articles, usually shown under routes like `/posts/[slug]` (depending on your front-end).

Typical workflow:

1. **Categories** — optional but useful: create categories under **Categories** first.
2. **Posts** → **Create New** — title, slug, hero/content blocks (similar ideas to pages), categories, SEO.
3. Publish when ready.

**Search:** This project’s search integration indexes **posts** (and **products**). Publishing helps them appear in site search where implemented.

---

## 5. Products (catalog)

Products are **not** normal pages; they live at **`/products/[slug]`** (e.g. `/products/aluminium-sulphate`).

1. **Products** → **Create New**.
2. Set **Title** and **Slug**.
3. Sidebar: **Published on website** — must be enabled for the item to appear in the public catalog and typical listings.
4. Fill **Overview**, specs, downloads, **SEO** as needed.
5. Save / publish per your draft workflow.

**Linking to the catalog from the menu:** use a **Custom URL** of **`/products`** (see Header section below).

---

## 6. Header & main menu (global)

**Globals** are singletons: one shared **Header** for the whole site.

1. Open **SITE** → **Header & main menu**.
2. **Main menu** — array of items, each either:
   - **Single link** — one **Link** (internal page/post/product or custom URL).
   - **Dropdown group** — **Dropdown label** (e.g. “Company”) plus **Sub-links** (each sub-link is a full link).

**Internal link example**

- Type: **Internal link**
- **Document to link to:** choose **Pages** → “About Chilmund”
- **Label:** “About Chilmund” (text shown in the menu)

**Custom URL example (product catalog)**

- Type: **Custom URL**
- **URL:** `/products`
- **Label:** “Product catalog”

### Suggested structure (reference)

Your codebase includes a recommended blueprint (slugs should match **Pages** you create):

| Top item | Type | Notes |
|----------|------|--------|
| Home | Single link | Page slug `home` |
| Company | Dropdown | Sub-links: about, manufacturing, logistics, markets, partnerships, SHEQ, CSR, awards (each pointing at the matching page slug) |
| Products & services | Dropdown | Overview page, uses page, **Custom URL** `/products` for catalog |
| News & events | Single link | Page slug e.g. `news` (or link to posts index if you use that URL) |
| Contact | Single link | Page slug `contact` |

The admin **Live site tips** tab on the Header global summarizes this blueprint.

---

## 7. Footer links (global)

**Footer links** — **SITE** → **Footer links**.

- Add rows; each row is a **link** (internal or custom), same pattern as header links.
- Good for legal pages, privacy, secondary “Contact”, social URLs, etc.

---

## 8. Company contact & CTAs (global)

**Company contact & CTAs** holds **phones, emails, addresses, WhatsApp, map embed**, and options like **floating contact buttons**.

- Update fields in each tab; changes apply site-wide (footer, structured data, quote flows where wired).
- **Google Maps** embed URL: only use trusted embed URLs from your map provider as documented in your project.

---

## 9. Forms and submissions

Under **MANAGEMENT**:

1. **Forms** — define fields, validation, confirmation message, emails (per your form builder configuration).
2. **Form submissions** — read entries visitors submitted.

To show a form on a **Page**: in **Page sections**, add a **Form** block and select the form.

---

## 10. Redirects

**CONFIGURATION** → **Redirects**.

- **From:** old path (as configured in admin—often site-relative).
- **To:** new path or full URL.

Use when URLs change so bookmarks and search results don’t 404. Large redirect changes may require a **redeploy** or cache refresh depending on hosting.

---

## 11. Search results collection

**Search results** is maintained by the system from **posts** and **products** (for site search). You normally **do not** hand-create these documents; focus on publishing good **Posts** and **Products** with titles and content.

---

## 12. Users and access

**Administration** → **Users**:

- Only users who appear here (with appropriate roles) can log into `/admin`.
- Do not share passwords; use **separate accounts** per person where possible.

---

## 13. End-to-end example: “Contact us” in the menu

**Goal:** A public **Contact** page at `/contact`, linked from the top bar.

1. **Pages** → **Create New**  
   - Title: `Contact us`  
   - Slug: `contact`
2. **Hero** — e.g. **Low impact**, short rich text (“Get in touch”).  
3. **Page sections** — add **Content** with address, hours, or embed a **Form** for enquiries.  
4. **SEO** — meta title/description.  
5. **Publish** the page.  
6. **SITE** → **Header & main menu** — add or edit a **Single link**:  
   - Internal link → Page **Contact us**  
   - Label: `Contact`  
7. Save the global.  
8. Open the live site: `/contact` should load, and **Contact** should appear in the header.

---

## 14. Corporate page checklist (optional)

These slugs align with the recommended sitemap in the project (`src/content/siteStructure.ts`). Create a **Page** for each you need; titles can be longer and human-readable.

| Suggested slug | Example title |
|----------------|---------------|
| `home` | Home |
| `about-chilmund` | About Chilmund |
| `products-services` | Products & Services |
| `uses-aluminium-sulphate` | Uses of Aluminium Sulphate |
| `manufacturing-plant` | Manufacturing Plant |
| `trucking-logistics` | Trucking & Logistics |
| `regional-markets` | Regional Markets |
| `partnerships-accreditations` | Partnerships & Accreditations |
| `sheq` | SHEQ |
| `csr` | CSR |
| `industry-awards` | Industry Awards |
| `news` | News & Events |
| `contact` | Contact Us |

---

## 15. Troubleshooting (admin errors)

### “Failed to load resource” / **403** on `…/api/media?…`

- **Meaning:** The browser asked your site’s API for the **Media** list; the server answered **403 Forbidden** (not allowed).
- **Common causes on Vercel:**
  1. **Deployment Protection** (Vercel login wall on preview/production) — API routes can return **403** for guests. Use an allowed session or disable protection for the deployment you use for editing.
  2. **Wrong site URL** — Admin should be on the **same hostname** as your configured `NEXT_PUBLIC_SERVER_URL` (e.g. don’t mix `www` and non-`www` if cookies don’t match).
  3. **Folder + access control** — With **Browse by folder** enabled for Media, Payload also uses the **`payload-folders`** collection. If folder reads require login but the request runs without a valid session, you can see **403** on media-related calls. This project aligns folder **read** access with **Media** (public read for listing); redeploy after updates if your developer changed that.

**What to do:** Open DevTools → **Network** → click the red **`media`** request → **Response** tab. Note the JSON `message` if any. Ask your developer to check **Vercel** protection settings and **environment variables** (`PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, database URL).

### **500** on `/api/...`

Usually a **server or database** error. Check the deployment **logs** (Vercel → Functions / Runtime logs) for the stack trace—not only the browser console.

---

## 16. Where to get help

- **Payload documentation:** [https://payloadcms.com/docs](https://payloadcms.com/docs)  
- **This project** — developers can point you to `src/collections` and `src/globals` for field-level detail.

If something on the live site doesn’t update after a change, note whether you **published** the document and whether your host uses **caching**; your technical contact may need to revalidate or redeploy.
