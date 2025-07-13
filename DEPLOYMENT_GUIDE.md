# Netlify Deployment Guide

## 🚀 **Deploy to Netlify**

### **Option 1: Deploy from GitHub (Recommended)**

1. **Push your code to GitHub** (if not already done)
2. **Go to [Netlify](https://netlify.com)**
3. **Click "New site from Git"**
4. **Connect your GitHub account**
5. **Select your repository**
6. **Configure build settings**:
   - **Build command**: `echo 'Build completed - static site'`
   - **Publish directory**: `public`
7. **Click "Deploy site"**

### **Option 2: Drag & Drop Deployment**

1. **Zip your `public` folder**
2. **Go to [Netlify](https://netlify.com)**
3. **Drag the zip file to the deploy area**
4. **Wait for deployment to complete**

## ⚙️ **Configuration**

The `netlify.toml` file is already configured with:
- ✅ **Publish directory**: `public`
- ✅ **Build command**: Simple echo command
- ✅ **Redirects**: All routes go to index.html
- ✅ **Security headers**: Added for better security

## 🔧 **Environment Variables (Optional)**

If you want to change the API key for production:

1. **Go to Site Settings** in Netlify
2. **Environment Variables**
3. **Add**: `SPOONACULAR_API_KEY` = your production key

## 📱 **Testing the Deployed Site**

### **For Your Mom:**

1. **Share the Netlify URL** with her
2. **Test these features**:
   - ✅ **Ingredient selection** (checkboxes work)
   - ✅ **Find recipes** (API + AI recipes)
   - ✅ **Recipe details** (click on recipes)
   - ✅ **Color-coded ingredients** (green = have, red = need)
   - ✅ **Dietary restrictions** (try "no spicy food")
   - ✅ **Start Over button** (resets everything)

### **Test Scenarios for Mom:**

#### **Easy Test:**
1. **Select**: "Onion", "Tomato", "Potato"
2. **Click "Find Recipes"**
3. **Click on a recipe** to see details
4. **Check**: Green badges = real recipes, yellow = AI recipes

#### **Dietary Restriction Test:**
1. **Select**: "Paneer", "Spinach", "Tomato"
2. **Add in "Dietary Restrictions"**: "can't eat spicy food"
3. **Click "Find Recipes"**
4. **Check**: No recipes with chili or pepper

#### **Additional Ingredients Test:**
1. **Select**: "Onion", "Carrot"
2. **Add in "Other Vegetables"**: "zucchini, broccoli"
3. **Click "Find Recipes"**
4. **Check**: Recipes include zucchini and broccoli

## 🎯 **What Mom Should See**

| Feature | What to Look For |
|---------|------------------|
| **Recipe Sources** | 🟢 Green badges = Real recipes, 🟡 Yellow = AI recipes |
| **Ingredients** | Color-coded: 🟢 Available, 🔴 Need to buy |
| **Dietary Filtering** | Fewer recipes when restrictions added |
| **Start Over** | Completely resets the app |
| **Navigation** | Previous/Next buttons in recipe details |

## 🐛 **Troubleshooting**

### **If Recipes Don't Load:**
- Check browser console (F12) for errors
- Verify internet connection (API needs internet)
- Try different ingredients

### **If API Recipes Don't Show:**
- Check if API key is valid
- Look for console warnings about API key
- Should fall back to AI recipes

### **If Site Doesn't Load:**
- Check Netlify deployment status
- Verify `public` folder contains all files
- Check for build errors in Netlify dashboard

## 📞 **Support for Mom**

**If she has issues:**
1. **Check browser console** (F12) for error messages
2. **Try different ingredients** if recipes don't load
3. **Clear browser cache** if site seems broken
4. **Use "Start Over"** if something gets stuck

The deployed site should work exactly like the local version, but accessible to anyone with the URL! 