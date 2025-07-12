# Deploy to Netlify - Step by Step Guide

## Option 1: Drag & Drop (Easiest)

1. **Prepare your files**:
   - Copy the `public` folder contents to a new folder
   - Rename `static-index.html` to `index.html`
   - Delete the old `index.html` and `index.php` files

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with your GitHub account
   - Drag and drop your folder to the Netlify dashboard
   - Your site will be live instantly!

## Option 2: GitHub Integration (Recommended)

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow the instructions to push your code

3. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Set build settings:
     - Build command: (leave empty)
     - Publish directory: `public`
   - Click "Deploy site"

## Option 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd public
   netlify deploy
   ```

## File Structure for Netlify

Your `public` folder should contain:
```
public/
├── index.html          # Main page (renamed from static-index.html)
├── css/
│   └── style.css      # Styles
├── js/
│   └── app.js         # JavaScript (optional, embedded in HTML)
└── README.md          # Optional
```

## Custom Domain (Optional)

1. **Add custom domain**:
   - Go to your site settings in Netlify
   - Click "Domain settings"
   - Add your custom domain
   - Follow the DNS instructions

## Benefits of Netlify

- ✅ **Free hosting**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Custom domains**
- ✅ **Form handling**
- ✅ **Git integration**
- ✅ **Instant deployments**

## Share Your Site

Once deployed, you'll get a URL like:
`https://your-site-name.netlify.app`

Share this URL with friends and family - they can access it from anywhere!

## Troubleshooting

- **404 errors**: Make sure `index.html` is in the root of your public folder
- **Styling issues**: Check that CSS file paths are correct
- **JavaScript errors**: Open browser console to debug

## Next Steps

After deployment:
1. Test all features work correctly
2. Share the URL with friends/family
3. Consider adding a custom domain
4. Monitor site analytics in Netlify dashboard 