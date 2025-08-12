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
- [x] Interest sphere configuration with examples
- [x] Interval setting with 1-24 hour validation
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
- [x] Dockerfile for containerized deployment
- [x] Railway.json for Railway platform deployment

### In Progress
- [x] Testing with real Telegram bot
- [x] Fixed callback query timeout errors
- [x] Added proper loading states and menu navigation
- [x] Verify mathematical diagram formatting works correctly
- [x] Enhanced with visual tree format and cultural context
- [x] Added specialized Central Asian etymology generation (40% chance)

### Next Steps
1. Verify OpenAI API integration with new cultural prompts
2. Test visual tree formatting in Telegram
3. Test scheduling functionality with mixed etymology types
4. Deploy to Railway platform
5. Optional: Add etymology type preferences (cultural vs standard)
6. Optional: Add etymology favoriting/bookmarking

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
- Interval limits: 1-24 hours (sane bounds)
- Allow repeats (simpler implementation)

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
docker build -t etymology-bot .
docker run -d --name etymology-bot \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e OPENAI_API_KEY=your_key \
  -v $(pwd)/data:/app/data \
  etymology-bot
```

### Latest Updates
- Made etymologies mathematical and analytical
- Added visual tree diagram format with cultural migration paths
- Enhanced with cross-cultural etymology focus (Silk Road, Soviet, Arabic/Persian)
- Clean professional tone without emojis
- 200-word responses with full context and cultural analysis
- Fixed callback query timeout errors with proper error handling
- Added specialized Central Asian etymology generation (40% random chance)
- Implemented loading indicators with typing chat actions
- Created interactive menu system with multilingual support
- Added bot command menu for better UX
- Focus on words that traveled between civilizations and cultures