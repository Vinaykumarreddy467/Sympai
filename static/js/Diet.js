document.addEventListener('DOMContentLoaded', function() {
    const dietForm = document.getElementById('dietForm');
    const resultsSection = document.getElementById('results');
    const resetBtn = document.getElementById('resetBtn');
    const printBtn = document.getElementById('printBtn');
    const newRecipeBtn = document.getElementById('newRecipeBtn');
    
    // Cuisine toggle buttons
    const fusionBtn = document.getElementById('fusionBtn');
    const indianBtn = document.getElementById('indianBtn');
    const internationalBtn = document.getElementById('internationalBtn');
    
    // Diet plans database with fusion options
    const dietPlans = {
        beginner: {
            sedentary: {
                weightLoss: {
                    title: "Beginner | Sedentary Lifestyle | Goal: Weight Loss",
                    meals: [
                        { 
                            time: "Morning (6-7 AM)", 
                            food: {
                                indian: "Warm water with lemon + 5 soaked almonds or 2 walnuts",
                                international: "Green tea with mint + 5 walnuts",
                                fusion: "Warm water with lemon and honey + 5 soaked almonds"
                            },
                            calories: "~70 kcal",
                            alternatives: [
                                "Amla juice with turmeric",
                                "Jeera water with mint leaves",
                                "Herbal tea with cinnamon"
                            ]
                        },
                        { 
                            time: "Breakfast (8-9 AM)", 
                            food: {
                                indian: "1 cup vegetable poha with peanuts OR 2 moong dal chillas with mint chutney",
                                international: "Overnight oats with berries and chia seeds OR vegetable egg white omelette with whole grain toast",
                                fusion: "Vegetable upma with a side of Greek yogurt OR oats porridge with Indian spices"
                            },
                            calories: "~250-300 kcal",
                            alternatives: [
                                "Daliya khichdi with vegetables",
                                "2-3 idlis with sambar",
                                "Multigrain toast with avocado",
                                "Quinoa upma with vegetables"
                            ]
                        },
                        { 
                            time: "Mid-morning (11 AM)", 
                            food: {
                                indian: "1 glass buttermilk (chaas) with roasted cumin and coriander",
                                international: "Green tea or herbal tea with a small apple",
                                fusion: "Coconut water or fruit infused water"
                            },
                            calories: "~80 kcal",
                            alternatives: [
                                "Nimbu pani without sugar",
                                "Small bowl of mixed berries",
                                "Cucumber and mint infused water"
                            ]
                        },
                        { 
                            time: "Lunch (1-2 PM)", 
                            food: {
                                indian: "1 cup brown rice/millet rice + 1 bowl dal + 1 cup seasonal sabzi + small bowl raita",
                                international: "Grilled fish or chicken with large salad and olive oil dressing",
                                fusion: "Quinoa pulao with vegetables and raita OR brown rice bowl with stir-fried vegetables and tofu"
                            },
                            calories: "~450 kcal",
                            alternatives: [
                                "Rajma chawal with cucumber salad",
                                "Mediterranean chickpea salad",
                                "Lentil soup with multigrain bread",
                                "Vegetable khichdi with yogurt"
                            ]
                        },
                        { 
                            time: "Snack (4-5 PM)", 
                            food: {
                                indian: "1 small bowl roasted chana/makhana OR 1 seasonal fruit (apple/guava/orange)",
                                international: "Carrot sticks with hummus OR Greek yogurt with berries",
                                fusion: "Sprouts chaat with lemon and spices OR rice cakes with almond butter"
                            },
                            calories: "~100-150 kcal",
                            alternatives: [
                                "Roasted makhana (fox nuts)",
                                "Cucumber and carrot sticks with hung curd dip",
                                "Apple slices with peanut butter",
                                "Handful of mixed nuts and seeds"
                            ]
                        },
                        { 
                            time: "Dinner (7-8 PM)", 
                            food: {
                                indian: "2 multigrain rotis + 1 cup palak/lauki/tinda sabzi + small bowl of dal",
                                international: "Baked salmon with roasted vegetables OR zucchini noodles with lean protein",
                                fusion: "Grilled paneer/tofu/chicken + stir-fried vegetables with Indian spices"
                            },
                            calories: "~350 kcal",
                            alternatives: [
                                "Vegetable daliya khichdi with raita",
                                "Ragi dosa with vegetable sambar",
                                "Quinoa bowl with roasted vegetables",
                                "Grilled fish with steamed vegetables"
                            ]
                        }
                    ],
                    tips: [
                        "Avoid refined sugar, use jaggery or honey in limited amounts if needed.",
                        "Replace refined oils with mustard oil, olive oil or cold-pressed oils.",
                        "Include seasonal and local vegetables which are more affordable.",
                        "Start with 15-20 minutes of walking in your neighborhood daily.",
                        "Drink at least 8-10 glasses of water throughout the day.",
                        "Adjust portion sizes based on your height, weight, and activity level."
                    ]
                },
                maintenance: {
                    title: "Beginner | Sedentary Lifestyle | Goal: Maintenance",
                    meals: [
                        { 
                            time: "Morning (6-7 AM)", 
                            food: {
                                indian: "Warm water with lemon + 8 soaked almonds",
                                international: "Green tea with honey + 8 mixed nuts",
                                fusion: "Warm water with lemon and honey + 8 soaked almonds"
                            },
                            calories: "~100 kcal",
                            alternatives: [
                                "Amla juice with turmeric",
                                "Jeera water with mint leaves",
                                "Herbal tea with cinnamon"
                            ]
                        },
                        { 
                            time: "Breakfast (8-9 AM)", 
                            food: {
                                indian: "2 stuffed parathas with curd OR 3 idlis with sambar",
                                international: "Whole grain toast with eggs and avocado OR oatmeal with fruits and nuts",
                                fusion: "Masala omelette with multigrain toast OR oats upma with vegetables"
                            },
                            calories: "~350-400 kcal",
                            alternatives: [
                                "Vegetable daliya with peanuts",
                                "Besan chilla with paneer stuffing",
                                "Multigrain dosa with potato masala",
                                "Quinoa poha with vegetables"
                            ]
                        },
                        { 
                            time: "Mid-morning (11 AM)", 
                            food: {
                                indian: "1 glass lassi or buttermilk",
                                international: "A medium fruit with a handful of nuts",
                                fusion: "Coconut water with chia seeds"
                            },
                            calories: "~120 kcal",
                            alternatives: [
                                "Fruit smoothie with yogurt",
                                "Roasted makhana",
                                "Cucumber and mint raita"
                            ]
                        },
                        { 
                            time: "Lunch (1-2 PM)", 
                            food: {
                                indian: "1.5 cups rice + 1 bowl dal + 1 cup seasonal sabzi + raita + salad",
                                international: "Grilled chicken/fish with quinoa and roasted vegetables",
                                fusion: "Brown rice pulao with rajma curry OR Buddha bowl with mixed grains and proteins"
                            },
                            calories: "~500-550 kcal",
                            alternatives: [
                                "Chole with 2 multigrain rotis",
                                "Vegetable biryani with raita",
                                "Lentil soup with multigrain bread",
                                "Paneer wrap with hummus"
                            ]
                        },
                        { 
                            time: "Snack (4-5 PM)", 
                            food: {
                                indian: "Bhel puri or 1 small plate of dhokla",
                                international: "Hummus with vegetable sticks OR Greek yogurt parfait",
                                fusion: "Chaat-spiced fruit salad OR peanut butter on multigrain crackers"
                            },
                            calories: "~150-200 kcal",
                            alternatives: [
                                "Sprouts chaat",
                                "Roasted chickpeas",
                                "Multigrain toast with avocado",
                                "Handful of trail mix"
                            ]
                        },
                        { 
                            time: "Dinner (7-8 PM)", 
                            food: {
                                indian: "3 rotis + 1 cup vegetable curry + dal + small bowl of curd",
                                international: "Grilled fish with sweet potato and steamed vegetables",
                                fusion: "Roti wraps with mixed vegetable filling and yogurt sauce"
                            },
                            calories: "~450 kcal",
                            alternatives: [
                                "Khichdi with vegetables and ghee",
                                "Multigrain dosa with vegetable curry",
                                "Quinoa pulao with raita",
                                "Grilled paneer with vegetable stir-fry"
                            ]
                        }
                    ],
                    tips: [
                        "Focus on portion control rather than eliminating food groups.",
                        "Include a variety of colorful vegetables in your meals.",
                        "Stay hydrated with water, herbal teas, and natural beverages.",
                        "Try to incorporate 20-30 minutes of light activity daily.",
                        "Eat mindfully and chew your food thoroughly.",
                        "Get adequate sleep to maintain hormonal balance."
                    ]
                },
                muscleGain: {
                    title: "Beginner | Sedentary Lifestyle | Goal: Muscle Gain",
                    meals: [
                        { 
                            time: "Morning (6-7 AM)", 
                            food: {
                                indian: "Warm water with lemon + 10 soaked almonds",
                                international: "Black coffee + 10 mixed nuts",
                                fusion: "Warm water with lemon and honey + 10 soaked almonds"
                            },
                            calories: "~120 kcal",
                            alternatives: [
                                "Amla juice with turmeric and honey",
                                "Jeera water with mint leaves",
                                "Herbal tea with cinnamon and honey"
                            ]
                        },
                        { 
                            time: "Breakfast (8-9 AM)", 
                            food: {
                                indian: "3 egg paratha with curd OR paneer bhurji with 3 rotis",
                                international: "Protein pancakes with berries OR 4-egg omelette with toast and avocado",
                                fusion: "Masala scrambled eggs with multigrain toast OR protein-rich upma with nuts"
                            },
                            calories: "~500-550 kcal",
                            alternatives: [
                                "Paneer sandwich with multigrain bread",
                                "Moong dal chilla with paneer stuffing",
                                "Protein smoothie with banana and peanut butter",
                                "Egg bhurji with multigrain toast"
                            ]
                        },
                        { 
                            time: "Mid-morning (11 AM)", 
                            food: {
                                indian: "Protein shake with milk + 1 banana",
                                international: "Greek yogurt with berries and honey",
                                fusion: "Lassi with protein powder and fruits"
                            },
                            calories: "~250 kcal",
                            alternatives: [
                                "Paneer cubes with spices",
                                "Boiled eggs with black pepper",
                                "Chickpea salad with olive oil"
                            ]
                        },
                        { 
                            time: "Lunch (1-2 PM)", 
                            food: {
                                indian: "2 cups rice + 1.5 bowls dal + 1 cup paneer curry + raita + salad",
                                international: "Large portion of grilled chicken/fish with brown rice and vegetables",
                                fusion: "Protein-rich biryani with raita OR quinoa bowl with tofu and vegetables"
                            },
                            calories: "~650-700 kcal",
                            alternatives: [
                                "Rajma chawal with extra portion",
                                "Chicken curry with jeera rice",
                                "Lentil pasta with vegetable sauce",
                                "Protein-rich pulao with raita"
                            ]
                        },
                        { 
                            time: "Snack (4-5 PM)", 
                            food: {
                                indian: "Paneer tikka or 2 eggs with multigrain toast",
                                international: "Protein bar OR cottage cheese with fruit",
                                fusion: "Spiced cottage cheese wrap OR protein shake with Indian spices"
                            },
                            calories: "~300 kcal",
                            alternatives: [
                                "Sprouts chaat with extra peanuts",
                                "Chicken tikka pieces",
                                "Protein muffin",
                                "Peanut butter sandwich"
                            ]
                        },
                        { 
                            time: "Dinner (7-8 PM)", 
                            food: {
                                indian: "4 rotis + 1.5 cups chicken/paneer curry + dal + curd",
                                international: "Large steak with sweet potato and vegetables",
                                fusion: "Protein-rich stuffed parathas with yogurt OR grilled meat with Indian spices"
                            },
                            calories: "~550 kcal",
                            alternatives: [
                                "Egg curry with 3 rotis",
                                "Fish curry with rice",
                                "Tofu stir-fry with brown rice",
                                "Protein-rich khichdi with ghee"
                            ]
                        }
                    ],
                    tips: [
                        "Increase protein intake to support muscle growth (1.6-2g per kg of body weight).",
                        "Eat every 3-4 hours to maintain positive nitrogen balance.",
                        "Include complex carbohydrates to fuel your workouts.",
                        "Consider starting basic strength training 2-3 times per week.",
                        "Ensure adequate hydration for optimal muscle function.",
                        "Get 7-8 hours of quality sleep for recovery and growth."
                    ]
                }
            },
            light: {
                weightLoss: {
                    title: "Beginner | Light Activity | Goal: Weight Loss",
                    meals: [
                        { 
                            time: "Morning (6-7 AM)", 
                            food: {
                                indian: "Warm water with lemon + 5 soaked almonds",
                                international: "Green tea with mint + 5 walnuts",
                                fusion: "Warm water with lemon and honey + 5 soaked almonds"
                            },
                            calories: "~70 kcal",
                            alternatives: [
                                "Amla juice with turmeric",
                                "Jeera water with mint leaves",
                                "Herbal tea with cinnamon"
                            ]
                        },
                        { 
                            time: "Breakfast (8-9 AM)", 
                            food: {
                                indian: "1 cup vegetable poha with peanuts OR 2 moong dal chillas with mint chutney",
                                international: "Overnight oats with berries and chia seeds OR vegetable egg white omelette with whole grain toast",
                                fusion: "Vegetable upma with a side of Greek yogurt OR oats porridge with Indian spices"
                            },
                            calories: "~300 kcal",
                            alternatives: [
                                "Daliya khichdi with vegetables",
                                "2-3 idlis with sambar",
                                "Multigrain toast with avocado",
                                "Quinoa upma with vegetables"
                            ]
                        },
                        { 
                            time: "Mid-morning (11 AM)", 
                            food: {
                                indian: "1 glass buttermilk (chaas) with roasted cumin and coriander",
                                international: "Green tea or herbal tea with a small apple",
                                fusion: "Coconut water or fruit infused water"
                            },
                            calories: "~80 kcal",
                            alternatives: [
                                "Nimbu pani without sugar",
                                "Small bowl of mixed berries",
                                "Cucumber and mint infused water"
                            ]
                        },
                        { 
                            time: "Lunch (1-2 PM)", 
                            food: {
                                indian: "1 cup brown rice/millet rice + 1 bowl dal + 1 cup seasonal sabzi + small bowl raita",
                                international: "Grilled fish or chicken with large salad and olive oil dressing",
                                fusion: "Quinoa pulao with vegetables and raita OR brown rice bowl with stir-fried vegetables and tofu"
                            },
                            calories: "~450 kcal",
                            alternatives: [
                                "Rajma chawal with cucumber salad",
                                "Mediterranean chickpea salad",
                                "Lentil soup with multigrain bread",
                                "Vegetable khichdi with yogurt"
                            ]
                        },
                        { 
                            time: "Pre-workout (30 mins before)", 
                            food: {
                                indian: "1 banana OR 1 small bowl of fruit chaat",
                                international: "1 apple with 1 tbsp peanut butter",
                                fusion: "Mixed fruit smoothie with a pinch of cinnamon"
                            },
                            calories: "~100 kcal",
                            alternatives: [
                                "Handful of mixed nuts",
                                "1 small energy bar",
                                "1 small bowl of yogurt"
                            ]
                        },
                        { 
                            time: "Snack (4-5 PM)", 
                            food: {
                                indian: "1 small bowl roasted chana/makhana OR 1 seasonal fruit",
                                international: "Carrot sticks with hummus OR Greek yogurt with berries",
                                fusion: "Sprouts chaat with lemon and spices OR rice cakes with almond butter"
                            },
                            calories: "~150 kcal",
                            alternatives: [
                                "Roasted makhana (fox nuts)",
                                "Cucumber and carrot sticks with hung curd dip",
                                "Apple slices with peanut butter",
                                "Handful of mixed nuts and seeds"
                            ]
                        },
                        { 
                            time: "Dinner (7-8 PM)", 
                            food: {
                                indian: "2 multigrain rotis + 1 cup palak/lauki/tinda sabzi + small bowl of dal",
                                international: "Baked salmon with roasted vegetables OR zucchini noodles with lean protein",
                                fusion: "Grilled paneer/tofu/chicken + stir-fried vegetables with Indian spices"
                            },
                            calories: "~350 kcal",
                            alternatives: [
                                "Vegetable daliya khichdi with raita",
                                "Ragi dosa with vegetable sambar",
                                "Quinoa bowl with roasted vegetables",
                                "Grilled fish with steamed vegetables"
                            ]
                        }
                    ],
                    tips: [
                        "Hydrate well before, during, and after your workouts.",
                        "Focus on protein intake to preserve muscle mass while losing fat.",
                        "Include complex carbs before workouts for energy.",
                        "Try to incorporate 30 minutes of light activity 3-4 times a week.",
                        "Avoid eating heavy meals right before exercise.",
                        "Listen to your body and adjust portions based on hunger levels."
                    ]
                }
            }
        },
        moderate: {
            moderate: {
                maintenance: {
                    title: "Moderate Fitness | Moderate Activity | Goal: Maintenance",
                    meals: [
                        { 
                            time: "Morning (6-7 AM)", 
                            food: {
                                indian: "Warm water with lemon + 8 soaked almonds",
                                international: "Green tea with honey + 8 mixed nuts",
                                fusion: "Warm water with lemon and honey + 8 soaked almonds"
                            },
                            calories: "~100 kcal",
                            alternatives: [
                                "Amla juice with turmeric",
                                "Jeera water with mint leaves",
                                "Herbal tea with cinnamon"
                            ]
                        },
                        { 
                            time: "Breakfast (8-9 AM)", 
                            food: {
                                indian: "2 stuffed parathas with curd OR 3 idlis with sambar",
                                international: "Whole grain toast with eggs and avocado OR oatmeal with fruits and nuts",
                                fusion: "Masala omelette with multigrain toast OR oats upma with vegetables"
                            },
                            calories: "~400 kcal",
                            alternatives: [
                                "Vegetable daliya with peanuts",
                                "Besan chilla with paneer stuffing",
                                "Multigrain dosa with potato masala",
                                "Quinoa poha with vegetables"
                            ]
                        },
                        { 
                            time: "Mid-morning (11 AM)", 
                            food: {
                                indian: "1 glass lassi or buttermilk",
                                international: "A medium fruit with a handful of nuts",
                                fusion: "Coconut water with chia seeds"
                            },
                            calories: "~120 kcal",
                            alternatives: [
                                "Fruit smoothie with yogurt",
                                "Roasted makhana",
                                "Cucumber and mint raita"
                            ]
                        },
                        { 
                            time: "Lunch (1-2 PM)", 
                            food: {
                                indian: "1.5 cups rice + 1 bowl dal + 1 cup seasonal sabzi + raita + salad",
                                international: "Grilled chicken/fish with quinoa and roasted vegetables",
                                fusion: "Brown rice pulao with rajma curry OR Buddha bowl with mixed grains and proteins"
                            },
                            calories: "~550 kcal",
                            alternatives: [
                                "Chole with 2 multigrain rotis",
                                "Vegetable biryani with raita",
                                "Lentil soup with multigrain bread",
                                "Paneer wrap with hummus"
                            ]
                        },
                        { 
                            time: "Snack (4-5 PM)", 
                            food: {
                                indian: "Bhel puri or 1 small plate of dhokla",
                                international: "Hummus with vegetable sticks OR Greek yogurt parfait",
                                fusion: "Chaat-spiced fruit salad OR peanut butter on multigrain crackers"
                            },
                            calories: "~200 kcal",
                            alternatives: [
                                "Sprouts chaat",
                                "Roasted chickpeas",
                                "Multigrain toast with avocado",
                                "Handful of trail mix"
                            ]
                        },
                        { 
                            time: "Dinner (7-8 PM)", 
                            food: {
                                indian: "3 rotis + 1 cup vegetable curry + dal + small bowl of curd",
                                international: "Grilled fish with sweet potato and steamed vegetables",
                                fusion: "Roti wraps with mixed vegetable filling and yogurt sauce"
                            },
                            calories: "~450 kcal",
                            alternatives: [
                                "Khichdi with vegetables and ghee",
                                "Multigrain dosa with vegetable curry",
                                "Quinoa pulao with raita",
                                "Grilled paneer with vegetable stir-fry"
                            ]
                        }
                    ],
                    tips: [
                        "Balance your macronutrients (carbs, proteins, fats) in each meal.",
                        "Stay hydrated throughout the day, especially during workouts.",
                        "Incorporate both strength training and cardio in your routine.",
                        "Eat a balanced meal within 45 minutes after workout for recovery.",
                        "Listen to your body's hunger cues and adjust portions accordingly.",
                        "Include a variety of colorful vegetables for micronutrients."
                    ]
                }
            }
        }
    };

    // BMI categories and calorie ranges
    const bmiCategories = {
        underweight: { name: "Underweight", range: "< 18.5", calories: "2200–2500" },
        normal: { name: "Normal", range: "18.5–24.9", calories: "1800–2200" },
        overweight: { name: "Overweight", range: "25–29.9", calories: "1500–1800" },
        obese: { name: "Obese", range: "> 30", calories: "1200–1500" }
    };

    // Recipe database
    const recipes = [
        {
            name: "Masala Oats Bowl",
            image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            difficulty: "easy",
            time: "15 minutes",
            ingredients: [
                "1/2 cup rolled oats",
                "1 cup water or low-fat milk",
                "1/4 tsp turmeric powder",
                "1/4 tsp cumin powder",
                "1/4 cup finely chopped mixed vegetables (carrots, peas, bell peppers)",
                "1 small green chili, finely chopped (optional)",
                "1/2 tsp ginger, grated",
                "1 tbsp coriander leaves, chopped",
                "Salt and black pepper to taste"
            ],
            instructions: [
                "Heat a pan and dry roast the oats for 2 minutes. Set aside.",
                "In the same pan, add a teaspoon of oil and sauté ginger and green chili.",
                "Add vegetables and sauté for 2-3 minutes.",
                "Add turmeric, cumin powder, salt, and pepper.",
                "Add water or milk and bring to a boil.",
                "Add roasted oats, mix well, and cook until the oats are soft and the mixture thickens.",
                "Garnish with fresh coriander leaves and serve hot."
            ]
        },
        {
            name: "Mediterranean Quinoa Salad with Indian Twist",
            image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            difficulty: "medium",
            time: "25 minutes",
            ingredients: [
                "1 cup quinoa, cooked and cooled",
                "1 cucumber, diced",
                "1 cup cherry tomatoes, halved",
                "1/2 cup bell peppers, diced",
                "1/4 cup red onion, finely chopped",
                "1/4 cup olives, sliced (optional)",
                "1/4 cup feta cheese, crumbled (optional)",
                "2 tbsp fresh mint leaves, chopped",
                "2 tbsp fresh coriander leaves, chopped",
                "1 tsp roasted cumin powder",
                "1/2 tsp chaat masala",
                "Juice of 1 lemon",
                "2 tbsp olive oil",
                "Salt and black pepper to taste"
            ],
            instructions: [
                "In a large bowl, combine cooked quinoa, cucumber, tomatoes, bell peppers, red onion, olives, and feta cheese.",
                "In a small bowl, whisk together lemon juice, olive oil, roasted cumin powder, chaat masala, salt, and pepper.",
                "Pour the dressing over the salad and toss gently to combine.",
                "Add fresh mint and coriander leaves and mix well.",
                "Refrigerate for at least 30 minutes before serving to allow flavors to meld."
            ]
        },
        {
            name: "Fusion Protein Pancakes",
            image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            difficulty: "easy",
            time: "20 minutes",
            ingredients: [
                "1 ripe banana, mashed",
                "2 eggs",
                "1/2 cup oats, ground into flour",
                "1 scoop protein powder (vanilla or unflavored)",
                "1/4 tsp cardamom powder",
                "1/4 tsp cinnamon powder",
                "1/2 tsp baking powder",
                "1 tbsp flaxseeds, ground",
                "1/4 cup Greek yogurt",
                "1 tsp honey or maple syrup (optional)",
                "Fresh fruits for topping"
            ],
            instructions: [
                "In a bowl, mash the banana and whisk in the eggs until well combined.",
                "Add ground oats, protein powder, cardamom, cinnamon, baking powder, and ground flaxseeds. Mix well.",
                "If the batter is too thick, add a splash of milk or water to reach desired consistency.",
                "Heat a non-stick pan over medium heat and lightly grease with oil.",
                "Pour small portions of batter to form pancakes and cook until bubbles form on top.",
                "Flip and cook the other side until golden brown.",
                "Serve with a dollop of Greek yogurt, fresh fruits, and a drizzle of honey or maple syrup if desired."
            ]
        }
    ];

    // Calculate BMI and determine category
    function calculateBMI(weight, height) {
        // Convert height from cm to m
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        let category;
        if (bmi < 18.5) {
            category = bmiCategories.underweight;
        } else if (bmi >= 18.5 && bmi < 25) {
            category = bmiCategories.normal;
        } else if (bmi >= 25 && bmi < 30) {
            category = bmiCategories.overweight;
        } else {
            category = bmiCategories.obese;
        }
        
        return {
            value: bmi.toFixed(1),
            category: category
        };
    }

    // Display a random recipe from the available recipes
    function displayRandomRecipe() {
        const recipeContainer = document.getElementById('featuredRecipe');
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const recipe = recipes[randomIndex];
        
        let ingredientsList = '';
        recipe.ingredients.forEach(ingredient => {
            ingredientsList += `<li>${ingredient}</li>`;
        });
        
        let instructionsList = '';
        recipe.instructions.forEach((instruction, index) => {
            instructionsList += `<li>${index + 1}. ${instruction}</li>`;
        });
        
        recipeContainer.innerHTML = `
            <h4>${recipe.name}</h4>
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-meta">
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
                <span class="time">⏱️ ${recipe.time}</span>
            </div>
            <div class="ingredients">
                <h5>Ingredients:</h5>
                <ul>${ingredientsList}</ul>
            </div>
            <div class="instructions">
                <h5>Instructions:</h5>
                <ol>${instructionsList}</ol>
            </div>
        `;
    }

    // Function to get a fallback plan when the exact plan doesn't exist
    function getFallbackPlan(fitnessLevel, activityLevel, goal) {
        // Try to find a plan with the same fitness level and activity level but different goal
        if (dietPlans[fitnessLevel] && dietPlans[fitnessLevel][activityLevel]) {
            const availableGoals = Object.keys(dietPlans[fitnessLevel][activityLevel]);
            if (availableGoals.length > 0) {
                return dietPlans[fitnessLevel][activityLevel][availableGoals[0]];
            }
        }
        
        // If that fails, try to find any plan with the same fitness level
        if (dietPlans[fitnessLevel]) {
            const availableActivities = Object.keys(dietPlans[fitnessLevel]);
            if (availableActivities.length > 0) {
                const availableGoals = Object.keys(dietPlans[fitnessLevel][availableActivities[0]]);
                if (availableGoals.length > 0) {
                    return dietPlans[fitnessLevel][availableActivities[0]][availableGoals[0]];
                }
            }
        }
        
        // If that fails, try to find any plan with a different fitness level
        const availableFitnessLevels = Object.keys(dietPlans);
        if (availableFitnessLevels.length > 0) {
            const availableActivities = Object.keys(dietPlans[availableFitnessLevels[0]]);
            if (availableActivities.length > 0) {
                const availableGoals = Object.keys(dietPlans[availableFitnessLevels[0]][availableActivities[0]]);
                if (availableGoals.length > 0) {
                    return dietPlans[availableFitnessLevels[0]][availableActivities[0]][availableGoals[0]];
                }
            }
        }
        
        // Last resort: return the beginner sedentary weightLoss plan which we know exists
        return dietPlans.beginner.sedentary.weightLoss;
    }

    // Handle cuisine toggle buttons
    let currentCuisine = 'fusion';
    let currentPlan = null;
    
    function updateMealPlan(cuisine) {
        currentCuisine = cuisine;
        const mealPlanElement = document.getElementById('mealPlan');
        const plan = currentPlan;
        
        if (!plan) return;
        
        mealPlanElement.innerHTML = '';
        
        plan.meals.forEach(meal => {
            const row = document.createElement('tr');
            
            const timeCell = document.createElement('td');
            timeCell.textContent = meal.time;
            
            const foodCell = document.createElement('td');
            foodCell.textContent = meal.food[cuisine];
            
            const caloriesCell = document.createElement('td');
            caloriesCell.textContent = meal.calories;
            
            const alternativesCell = document.createElement('td');
            if (meal.alternatives && meal.alternatives.length > 0) {
                const alternativesDiv = document.createElement('div');
                alternativesDiv.className = 'meal-alternatives';
                
                const alternativesBtn = document.createElement('button');
                alternativesBtn.className = 'alternatives-btn';
                alternativesBtn.textContent = 'View Options';
                
                const alternativesContent = document.createElement('div');
                alternativesContent.className = 'alternatives-content';
                
                meal.alternatives.forEach(alternative => {
                    const altP = document.createElement('p');
                    altP.textContent = alternative;
                    alternativesContent.appendChild(altP);
                });
                
                alternativesDiv.appendChild(alternativesBtn);
                alternativesDiv.appendChild(alternativesContent);
                alternativesCell.appendChild(alternativesDiv);
            }
            
            row.appendChild(timeCell);
            row.appendChild(foodCell);
            row.appendChild(caloriesCell);
            row.appendChild(alternativesCell);
            
            mealPlanElement.appendChild(row);
        });
    }
    
    fusionBtn.addEventListener('click', function() {
        fusionBtn.classList.add('active');
        indianBtn.classList.remove('active');
        internationalBtn.classList.remove('active');
        updateMealPlan('fusion');
    });
    
    indianBtn.addEventListener('click', function() {
        indianBtn.classList.add('active');
        fusionBtn.classList.remove('active');
        internationalBtn.classList.remove('active');
        updateMealPlan('indian');
    });
    
    internationalBtn.addEventListener('click', function() {
        internationalBtn.classList.add('active');
        fusionBtn.classList.remove('active');
        indianBtn.classList.remove('active');
        updateMealPlan('international');
    });

    // Form submission handler
    dietForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const gender = document.getElementById('gender').value;
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const age = document.getElementById('age').value;
        const fitnessLevel = document.getElementById('fitnessLevel').value;
        const activityLevel = document.getElementById('activityLevel').value;
        const goal = document.getElementById('goal').value;
        const cuisinePreference = document.getElementById('cuisinePreference').value;
        
        // Calculate BMI
        const bmi = calculateBMI(weight, height);
        
        // Display BMI information
        document.getElementById('bmiValue').textContent = bmi.value;
        document.getElementById('bmiCategory').textContent = bmi.category.name;
        document.getElementById('calorieRange').textContent = bmi.category.calories;
        
        // Get diet plan based on user inputs
        let selectedPlan;
        try {
            // Try to get the exact plan the user requested
            selectedPlan = dietPlans[fitnessLevel][activityLevel][goal];
            
            // If the plan doesn't exist (returns undefined), throw an error to trigger the catch block
            if (!selectedPlan) {
                throw new Error("Plan not found");
            }
        } catch (error) {
            // If specific combination doesn't exist, use the fallback mechanism
            selectedPlan = getFallbackPlan(fitnessLevel, activityLevel, goal);
            alert("We don't have a specific plan for your exact combination. Here's a recommended alternative.");
        }
        
        // Set the current plan
        currentPlan = selectedPlan;
        
        // Display plan title
        document.getElementById('planTitle').textContent = currentPlan.title || "Your Personalized Diet Plan";
        
        // Set initial cuisine based on user preference
        currentCuisine = cuisinePreference;
        
        // Update cuisine toggle buttons
        fusionBtn.classList.remove('active');
        indianBtn.classList.remove('active');
        internationalBtn.classList.remove('active');
        
        if (cuisinePreference === 'fusion') {
            fusionBtn.classList.add('active');
        } else if (cuisinePreference === 'indian') {
            indianBtn.classList.add('active');
        } else {
            internationalBtn.classList.add('active');
        }
        
        // Generate meal plan table
        updateMealPlan(cuisinePreference);
        
        // Display tips
        const tipsListElement = document.getElementById('tipsList');
        tipsListElement.innerHTML = '';
        
        currentPlan.tips.forEach(tip => {
            const listItem = document.createElement('li');
            listItem.textContent = tip;
            tipsListElement.appendChild(listItem);
        });
        
        // Display a random recipe
        displayRandomRecipe();
        
        // Show results section
        dietForm.classList.add('hidden');
        resultsSection.classList.remove('hidden');
    });
    
    // Reset button handler
    resetBtn.addEventListener('click', function() {
        dietForm.reset();
        resultsSection.classList.add('hidden');
        dietForm.classList.remove('hidden');
    });
    
    // Print button handler
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // New recipe button handler
    newRecipeBtn.addEventListener('click', function() {
        displayRandomRecipe();
    });
});

