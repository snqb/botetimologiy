# Etymology Telegram Bot Setup

## Prerequisites
- Node.js 18+ 
- pnpm
- Telegram Bot Token (from @BotFather)
- OpenAI API Key

## Local Setup

1. **Install dependencies**
```bash
pnpm install
```

2. **Environment Setup**
Create `.env` file:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
OPENAI_API_KEY=your_openai_key_here
```

3. **Get Telegram Bot Token**
- Message @BotFather on Telegram
- Use `/newbot` command
- Follow instructions to create bot
- Copy the token to `.env`

4. **Get OpenAI API Key**
- Go to https://platform.openai.com/api-keys
- Create new API key
- Copy to `.env`

5. **Run the bot**
```bash
pnpm start
```

## Deployment

### Railway Platform
1. Connect GitHub repo to Railway
2. Set environment variables:
   - `TELEGRAM_BOT_TOKEN`
   - `OPENAI_API_KEY`
3. Railway auto-deploys using `railway.json` config

### Docker
```bash
# Build image
docker build -t etymology-bot .

# Run container
docker run -e TELEGRAM_BOT_TOKEN=your_token -e OPENAI_API_KEY=your_key etymology-bot
```

### Manual Server
```bash
# On your server
git clone your-repo
cd etymology-bot
pnpm install
# Set environment variables
pnpm start
```

## Usage

1. Start conversation with your bot
2. Select language: Kyrgyz, Russian, or English
3. Set sending interval (1-60 minutes)
4. Receive scientific etymologies automatically (auto-curated from diverse fields)
5. Get detailed phonetic transformations and cultural migration paths
6. Request more etymologies with `/etymology`

## Commands
- `/start` - Setup bot (language + interval)
- `/etymology` - Get etymology now
- `/menu` - Open interactive menu
- `/settings` - Change language/interval

## Features
- **Scientific approach**: Detailed phonetic transformations with IPA
- **Proto-form reconstructions**: Historical linguistic analysis  
- **Cultural focus**: 40% Central Asian/Silk Road etymologies
- **Auto-curation**: No need to specify interests - bot picks fascinating words
- **Minute intervals**: Fast delivery (1-60 minutes vs hours)
- **Morphological analysis**: Grammatical transformation tracking

## Project Structure
```
├── src/
│   ├── bot.js          # Main bot logic + simplified flow
│   ├── etymology.js    # Enhanced scientific etymology generation
│   └── storage.js      # User data management
├── data/
│   └── users.json      # User preferences (language + interval only)
├── Dockerfile          # Container deployment
├── railway.json        # Railway platform config
└── package.json
```
