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

export async function generateEtymology(language) {
  try {
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;

    const prompt = `${basePrompt} - create comprehensive etymology with visual tree + detailed explanation.

Format: SCIENTIFIC TREE + FULL EXPLANATION:

WORD [/IPA/]
├── Proto-form: *reconstruction [/proto_IPA/]
├── Route: lang₁(date) → lang₂(date) → lang₃(date) → modern
├── Phonetic Evolution: [detailed sound changes with rules]
├── Morphological Changes: [grammatical transformations]
├── Semantic Development: [meaning shifts with historical context]
├── Cultural Context: [transmission circumstances]
└── Root Analysis: morpheme₁(meaning) + morpheme₂(meaning)

Then provide detailed explanation:
- Step-by-step phonetic transformations with sound laws
- Morphological adaptations and grammatical category shifts
- Historical semantic evolution with dates and cultural context
- Cross-linguistic cognates and comparative analysis
- Cultural transmission circumstances and social factors

Examples:
ALGORITHM [/ˈælɡərɪðəm/]
├── Proto-form: *al-Khwārizmī [/al.xwaː.ɾiz.miː/]
├── Route: Arabic(9th c.) → Medieval Latin algorismus → Old French → English
├── Phonetic Evolution: [xw] → [ɡ], [iː] → [ɪ], stress shift to initial
├── Morphological Changes: Arabic proper noun → Latin masculine → English common noun
├── Semantic Development: "from Khwarezm region" → "calculation method" → "computer procedure"
├── Cultural Context: Islamic mathematics transmission via translation movement
└── Root Analysis: al(definite article) + Khwārizm(Central Asian region)

Be thorough and scientific. Around 300-400 words with complete linguistic analysis. Write entirely in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a historical linguist specializing in comprehensive etymological analysis. Provide detailed scientific explanations with visual trees, phonetic laws, morphological changes, and cultural transmission context. Be thorough and precise.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error("No content in OpenAI response:", response);
      throw new Error("Empty response from OpenAI");
    }

    // Check message length for Telegram limits (4096 chars)
    if (content.length > 4000) {
      console.warn(`Etymology too long: ${content.length} chars, truncating`);
      return content.substring(0, 3800) + "\n\n[...]";
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

export async function generateCentralAsianEtymology(language) {
  try {
    const basePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english;

    const culturalPrompt = `${basePrompt} focusing on Central Asian etymology and cultural word migrations.

FOCUS: Detailed Central Asian linguistic analysis with cultural transmission.

Priority word types:
- Kyrgyz words from Arabic/Persian (Islamic scholarly transmission)
- Russian words adapted into Kyrgyz (Soviet linguistic contact)
- Ancient Turkic reconstructions across language families
- Silk Road trade terminology with systematic sound changes
- Nomadic-to-sedentary cultural linguistic adaptations

Create comprehensive visual tree:

WORD [/modern_IPA/]
├── Proto-form: *reconstruction [/proto_IPA/]
├── Cultural Route: source_culture(date) → intermediate → target_culture(date)
├── Transmission Context: [why word traveled - trade/religion/politics/science]
├── Phonetic Evolution: [detailed sound change rules and processes]
├── Morphological Shifts: [grammatical adaptations and category changes]
├── Semantic Development: [meaning evolution with historical contexts]
└── Cognate Analysis: [related forms across Turkic/Persian/Arabic languages]

Examples:
БАКЧА [/bɑq.t͡ʃɑ/] "garden"
├── Etymology: Persian bāgh [/baːɣ/] → Kyrgyz bakcha
├── Phonetic Laws: [ɣ] → [q] → [t͡ʃ], vowel harmony adaptation
├── Morphological Adaptation: Persian noun → Kyrgyz noun + diminutive -ча
├── Semantic Development: "enclosed space" → "walled garden" → "vegetable garden"
├── Cultural Transmission: Islamic agricultural practices, 10th-12th centuries
├── Route: Old Persian (6th c.) → Classical Persian (9th c.) → Chagatai Turkic → Kyrgyz
└── Cognates: Uzbek bog'cha, Kazakh бақша, Turkish bahçe

Show comprehensive linguistic analysis with detailed scientific methodology and cultural context. Around 400-500 words with complete analysis. Write entirely in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

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
      max_tokens: 1000,
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
