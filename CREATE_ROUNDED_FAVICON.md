# How to Create Rounded Corner Favicon

## Quick Solution (Recommended)

Since we need an actual image file with rounded corners, here's the easiest way:

### Option 1: Online Tool (Easiest)

1. Go to [favicon.io](https://favicon.io/favicon-converter/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload your `logo.jpeg` file
3. Enable "Rounded corners" option
4. Download the generated favicon files
5. Place `favicon.ico` in the `public` folder
6. Update `app/layout.tsx` to use it

### Option 2: Manual Edit

1. Open `logo.jpeg` in an image editor (Photoshop, GIMP, or free online: [Photopea.com](https://www.photopea.com))
2. Create rounded rectangle selection (border radius ~15-20%)
3. Apply mask/crop to create rounded corners
4. Export as PNG (32x32, 64x64, or 512x512)
5. Save as `public/favicon-rounded.png`
6. Update layout.tsx

### Option 3: Use CSS Mask (Temporary Solution)

I can create a wrapper that applies rounded corners via CSS, but this won't affect the actual favicon file browsers cache.

---

## Current Setup

The favicon is currently set to use `/logo.jpeg` in `app/layout.tsx`.

To use a rounded version:
1. Create the rounded favicon file (using Option 1 or 2 above)
2. Update the icon path in `app/layout.tsx`

Would you like me to update the code to use a rounded favicon once you create the file?

