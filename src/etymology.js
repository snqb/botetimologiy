import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LANGUAGE_PROMPTS = {
  english: "Create a concise etymology with cute math diagrams in English",
  russian:
    "Создай краткую этимологию с милыми математическими диаграммами на русском",
  kyrgyz:
    "Кыргыз тилинде кыска этимология жана жакшы математикалык диаграмма түзүңүз",
};

const INTEREST_EXAMPLES = {
  english:
    "technology, cooking, medicine, music, sports, history, mythology, astronomy, literature, architecture",
  russian:
    "технологии, кулинария, медицина, музыка, спорт, история, мифология, астрономия, литература, архитектура",
  kyrgyz:
    "технология, тамак-аш, медицина, музыка, спорт, тарых, мифология, астрономия, адабият, архитектура",
};

export function getInterestExamples(language) {
  return INTEREST_EXAMPLES[language] || INTEREST_EXAMPLES.english;
}

export async function generateEtymology(language, interests) {
  try {
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;
    const interestList = Array.isArray(interests)
      ? interests.join(", ")
      : interests;

    const prompt = `${basePrompt} about a word from: ${interestList}.

PRIORITY: Focus on cross-cultural word journeys - especially words that traveled through:
- Silk Road trade routes (Central Asia ↔ Europe/China)
- Soviet linguistic influence (Russian → Kyrgyz/Central Asian languages)
- Arabic/Persian borrowings (Islamic expansion → Central Asia)
- Turkic language family connections
- Russian-Kyrgyz language contact
- Colonial/globalization spread

Format with VISUAL TREE + mathematical breakdown:

WORD
├── Origin: [language/culture, time period]
├── Route: lang₁ → lang₂ → lang₃ → modern
├── Cultural Context: [trade/religion/politics/science]
└── Components: root₁(meaning) + root₂(meaning)

Then explain:
- Historical migration path between cultures
- Why the word traveled (trade, conquest, science, religion)
- Semantic shifts during cultural transfer
- How different cultures adapted pronunciation/meaning
- Modern cross-linguistic connections
- Regional variations

Examples:
ALGORITHM
├── Origin: Arabic (al-Khwarizmi, Baghdad ~825 CE)
├── Route: Arabic → Medieval Latin → European languages
├── Cultural Context: Islamic Golden Age mathematics
└── Components: al(the) + Khwarizmi(from Khwarezm region)

SUGAR
├── Origin: Sanskrit (शर्करा śarkarā)
├── Route: Sanskrit → Persian → Arabic → Silk Road → European languages
├── Cultural Context: Trade commodity, Buddhist/Islamic transmission
└── Components: śar(to break) + karā(fragments)

Be analytical and show cultural bridges. Around 200 words. Write entirely in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.

Use simple formatting - avoid special characters that need escaping.`;</parameter>
</invoke>

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a historical linguist specializing in cross-cultural word migration. Present etymologies as visual trees showing cultural transmission paths. Focus on how words traveled between civilizations, especially through Central Asia, Silk Road, and Soviet influence. Use precise analysis and show cultural connections. Use simple formatting - avoid special characters.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 350,
      temperature: 0.9,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error("No content in OpenAI response:", response);
      throw new Error("Empty response from OpenAI");
    }

    return content;
  } catch (error) {
    console.error("Error generating etymology:", error);
    if (error.code === "insufficient_quota") {
      throw new Error("OpenAI quota exceeded");
    } else if (error.code === "invalid_api_key") {
      throw new Error("Invalid OpenAI API key");
    } else {
      throw new Error(`API Error: ${error.message || "Unknown error"}`);
    }
  }

// Enhanced etymology with Central Asian cultural focus
export async function generateCentralAsianEtymology(language, interests) {
    try {
      const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;
      const interestList = Array.isArray(interests)
        ? interests.join(", ")
        : interests;

      const culturalPrompt = `${basePrompt} about a word from: ${interestList}.

  FOCUS: Central Asian cultural bridges and Silk Road etymologies.

  Priority word types:
  - Kyrgyz words borrowed from Arabic/Persian (Islamic influence)
  - Russian words that entered Kyrgyz during Soviet period
  - Ancient Turkic words spread across language families
  - Trade words that traveled the Silk Road
  - Words showing nomadic → settled cultural transitions

  Format with CULTURAL TREE:

  WORD
  ├── Origin: [language/culture, time period]
  ├── Migration: [why it traveled - trade/religion/politics]
  ├── Route: source → intermediary → Kyrgyz/Russian/English
  ├── Adaptations: [how pronunciation/meaning changed]
  └── Roots: component₁(meaning) + component₂(meaning)

  Examples of good targets:
  - бакча (garden) ← Persian bāgh
  - машина (machine) ← Russian → Kyrgyz
  - чай (tea) ← Chinese chá via Silk Road
  - китеп (book) ← Arabic kitāb
  - базар (market) ← Persian bāzār

  Show the cultural story behind the word journey. Around 200 words in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a specialist in Central Asian linguistic history and Silk Road etymology. Focus on words that show cultural contact between Turkic, Persian, Arabic, Russian, and Chinese civilizations. Show how words moved with people, trade, and ideas.",
          },
          {
            role: "user",
            content: culturalPrompt,
          },
        ],
        max_tokens: 350,
        temperature: 0.8,
      });

      return response.choices[0]?.message?.content || "Etymology generation failed";
    } catch (error) {
      console.error("Central Asian etymology error:", error);
      throw error;
    }
  }
