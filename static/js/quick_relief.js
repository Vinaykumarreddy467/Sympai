document.addEventListener('DOMContentLoaded', function() {
    // Medical conditions data
    const conditions = [
        {
            id: 1,
            name: "Common Cold",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Runny nose, sneezing, sore throat, cough, mild fever, and congestion.",
            medications: [
                { name: "Paracetamol 500mg", dosage: "1-2 tablets every 6 hours (max 4 doses/day)", type: "otc" },
                { name: "Cetirizine 10mg", dosage: "1 tablet once daily", type: "otc" }
            ],
            tips: [
                "Steam inhalation 2-3 times daily",
                "Stay hydrated and rest well",
                "Gargle with warm salt water for sore throat"
            ],
            warning: "Fever above 101°F (38.3°C) that lasts more than 3 days, difficulty breathing, or symptoms that worsen after 7 days."
        },
        {
            id: 2,
            name: "Headache (Tension-Type)",
            severity: "mild",
            ageGroups: ["adults", "elderly"],
            symptoms: "Dull, aching pain on both sides of the head, feeling of pressure or tightness across the forehead.",
            medications: [
                { name: "Paracetamol 500mg", dosage: "1-2 tablets every 6 hours as needed", type: "otc" },
                { name: "Ibuprofen 400mg", dosage: "1 tablet every 6-8 hours after food", type: "otc" }
            ],
                        tips: [
                "Rest in a quiet, dark room",
                "Stay hydrated, avoid screen time",
                "Apply a cold or warm compress to your head"
            ],
            warning: "Severe, sudden headache, headache with fever and stiff neck, headache after injury, or headache with confusion, seizures, double vision, weakness, or numbness."
        },
        {
            id: 3,
            name: "Acidity / Heartburn",
            severity: "moderate",
            ageGroups: ["adults", "elderly"],
            symptoms: "Burning sensation in chest or throat, sour taste in mouth, difficulty swallowing, regurgitation of food.",
            medications: [
                { name: "Antacids (Gelusil, Digene)", dosage: "1-2 teaspoons after meals and at bedtime", type: "otc" },
                { name: "Pantoprazole 40mg", dosage: "1 tablet once daily before breakfast", type: "prescription" }
            ],
            tips: [
                "Avoid spicy/oily food and caffeine",
                "Eat small meals, no late-night snacks",
                "Elevate your head while sleeping"
            ],
            warning: "Severe chest pain, pain radiating to jaw or arm, shortness of breath, black stools, persistent vomiting, or symptoms lasting more than 2 weeks despite treatment."
        },
        {
            id: 4,
            name: "Sore Throat",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Pain or irritation in the throat, difficulty swallowing, swollen glands in the neck.",
            medications: [
                { name: "Lozenges (Strepsils, Vicks)", dosage: "1 lozenge every 2-3 hours as needed", type: "otc" },
                { name: "Warm saline gargle", dosage: "Every 2-3 hours", type: "natural" }
            ],
            tips: [
                "Drink warm fluids like herbal tea with honey",
                "Avoid cold drinks and talking too much",
                "Use a humidifier to add moisture to the air"
            ],
            warning: "Severe pain making it impossible to eat, high fever, white patches on tonsils, or symptoms lasting more than a week."
        },
        {
            id: 5,
            name: "Muscle Pain / Body Ache",
            severity: "moderate",
            ageGroups: ["adults", "elderly"],
            symptoms: "Localized or generalized pain in muscles, stiffness, tenderness, and reduced range of motion.",
            medications: [
                { name: "Ibuprofen 400mg", dosage: "1 tablet every 6-8 hours after food", type: "otc" },
                { name: "Topical ointments (Volini, Moov)", dosage: "Apply to affected area 3-4 times daily", type: "otc" }
            ],
            tips: [
                "Apply warm compress to relieve stiffness",
                "Light stretching or gentle massage",
                "Ensure proper posture and ergonomics"
            ],
            warning: "Severe pain after injury, inability to move the affected area, redness or swelling with fever, or muscle pain with rash."
        },
        {
            id: 6,
            name: "Diarrhea (Mild)",
            severity: "moderate",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Loose, watery stools, abdominal cramps, urgency to have bowel movements, nausea.",
            medications: [
                { name: "ORS solution", dosage: "Drink after each loose stool", type: "otc" },
                { name: "Loperamide", dosage: "2mg after each loose stool (max 8mg/day)", type: "otc" }
            ],
            tips: [
                "Stick to bland foods (BRAT diet: banana, rice, applesauce, toast)",
                "Avoid dairy, spicy foods, and caffeine",
                "Stay well-hydrated with clear fluids"
            ],
            warning: "Blood or mucus in stool, severe abdominal pain, high fever, signs of dehydration (extreme thirst, dry mouth, little or no urination), or symptoms lasting more than 2 days."
        },
        {
            id: 7,
            name: "Fever (Low-grade)",
            severity: "moderate",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Elevated body temperature (99-101°F or 37.2-38.3°C), chills, sweating, headache, muscle aches.",
            medications: [
                { name: "Paracetamol 500mg", dosage: "1-2 tablets every 6 hours (max 4 doses/day)", type: "otc" }
            ],
            tips: [
                "Lukewarm sponge if temperature exceeds 100.4°F (38°C)",
                "Rest, drink plenty of fluids, and eat light meals",
                "Wear lightweight clothing and use light blankets"
            ],
            warning: "Fever above 103°F (39.4°C), fever with rash, severe headache, stiff neck, confusion, difficulty breathing, or persistent fever lasting more than 3 days."
        },
        {
            id: 8,
            name: "Allergic Reaction (Mild)",
            severity: "moderate",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Hives, itching, redness, mild swelling, runny nose, or watery eyes.",
            medications: [
                { name: "Cetirizine 10mg", dosage: "1 tablet once daily", type: "otc" },
                { name: "Calamine lotion", dosage: "Apply to affected skin 2-3 times daily", type: "otc" }
            ],
            tips: [
                "Identify and avoid the allergen",
                "Don't scratch rashes – apply cool compress",
                "Wear loose-fitting, cotton clothing"
            ],
            warning: "Difficulty breathing, swelling of face/lips/tongue, tightness in throat, wheezing, dizziness, or rapid heartbeat. These may indicate anaphylaxis, which is a medical emergency."
        },
        {
            id: 9,
            name: "Constipation",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Infrequent bowel movements, hard or lumpy stools, straining, feeling of incomplete evacuation.",
            medications: [
                { name: "Isabgol (Psyllium husk)", dosage: "1-2 teaspoons with water, 1-2 times daily", type: "natural" },
                { name: "Lactulose syrup", dosage: "15-30ml once or twice daily", type: "otc" }
            ],
            tips: [
                "Increase fiber and water intake",
                "Regular light exercise like walking",
                "Establish a regular toilet routine"
            ],
            warning: "Severe abdominal pain, blood in stool, unexplained weight loss, alternating constipation and diarrhea, or no bowel movement for more than 7 days."
        },
        {
            id: 10,
            name: "Cough (Dry/Irritating)",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Persistent cough without mucus, tickling sensation in throat, chest discomfort.",
            medications: [
                { name: "Dextromethorphan cough syrup", dosage: "10-20ml every 4-6 hours as needed", type: "otc" },
                { name: "Honey + warm water", dosage: "1 teaspoon in warm water (if above age 1)", type: "natural" }
            ],
            tips: [
                "Stay hydrated and avoid cold beverages",
                "Use a humidifier, especially at night",
                "Avoid irritants like smoke and strong perfumes"
            ],
            warning: "Cough lasting more than 2 weeks, coughing up blood or yellow/green mucus, shortness of breath, wheezing, or high fever."
        },
        {
            id: 11,
            name: "Indigestion / Bloating",
            severity: "mild",
            ageGroups: ["adults", "elderly"],
            symptoms: "Uncomfortable fullness after eating, upper abdominal pain, bloating, belching, nausea.",
            medications: [
                { name: "Antacids (Gelusil, Digene)", dosage: "1-2 teaspoons after meals", type: "otc" },
                { name: "Domperidone", dosage: "10mg before meals (max 3 times/day)", type: "prescription" }
            ],
            tips: [
                "Eat slowly, chew food well",
                "Avoid carbonated drinks and heavy meals",
                "Don't lie down immediately after eating"
            ],
            warning: "Severe, persistent abdominal pain, vomiting, difficulty swallowing, unexplained weight loss, or black stools."
        },
        {
            id: 12,
            name: "Menstrual Cramps",
            severity: "moderate",
            ageGroups: ["adults"],
            symptoms: "Lower abdominal pain, throbbing or cramping pain in the lower abdomen, pain radiating to lower back and thighs.",
            medications: [
                { name: "Mefenamic Acid 250mg", dosage: "1 tablet three times daily with food", type: "prescription" },
                { name: "Ibuprofen 400mg", dosage: "1 tablet every 6-8 hours after food", type: "otc" }
            ],
            tips: [
                "Use a hot water bag on the lower abdomen",
                "Gentle stretching or light yoga",
                "Stay hydrated and avoid caffeine"
            ],
            warning: "Extremely severe pain that interferes with daily activities, heavy bleeding (changing pad/tampon every hour), fever, or symptoms getting worse over time."
        },
        {
            id: 13,
            name: "Nausea / Vomiting",
            severity: "moderate",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Feeling of sickness with an urge to vomit, stomach discomfort, excessive salivation, sweating.",
            medications: [
                { name: "Ondansetron 4mg", dosage: "1 tablet every 8 hours as needed", type: "prescription" },
                { name: "Ginger tea", dosage: "1 cup as needed", type: "natural" }
            ],
            tips: [
                "Sip water or electrolyte drinks slowly",
                "Avoid strong smells and oily food",
                "Eat small, bland meals when able to eat"
            ],
            warning: "Severe abdominal pain, projectile vomiting, blood in vomit, signs of dehydration, confusion, or symptoms lasting more than 24 hours."
        },
        {
            id: 14,
            name: "Toothache (Non-Severe)",
            severity: "moderate",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Pain around tooth or gums, sensitivity to hot/cold, swelling around the tooth, bad taste in mouth.",
            medications: [
                { name: "Paracetamol or Ibuprofen", dosage: "As directed on package", type: "otc" },
                { name: "Clove oil", dosage: "Apply small amount to affected area", type: "natural" }
            ],
            tips: [
                "Rinse with warm salt water several times daily",
                "Avoid very hot or cold foods and drinks",
                "Floss gently to remove trapped food particles"
            ],
            warning: "Severe pain, significant swelling of face or cheek, fever, difficulty swallowing or breathing, or symptoms lasting more than 2 days."
        },
        {
            id: 15,
            name: "Back Pain (Mild)",
            severity: "moderate",
            ageGroups: ["adults", "elderly"],
            symptoms: "Muscle ache or stiffness in the back, pain that improves with rest, limited flexibility or range of motion.",
            medications: [
                { name: "Ibuprofen 400mg", dosage: "1 tablet every 6-8 hours after food", type: "otc" },
                { name: "Muscle relaxants", dosage: "As prescribed by doctor", type: "prescription" }
            ],
            tips: [
                "Apply warm compress to relax muscles",
                "Maintain good posture and ergonomics",
                "Avoid lifting heavy items and sudden movements"
            ],
            warning: "Severe pain that doesn't improve with rest, pain radiating down legs, numbness or tingling, difficulty urinating, or weakness in legs."
        },
        {
            id: 16,
            name: "Skin Rash / Itching",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Red, inflamed skin, itching, small bumps or blisters, dry or scaly patches.",
            medications: [
                { name: "Calamine lotion", dosage: "Apply to affected area 2-3 times daily", type: "otc" },
                { name: "Cetirizine", dosage: "10mg once daily", type: "otc" }
            ],
            tips: [
                "Keep the area clean and dry",
                "Avoid harsh soaps or scratching",
                "Wear loose-fitting, cotton clothing"
            ],
            warning: "Rash that spreads rapidly, blisters that ooze or become crusty, rash with fever, difficulty breathing, or severe swelling."
        },
        {
            id: 17,
            name: "Eye Irritation / Redness",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Redness, burning or itching sensation, watery eyes, mild sensitivity to light.",
            medications: [
                { name: "Lubricating eye drops", dosage: "1-2 drops in affected eye(s) 4-6 times daily", type: "otc" }
            ],
            tips: [
                "Splash clean, cool water to rinse eyes",
                "Avoid touching or rubbing your eyes",
                "Reduce screen time and take regular breaks"
            ],
            warning: "Severe pain, vision changes, sensitivity to light, discharge from the eye, or symptoms worsening after 48 hours."
        },
        {
            id: 18,
            name: "Motion Sickness",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Nausea, vomiting, dizziness, cold sweats, increased salivation during travel.",
            medications: [
                { name: "Dimenhydrinate (Avomine)", dosage: "50mg 30 minutes before travel", type: "otc" },
                { name: "Ginger candy or capsules", dosage: "As needed", type: "natural" }
            ],
            tips: [
                "Face forward, focus on the horizon",
                "Avoid heavy meals before travel",
                "Get fresh air and avoid strong odors"
            ],
            warning: "Symptoms persisting long after the journey has ended, severe vomiting leading to dehydration, or confusion."
        },
        {
            id: 19,
            name: "Bug Bites / Insect Stings",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Localized redness, swelling, itching, or pain at the site of the bite or sting.",
            medications: [
                { name: "Cetirizine", dosage: "10mg once daily", type: "otc" },
                { name: "Calamine lotion or Hydrocortisone cream", dosage: "Apply to affected area 2-3 times daily", type: "otc" }
            ],
            tips: [
                "Apply ice pack to reduce swelling",
                "Avoid scratching to prevent infection",
                "Clean the area with mild soap and water"
            ],
            warning: "Severe swelling, difficulty breathing, dizziness, rapid heartbeat, or spreading redness and warmth around the bite site."
        },
        {
            id: 20,
            name: "Mild Sunburn",
            severity: "mild",
            ageGroups: ["children", "adults", "elderly"],
            symptoms: "Red, warm, and painful skin that feels hot to touch, mild swelling, and skin sensitivity.",
            medications: [
                { name: "Aloe vera gel", dosage: "Apply liberally to affected areas several times daily", type: "natural" },
                { name: "Paracetamol", dosage: "As directed for pain relief", type: "otc" }
            ],
            tips: [
                "Take cool baths or showers",
                "Stay out of the sun until healed",
                "Drink extra water to prevent dehydration"
            ],
            warning: "Severe blistering over large areas, high fever, extreme pain, headache, confusion, nausea, or chills."
        }
    ];

   // DOM elements
    const conditionCardsContainer = document.getElementById('conditionCards');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const severityFilter = document.getElementById('severityFilter');
    const ageFilter = document.getElementById('ageFilter');
    const medicineFilter = document.getElementById('medicineFilter');
    const disclaimerModal = document.getElementById('disclaimerModal');
    const acceptDisclaimerBtn = document.getElementById('acceptDisclaimer');
    const showFullDisclaimerBtn = document.getElementById('showFullDisclaimer');

    // Show disclaimer on page load
    if (!localStorage.getItem('disclaimerAccepted')) {
        disclaimerModal.style.display = 'flex';
    } else {
        disclaimerModal.style.display = 'none';
    }

    // Accept disclaimer - Fix for button not working
    if (acceptDisclaimerBtn) {
        acceptDisclaimerBtn.addEventListener('click', function() {
            localStorage.setItem('disclaimerAccepted', 'true');
            disclaimerModal.style.display = 'none';
        });
    }

    // Show full disclaimer when footer button is clicked - Fix for button not working
    if (showFullDisclaimerBtn) {
        showFullDisclaimerBtn.addEventListener('click', function() {
            disclaimerModal.style.display = 'flex';
        });
    }

    // Create card for each condition
    function createConditionCard(condition) {
        const card = document.createElement('div');
        card.className = 'condition-card';
        card.dataset.severity = condition.severity;
        card.dataset.ageGroups = JSON.stringify(condition.ageGroups);
        card.dataset.medicineTypes = JSON.stringify(condition.medications.map(med => med.type));

        // Create severity class based on condition severity
        let severityClass = '';
        let severityText = '';
        
        switch(condition.severity) {
            case 'mild':
                severityClass = 'severity-mild';
                severityText = 'Mild';
                break;
            case 'moderate':
                severityClass = 'severity-moderate';
                severityText = 'Moderate';
                break;
            case 'severe':
                severityClass = 'severity-severe';
                severityText = 'Severe';
                break;
        }

        // Card HTML structure
        card.innerHTML = `
            <div class="card-header">
                <h2>${condition.name}</h2>
                <span class="severity-badge ${severityClass}">${severityText}</span>
            </div>
            <div class="card-body">
                <div class="card-section">
                    <h3><i class="fas fa-clipboard-list"></i> Symptoms</h3>
                    <p>${condition.symptoms}</p>
                </div>
                <div class="card-section">
                    <h3><i class="fas fa-pills"></i> Medications</h3>
                    <ul>
                        ${condition.medications.map(med => `
                            <li>
                                <div class="medicine-item">
                                    <span class="medicine-name">${med.name}</span>
                                    <span class="medicine-type">${getMedicineTypeLabel(med.type)}</span>
                                </div>
                                <small>${med.dosage}</small>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="card-section">
                    <h3><i class="fas fa-lightbulb"></i> Quick Tips</h3>
                    <ul>
                        ${condition.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                <div class="warning-section">
                    <h3><i class="fas fa-exclamation-triangle"></i> See a doctor if...</h3>
                    <p>${condition.warning}</p>
                </div>
            </div>
        `;

        return card;
    }

    // Helper function to get readable medicine type label
    function getMedicineTypeLabel(type) {
        switch(type) {
            case 'otc':
                return 'OTC';
            case 'prescription':
                return 'Rx';
            case 'natural':
                return 'Natural';
            default:
                return type;
        }
    }

    // Render all condition cards
    function renderConditionCards() {
        conditionCardsContainer.innerHTML = '';
        
        let filteredConditions = conditions;
        
        // Apply search filter
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filteredConditions = filteredConditions.filter(condition => 
                condition.name.toLowerCase().includes(searchTerm) || 
                condition.symptoms.toLowerCase().includes(searchTerm) ||
                condition.medications.some(med => med.name.toLowerCase().includes(searchTerm))
            );
        }
        
        // Apply severity filter
        if (severityFilter.value !== 'all') {
            filteredConditions = filteredConditions.filter(condition => 
                condition.severity === severityFilter.value
            );
        }
        
        // Apply age group filter
        if (ageFilter.value !== 'all') {
            filteredConditions = filteredConditions.filter(condition => 
                condition.ageGroups.includes(ageFilter.value)
            );
        }
        
        // Apply medicine type filter
        if (medicineFilter.value !== 'all') {
            filteredConditions = filteredConditions.filter(condition => 
                condition.medications.some(med => med.type === medicineFilter.value)
            );
        }
        
        // Display message if no results
        if (filteredConditions.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>No conditions match your search criteria.</p>
                <button class="btn-secondary" id="resetFilters">Reset Filters</button>
            `;
            conditionCardsContainer.appendChild(noResults);
            
            // Fix for reset button not working
            setTimeout(() => {
                const resetBtn = document.getElementById('resetFilters');
                if (resetBtn) {
                    resetBtn.addEventListener('click', function() {
                        searchInput.value = '';
                        severityFilter.value = 'all';
                        ageFilter.value = 'all';
                        medicineFilter.value = 'all';
                        renderConditionCards();
                    });
                }
            }, 100);
            
            return;
        }
        
        // Create and append cards
        filteredConditions.forEach(condition => {
            const card = createConditionCard(condition);
            conditionCardsContainer.appendChild(card);
        });
    }

    // Initial render
    renderConditionCards();

    // Event listeners for filters - Fix for buttons not working
    if (searchBtn) {
        searchBtn.addEventListener('click', renderConditionCards);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                renderConditionCards();
            }
        });
    }
    
    if (severityFilter) {
        severityFilter.addEventListener('change', renderConditionCards);
    }
    
    if (ageFilter) {
        ageFilter.addEventListener('change', renderConditionCards);
    }
    
    if (medicineFilter) {
        medicineFilter.addEventListener('change', renderConditionCards);
    }

    // Make filter bar sticky on scroll
    const filterBar = document.getElementById('filterBar');
    if (filterBar) {
        const filterBarOffset = filterBar.offsetTop;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > filterBarOffset) {
                filterBar.classList.add('sticky');
            } else {
                filterBar.classList.remove('sticky');
            }
        });
    }
});