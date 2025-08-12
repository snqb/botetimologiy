# Etymology Telegram Bot

## Purpose
A Telegram bot that sends interesting etymologies to users at configurable intervals, specializing in cross-cultural word journeys and visual etymology trees. Users can select their preferred language (Kyrgyz, Russian, English) and areas of interest to receive personalized etymology content focusing on cultural bridges and historical migration paths.

## Architecture
- **Bot Framework**: Grammy (modern Telegram bot library)
- **AI Integration**: OpenAI API (GPT-4) for generating etymologies
- **Storage**: Simple JSON file for user preferences
- **Scheduling**: Node.js intervals for periodic sends
- **Languages**: Kyrgyz, Russian, English
- **Specialization**: Cross-cultural etymology with Central Asian focus

## Key Features
- Language selection (Kyrgyz/Russian/English)
- Interest sphere configuration with examples
- Configurable send intervals (1-24 hours)
- Manual etymology requests with "More" button
- **Visual tree diagrams** showing word evolution paths
- **Cross-cultural etymology focus** (Silk Road, Soviet influence, Arabic/Persian borrowings)
- Mixed etymology types (40% cultural, 60% standard)
- Cultural migration routes and semantic evolution
- Etymologies written in user's chosen language

## Tech Stack
- Node.js
- Grammy (Telegram bot framework)
- OpenAI API
- JSON file storage (simple approach)

## Etymology Format
Visual trees showing cultural transmission:

```
WORD
├── Origin: [language/culture, time period]
├── Route: lang₁ → lang₂ → lang₃ → modern
├── Cultural Context: [trade/religion/politics/science]
└── Components: root₁(meaning) + root₂(meaning)
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
3. Chooses interest spheres (technology, cooking, medicine, etc.)
4. Sets sending interval (1-24h)
5. Receives periodic etymologies (mixed cultural + standard) + can request more