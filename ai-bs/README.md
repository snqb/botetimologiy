# Etymology Telegram Bot Setup

## Prerequisites
- Node.js 18+ 
- pnpm
- Telegram Bot Token (from @BotFather)
- OpenAI API Key

## Quick Setup

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

## Usage

1. Start conversation with your bot
2. Select language: Kyrgyz, Russian, or English
3. Choose interest spheres (examples provided)
4. Set sending interval (1-24 hours)
5. Receive etymologies automatically or request with `/etymology`

## Commands
- `/start` - Setup bot preferences
- `/etymology` - Get etymology now
- `/settings` - Change language/interests/interval

## Project Structure
```
├── src/
│   ├── bot.js          # Main bot logic
│   ├── etymology.js    # OpenAI integration
│   └── storage.js      # User data management
├── data/
│   └── users.json      # User preferences
└── package.json
```
