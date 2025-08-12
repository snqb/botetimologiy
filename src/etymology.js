import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LANGUAGE_PROMPTS = {
  english:
    "Create a detailed scientific etymology with phonetic transformations in English",
  russian:
    "Создай детальную научную этимологию с фонетическими трансформациями на русском",
  kyrgyz:
    "Кыргыз тилинде толук илимий этимология жана үн өзгөрүүлөрү менен түзүңүз",
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

export async function generateEtymologyTree(language) {
  try {
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;

    const prompt = `${basePrompt} - create ONLY the visual tree diagram for a fascinating word from any field.

Format: COMPACT TREE ONLY (no explanatory text):

WORD [/IPA/]
├── Proto-form: *reconstruction [/proto_IPA/]
├── Route: lang₁(date) → lang₂(date) → modern
├── Phonetic: [key sound changes]
├── Morphology: [category changes]
├── Semantic: old_meaning → new_meaning
└── Roots: morpheme₁(meaning) + morpheme₂(meaning)

Examples:
СЛОН [/slon/]
├── Proto-form: *laṅkā [/laŋkaː/]
├── Route: Sanskrit(5th BCE) → Old Slavic → Russian
├── Phonetic: [laŋ] → [lon] via metathesis
├── Morphology: Sanskrit noun → Slavic noun
├── Semantic: "Sri Lanka island" → "elephant"
└── Roots: laṅkā(Ceylon island)

ONLY the tree - no additional explanation. Write in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a linguist. Create ONLY compact visual trees showing etymology. No explanatory text - just the tree structure. Be concise.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "Tree generation failed";
  } catch (error) {
    console.error("Error generating tree:", error);
    throw error;
  }
}

export async function generateEtymologyDetails(language, word) {
  try {
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;

    const prompt = `${basePrompt} - provide detailed scientific explanation for the word: ${word}

Explain ONLY:
- Phonetic transformations with specific sound laws
- Morphological adaptations and grammatical changes
- Semantic evolution with historical context
- Cross-linguistic cognates and related forms

Be scientific and precise. Around 100 words maximum. Write entirely in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a historical linguist. Provide concise scientific explanations of word evolution focusing on precise phonetic laws and morphological changes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.6,
    });

    return response.choices[0]?.message?.content || "Details generation failed";
  } catch (error) {
    console.error("Error generating details:", error);
    throw error;
  }
}

export async function generateEtymology(language) {
  return generateEtymologyTree(language);
}

export async function generateCentralAsianEtymology(language) {
  try {
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;

    const culturalPrompt = `${basePrompt} focusing on Central Asian etymology and Silk Road word migrations.

FOCUS: Scientific analysis of Central Asian etymology with detailed transformations.

Priority areas:
- Kyrgyz-Persian-Arabic contact linguistics (Islamic scholarly transmission)
- Russian-Kyrgyz phonetic adaptations (Soviet language contact)
- Ancient Turkic reconstructions and cognate analysis
- Silk Road trade terminology with systematic sound changes
- Nomadic-to-sedentary cultural linguistic shifts

Format with SCIENTIFIC CULTURAL TREE:

WORD [/modern_IPA/]
├── Etymology: *proto-form [/proto_IPA/] → intermediate [/inter_IPA/]
├── Phonetic Laws: [specific sound change rules]
├── Morphological Adaptation: [grammatical category changes]
├── Semantic Development: [meaning evolution with dates]
├── Cultural Transmission: [detailed migration context]
├── Route: source_lang(date) → intermediate(date) → target(date)
└── Cognates: [related forms in other languages]

Examples:
БАКЧА [/bɑq.t͡ʃɑ/] "garden"
├── Etymology: Persian bāgh [/baːɣ/] → Kyrgyz bakcha
├── Phonetic Laws: [ɣ] → [q] → [t͡ʃ], vowel harmony adaptation
├── Morphological Adaptation: Persian noun → Kyrgyz noun + diminutive -ча
├── Semantic Development: "enclosed space" → "walled garden" → "vegetable garden"
├── Cultural Transmission: Islamic agricultural practices, 10th-12th centuries
├── Route: Old Persian (6th c.) → Classical Persian (9th c.) → Chagatai Turkic → Kyrgyz
└── Cognates: Uzbek bog'cha, Kazakh бақша, Turkish bahçe

Show precise linguistic analysis with scientific methodology. Around 150 words maximum in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a specialist in Central Asian historical linguistics with expertise in phonetic laws, morphological reconstruction, and contact linguistics. Provide detailed scientific analysis of word transformations including IPA transcriptions, proto-form reconstructions, regular sound changes, and precise semantic development. Focus on Turkic-Persian-Arabic-Russian language contact.",
        },
        {
          role: "user",
          content: culturalPrompt,
        },
      ],
      max_tokens: 250,
      temperature: 0.6,
    });

    const content =
      response.choices[0]?.message?.content || "Etymology generation failed";

    // Check message length for Telegram limits (4096 chars)
    if (content.length > 4000) {
      console.warn(
        `Central Asian etymology too long: ${content.length} chars, truncating`,
      );
      return content.substring(0, 3800) + "\n\n[...]";
    }

    return content;
  } catch (error) {
    console.error("Central Asian etymology error:", error);
    throw error;
  }
}
