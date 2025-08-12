# Etymology Bot Progress

## Current Session - Initial Setup

### Completed
- [x] Project structure setup
- [x] Documentation files created (docs.md, README.md)
- [x] Basic project architecture defined
- [x] Package.json setup with Grammy and OpenAI dependencies
- [x] Core bot implementation with Grammy framework
- [x] OpenAI integration for etymology generation
- [x] User preferences storage with JSON files
- [x] Language selection (Kyrgyz, Russian, English)
- [x] Simplified setup flow (no interest selection - auto-curated)
- [x] Interval setting with 1-60 minute validation
- [x] Manual etymology requests with /etymology command
- [x] "More" button functionality with inline keyboards
- [x] Scheduled sending system
- [x] .env.example and .gitignore setup
- [x] Mathematical diagram format (word → root₁(meaning) + root₂(meaning))
- [x] Balanced analytical tone without emojis
- [x] 200-word responses with proper context
- [x] Visual tree diagrams showing word evolution paths
- [x] Cross-cultural etymology focus (Silk Road, Soviet influence, Arabic/Persian borrowings)
- [x] Cultural migration routes in etymology explanations
- [x] **Scientific etymology approach**: detailed phonetic transformations with IPA
- [x] **Proto-form reconstructions** and morphological analysis
- [x] **Auto-curation**: fascinating words from diverse fields without user input
- [x] **Minute-based intervals**: 1-60 minutes instead of hours
- [x] Dockerfile for containerized deployment
- [x] Railway.json for Railway platform deployment

### In Progress
- [x] Testing with real Telegram bot
- [x] Fixed callback query timeout errors
- [x] Added proper loading states and menu navigation
- [x] Verify mathematical diagram formatting works correctly
- [x] Enhanced with visual tree format and cultural context
- [x] Added specialized Central Asian etymology generation (40% chance)
- [x] Docker build working successfully

### Next Steps
1. Verify OpenAI API integration with scientific prompts
2. Test scientific tree formatting with IPA in Telegram
3. Test minute-based scheduling functionality
4. Deploy to Railway platform
5. Optional: Add etymology complexity preferences
6. Optional: Add cognate exploration features

### Technical Decisions
- **Bot Framework**: Grammy (modern, TypeScript-friendly)
- **Storage**: Simple JSON file (minimal approach)
- **AI**: OpenAI API for etymology generation
- **Scheduling**: Node.js setInterval (simple, no external deps)
- **Deployment**: Docker + Railway platform

### Notes
- Keep it minimal - no classes, just functions
- Use pnpm for package management
- Support 3 languages: Kyrgyz, Russian, English
- Interval limits: 1-60 minutes (frequent discovery)
- Auto-curated content (no user interest input needed)
- Scientific approach with IPA, proto-forms, detailed transformations

### Issues/Blockers
- Fixed: Callback query timeout errors when bot restarts
- Need to test MarkdownV2 formatting with OpenAI responses

### Session Goals
- [x] Get basic working bot with language selection
- [x] Implement manual etymology requests
- [x] Add "More" button functionality
- [x] Complete full bot implementation

### Ready to Deploy
Bot is complete with visual trees and cultural focus! 

**Local deployment:**
1. Get Telegram bot token from @BotFather
2. Get OpenAI API key
3. Set up .env file
4. Run `pnpm install && pnpm start`

**Railway deployment:**
1. Connect GitHub repo to Railway
2. Set environment variables (TELEGRAM_BOT_TOKEN, OPENAI_API_KEY)
3. Railway will auto-deploy using Dockerfile

**Docker deployment:**
```bash
docker build -t etymology-bot .  # ✅ Build working!
docker run -d --name etymology-bot \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e OPENAI_API_KEY=your_key \
  -v $(pwd)/data:/app/data \
  etymology-bot
```

### Latest Updates
- **Scientific etymology approach**: detailed phonetic transformations with IPA
- **Proto-form reconstructions** and morphological evolution analysis
- **Simplified user flow**: removed interest selection, auto-curated content
- **Minute-based intervals**: 1-60 minutes instead of hours for frequent discovery
- Added scientific tree diagram format with detailed linguistic transformations
- Enhanced with cross-cultural etymology focus (Silk Road, Soviet, Arabic/Persian)
- Clean analytical tone with scientific methodology
- 250-280 word responses with precise linguistic analysis
- Fixed callback query timeout errors and Docker build issues
- Added specialized Central Asian etymology generation (40% random chance)
- Implemented loading indicators with typing chat actions
- Created simplified settings menu (language + interval only)
- Added cognate analysis and systematic sound change documentation
- Focus on precise phonetic laws and morphological adaptations