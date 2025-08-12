# Etymology Telegram Bot

## Purpose
A Telegram bot that sends scientifically detailed etymologies to users at configurable minute intervals, specializing in cross-cultural word journeys and phonetic evolution analysis. Users select their preferred language (Kyrgyz, Russian, English) and receive automatically curated etymology content with detailed linguistic transformations and cultural migration paths.

## Architecture
- **Bot Framework**: Grammy (modern Telegram bot library)
- **AI Integration**: OpenAI API (GPT-4) for generating etymologies
- **Storage**: Simple JSON file for user preferences
- **Scheduling**: Node.js intervals for periodic sends
- **Languages**: Kyrgyz, Russian, English
- **Specialization**: Cross-cultural etymology with Central Asian focus

## Key Features
- Language selection (Kyrgyz/Russian/English)
- **Automatic curation** of fascinating etymologies from diverse fields
- **Minute-based intervals** (1-60 minutes) for frequent discovery
- Manual etymology requests with "More" button
- **Scientific tree diagrams** with phonetic transcriptions (IPA)
- **Detailed transformations**: phonetic laws, morphological changes, semantic evolution
- **Cross-cultural etymology focus** (Silk Road, Soviet influence, Arabic/Persian borrowings)
- Mixed etymology types (40% Central Asian cultural, 60% general scientific)
- **Proto-form reconstructions** and cognate analysis
- Etymologies written in user's chosen language

## Tech Stack
- Node.js
- Grammy (Telegram bot framework)
- OpenAI API
- JSON file storage (simple approach)

## Etymology Format
Scientific trees showing detailed linguistic evolution:

```
WORD [/modern_IPA/]
├── Proto-form: *reconstruction [/proto_phonetic/]
├── Phonetic Evolution: [detailed sound changes]
├── Morphological Changes: [grammatical transformations]
├── Semantic Evolution: [meaning shifts with dates]
├── Cultural Route: lang₁ → lang₂ → lang₃ → modern
└── Root Analysis: morpheme₁(meaning) + morpheme₂(meaning)
```

## Cultural Focus Areas
- **Silk Road etymologies**: Trade words that traveled Central Asia ↔ Europe/China
- **Soviet linguistic influence**: Russian → Kyrgyz/Central Asian languages  
- **Islamic expansion**: Arabic/Persian → Central Asian languages
- **Turkic family connections**: Ancient Turkic words across language families
- **Nomadic transitions**: Words showing cultural shifts (nomadic → settled)

## User Flow
1. User starts bot
2. Selects language (ky/ru/en)
3. Sets sending interval (1-60 minutes)
4. Receives periodic scientific etymologies (auto-curated from diverse fields)
5. Gets mixed content: 40% Central Asian cultural + 60% general scientific
6. Can request more etymologies manually