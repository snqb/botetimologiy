import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LANGUAGE_PROMPTS = {
  english: "Create a concise etymology with visual tree diagrams in English",
  russian: "Создай краткую этимологию с визуальными диаграммами на русском",
  kyrgyz: "Кыргыз тилинде кыска этимология жана көрүнүктүү диаграмма түзүңүз",
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

Format with VISUAL TREE + mathematical breakdown:

WORD
├── Origin: [language/culture, time period]
├── Route: lang₁ → lang₂ → lang₃ → modern
├── Cultural Context: [trade/religion/politics/science]
└── Components: root₁(meaning) + root₂(meaning)

Then explain:
- Historical migration path between cultures
- Semantic shifts during cultural transfer
- Modern cross-linguistic connections

Examples:
ALGORITHM
├── Origin: Arabic (al-Khwarizmi, ~825 CE)
├── Route: Arabic → Medieval Latin → European languages
├── Cultural Context: Islamic Golden Age mathematics
└── Components: al(the) + Khwarizmi(from Khwarezm region)

Be analytical and informative. Around 200 words. Write entirely in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.

Use simple formatting - avoid special characters that need escaping.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a linguist who presents etymologies as visual trees showing cultural transmission paths. Use precise analysis, show morphological breakdowns, and explain semantic evolution clearly. Use simple formatting - avoid special characters.",
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
}

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
- Words showing nomadic to settled cultural transitions

Format with CULTURAL TREE:

WORD
├── Origin: [language/culture, time period]
├── Migration: [why it traveled - trade/religion/politics]
├── Route: source → intermediary → Kyrgyz/Russian/English
├── Adaptations: [how pronunciation/meaning changed]
└── Roots: component₁(meaning) + component₂(meaning)

Examples of good targets:
- бакча (garden) from Persian bāgh
- машина (machine) Russian to Kyrgyz
- чай (tea) Chinese chá via Silk Road
- китеп (book) from Arabic kitāb
- базар (market) from Persian bāzār

Show the cultural story behind the word journey. Around 200 words in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a specialist in Central Asian linguistic history and Silk Road etymology. Focus on words that show cultural contact between Turkic, Persian, Arabic, Russian, and Chinese civilizations. Show how words moved with people, trade, and ideas.",
        },
        {
          role: "user",
          content: culturalPrompt,
        },
      ],
      max_tokens: 350,
      temperature: 0.8,
    });

    return (
      response.choices[0]?.message?.content || "Etymology generation failed"
    );
  } catch (error) {
    console.error("Central Asian etymology error:", error);
    throw error;
  }
}
