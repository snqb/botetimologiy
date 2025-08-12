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

    const prompt = `${basePrompt} about any fascinating word from diverse fields: technology, science, medicine, linguistics, history, literature, mythology, anthropology, psychology, astronomy, biology, chemistry, physics, philosophy, arts, music, architecture, etc.

Format with SCIENTIFIC TREE + detailed transformations:

WORD [/phonetic_modern/]
├── Proto-form: *reconstruction [/proto_phonetic/]
├── Phonetic Evolution: [detailed sound changes]
├── Morphological Changes: [grammatical transformations]
├── Semantic Evolution: [meaning shifts with dates]
├── Cultural Route: lang₁ → lang₂ → lang₃ → modern
└── Root Analysis: morpheme₁(meaning) + morpheme₂(meaning)

Then explain with scientific detail:
- Precise phonetic transformations (sound laws, regular changes)
- Morphological adaptations (grammatical category shifts)
- Semantic evolution with historical context
- Cross-linguistic cognates and related forms
- Modern dialectal variations

Examples:
ALGORITHM [/ˈælɡərɪðəm/]
├── Proto-form: *al-Khwārizmī [/al.xwaː.ɾiz.miː/]
├── Phonetic Evolution: [xw] → [ɡ], [iː] → [ɪ], stress shift
├── Morphological Changes: Arabic proper noun → European common noun
├── Semantic Evolution: "from Khwarezm" → "calculation method" → "computer procedure"
├── Cultural Route: Arabic (9th c.) → Medieval Latin algorismus → Old French → English
└── Root Analysis: al(definite article) + Khwārizm(Central Asian region)

PSYCHOLOGY [/saɪˈkɒlədʒi/]
├── Proto-form: *psūkhē-logos [/psuː.kʰeː.lo.ɡos/]
├── Phonetic Evolution: [ps] → [s], vowel reduction, stress shift
├── Morphological Changes: Greek compound → Latin borrowing → vernacular adaptation
├── Semantic Evolution: "soul study" → "mind study" → "behavior science"
├── Cultural Route: Ancient Greek → Latin → French psychologie → English
└── Root Analysis: psūkhē(soul/breath) + logos(study/discourse)

Be highly scientific and precise. Around 250 words with detailed phonetic and morphological analysis. Write entirely in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.

Use simple formatting - avoid special characters that need escaping.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a historical linguist specializing in phonetic and morphological evolution. Present etymologies with detailed sound changes, morphological adaptations, and precise semantic development. Include IPA phonetic transcriptions, reconstruction of proto-forms, and step-by-step transformation processes. Focus on regular sound laws and systematic changes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
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

Show precise linguistic analysis with scientific methodology. Around 280 words in ${language === "kyrgyz" ? "Kyrgyz" : language === "russian" ? "Russian" : "English"}.`;

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
      max_tokens: 450,
      temperature: 0.6,
    });

    return (
      response.choices[0]?.message?.content || "Etymology generation failed"
    );
  } catch (error) {
    console.error("Central Asian etymology error:", error);
    throw error;
  }
}
