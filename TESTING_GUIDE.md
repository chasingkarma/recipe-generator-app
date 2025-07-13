# Testing Guide - Vegetarian Recipe Generator

## 🧪 **Updated Test Scenarios**

### **Test A: Force AI Recipes Only**
1. **Open browser console** (F12)
2. **Change CONFIG.FORCE_AI_RECIPES to true** in the code
3. **Select**: "Poha", "Semolina", "Urad Dal"
4. **Expected**: Only yellow "AI Generated" badges
5. **Why**: Forces AI recipes for testing

### **Test B: Mixed API + AI (Current Behavior)**
1. **Keep CONFIG.FORCE_AI_RECIPES as false**
2. **Select**: "Onion", "Tomato", "Potato"
3. **Expected**: Green "Spoonacular" badges
4. **Why**: Common ingredients = many real recipes

### **Test C: Additional Ingredients Debug**
1. **Select**: "Onion", "Carrot"
2. **Add in "Other Vegetables"**: "zucchini, broccoli"
3. **Click "Find Recipes"**
4. **Check console** for: "Added additional ingredients: ['zucchini', 'broccoli']"
5. **Expected**: Recipes using zucchini and broccoli

### **Test D: Debug Mode**
1. **Open console** (F12)
2. **Select any ingredients**
3. **Click "Find Recipes"**
4. **Check console** for:
   - "Selected ingredients: [...]"
   - "Found X API recipes and Y AI recipes"
   - "Recipe type scores: {...}"

## 🔧 **Configuration Options**

```javascript
const CONFIG = {
    SPOONACULAR_API_KEY: 'your-key',
    ENABLE_API_RECIPES: true,        // Turn API on/off
    MAX_API_RECIPES: 5,              // Max API recipes
    MAX_GENERATED_RECIPES: 3,        // Max AI recipes
    FORCE_AI_RECIPES: false,         // Force AI only (for testing)
    DEBUG_MODE: true                 // Console logging
};
```

## 🐛 **Issue Explanations**

### **Why Only Spoonacular Recipes?**
- **Test 4 & 5**: Spoonacular has many recipes with those ingredients
- **This is GOOD** - real recipes are better than AI ones
- **To see AI recipes**: Use very specific Indian ingredients or enable FORCE_AI_RECIPES

### **Why No Zucchini Recipes?**
- **Possible reasons**:
  1. Zucchini not in Spoonacular's vegetarian database
  2. API search didn't find matches
  3. Additional ingredients not processed correctly
- **Debug**: Check console for "Added additional ingredients"

### **How to Force AI Recipes**
```javascript
// Change this line in the code:
FORCE_AI_RECIPES: true  // Forces AI recipes only
```

## 📊 **Expected Results by Test**

| Test | Ingredients | Expected | Why |
|------|-------------|----------|-----|
| **A** | Poha, Semolina, Urad Dal | 🟡 AI only | Very specific Indian ingredients |
| **B** | Onion, Tomato, Potato | 🟢 API only | Common ingredients |
| **C** | Onion + zucchini | Mixed | Additional ingredients included |
| **D** | Any combination | Mixed | Debug mode shows details |

## 🔍 **Debugging Steps**

1. **Open browser console** (F12)
2. **Select ingredients**
3. **Click "Find Recipes"**
4. **Check console output**:
   - Selected ingredients list
   - API vs AI recipe counts
   - Additional ingredients processing
   - Recipe type prioritization

## 🎯 **Success Criteria**

✅ **Start Over** completely resets everything  
✅ **API recipes** show green badges  
✅ **AI recipes** show yellow badges  
✅ **Additional ingredients** are processed and logged  
✅ **Debug mode** shows detailed console output  
✅ **Color-coded ingredients** work in recipe details  
✅ **Fallback** works when API unavailable  

## 🚀 **Quick Tests**

### **Force AI Recipes Test**
1. Set `FORCE_AI_RECIPES: true`
2. Select any ingredients
3. Should see only yellow badges

### **Additional Ingredients Test**
1. Select basic ingredients
2. Add "zucchini, broccoli" in additional vegetables
3. Check console for processing log
4. Look for recipes with those ingredients

### **Debug Mode Test**
1. Keep `DEBUG_MODE: true`
2. Select ingredients and find recipes
3. Check console for detailed logs 