import { Bot, Keyboard, InlineKeyboard } from "grammy";
import { config } from "dotenv";
import { getUser, saveUser, getUsersWithIntervals } from "./storage.js";
import {
  generateEtymology,
  generateCentralAsianEtymology,
  getInterestExamples,
} from "./etymology.js";

config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// User states
const userStates = new Map();

// Language options
const LANGUAGES = {
  "🇰🇬 Кыргызча": "kyrgyz",
  "🇷🇺 Русский": "russian",
  "🇬🇧 English": "english",
};

// Text messages by language
const MESSAGES = {
  kyrgyz: {
    welcome: "Саламатсызбы! Этимология ботуна кош келиңиз! 🌟\nТилди тандаңыз:",
    interests: "Кызыгуучу тармактарыңызды жазыңыз (үлгү)",
    interval: "Канча саатта бир этимология алгыңыз келет? (1-24 саат)",
    setup_complete:
      "Жөндөө аяктады! Этимология алуу үчүн /etymology колдонуңуз",
    invalid_interval: "Сураныч, 1дөн 24кө чейинки сан жазыңыз",
    error: "Ката кетти. Кайрадан аракет кылыңыз.",
  },
  russian: {
    welcome: "Привет! Добро пожаловать в бот этимологии! 🌟\nВыберите язык:",
    interests: "Напишите ваши сферы интересов (например",
    interval: "Как часто отправлять этимологии? (1-24 часа)",
    setup_complete:
      "Настройка завершена! Используйте /etymology для получения этимологии",
    invalid_interval: "Пожалуйста, введите число от 1 до 24",
    error: "Произошла ошибка. Попробуйте еще раз.",
  },
  english: {
    welcome: "Hello! Welcome to the Etymology Bot! 🌟\nSelect your language:",
    interests: "Write your spheres of interest (example",
    interval: "How often should I send etymologies? (1-24 hours)",
    setup_complete: "Setup complete! Use /etymology to get an etymology",
    invalid_interval: "Please enter a number between 1 and 24",
    error: "An error occurred. Please try again.",
  },
};

function createLanguageKeyboard() {
  const keyboard = new Keyboard();
  Object.keys(LANGUAGES).forEach((lang) => {
    keyboard.text(lang).row();
  });
  return keyboard.resized();
}

function createMoreButton(language) {
  const moreText =
    language === "kyrgyz"
      ? "Дагы 📚"
      : language === "russian"
        ? "Ещё 📚"
        : "More 📚";
  return new InlineKeyboard().text(moreText, "more_etymology");
}

function createMainMenu(language) {
  const menu = new InlineKeyboard();

  if (language === "kyrgyz") {
    menu.text("📚 Этимология алуу", "get_etymology").row();
    menu.text("⚙️ Жөндөөлөр", "settings_menu").row();
    menu.text("ℹ️ Маалымат", "info").row();
  } else if (language === "russian") {
    menu.text("📚 Получить этимологию", "get_etymology").row();
    menu.text("⚙️ Настройки", "settings_menu").row();
    menu.text("ℹ️ Информация", "info").row();
  } else {
    menu.text("📚 Get Etymology", "get_etymology").row();
    menu.text("⚙️ Settings", "settings_menu").row();
    menu.text("ℹ️ Info", "info").row();
  }

  return menu;
}

function createSettingsMenu(language) {
  const menu = new InlineKeyboard();

  if (language === "kyrgyz") {
    menu.text("🌐 Тил өзгөртүү", "change_language").row();
    menu.text("🎯 Кызыкчылыктар", "change_interests").row();
    menu.text("⏰ Интервал", "change_interval").row();
    menu.text("🔙 Артка", "main_menu").row();
  } else if (language === "russian") {
    menu.text("🌐 Изменить язык", "change_language").row();
    menu.text("🎯 Интересы", "change_interests").row();
    menu.text("⏰ Интервал", "change_interval").row();
    menu.text("🔙 Назад", "main_menu").row();
  } else {
    menu.text("🌐 Change Language", "change_language").row();
    menu.text("🎯 Interests", "change_interests").row();
    menu.text("⏰ Interval", "change_interval").row();
    menu.text("🔙 Back", "main_menu").row();
  }

  return menu;
}

bot.command("start", async (ctx) => {
  userStates.set(ctx.from.id, "selecting_language");
  await ctx.reply(MESSAGES.english.welcome, {
    reply_markup: createLanguageKeyboard(),
  });
});

bot.command("menu", async (ctx) => {
  const user = getUser(ctx.from.id);
  if (!user || !user.language) {
    await ctx.reply("Please setup the bot first with /start");
    return;
  }

  const menuText =
    user.language === "kyrgyz"
      ? "Башкы меню:"
      : user.language === "russian"
        ? "Главное меню:"
        : "Main menu:";

  await ctx.reply(menuText, {
    reply_markup: createMainMenu(user.language),
  });
});

bot.command("etymology", async (ctx) => {
  const user = getUser(ctx.from.id);
  if (!user || !user.language || !user.interests) {
    await ctx.reply("Please setup the bot first with /start");
    return;
  }

  try {
    // Show typing indicator
    await ctx.replyWithChatAction("typing");

    // Use enhanced cultural etymology 40% of the time
    const useCultural = Math.random() < 0.4;
    const etymology = useCultural
      ? await generateCentralAsianEtymology(user.language, user.interests)
      : await generateEtymology(user.language, user.interests);

    await ctx.reply(etymology, {
      reply_markup: createMoreButton(user.language),
    });
  } catch (error) {
    console.error("Etymology command error:", error.message);
    const msg = MESSAGES[user.language] || MESSAGES.english;
    await ctx.reply(`${msg.error}\n\nDetails: ${error.message}`);
  }
});

bot.command("settings", async (ctx) => {
  userStates.set(ctx.from.id, "selecting_language");
  await ctx.reply(MESSAGES.english.welcome, {
    reply_markup: createLanguageKeyboard(),
  });
});

bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;
  const state = userStates.get(userId);
  const text = ctx.message.text;

  if (state === "selecting_language") {
    const selectedLang = LANGUAGES[text];
    if (selectedLang) {
      saveUser(userId, { language: selectedLang });
      userStates.set(userId, "entering_interests");

      const examples = getInterestExamples(selectedLang);
      const msg = MESSAGES[selectedLang];
      await ctx.reply(`${msg.interests}: ${examples})`, {
        reply_markup: { remove_keyboard: true },
      });
    }
  } else if (state === "entering_interests") {
    const user = getUser(userId);
    saveUser(userId, { interests: text.split(",").map((s) => s.trim()) });
    userStates.set(userId, "setting_interval");

    const msg = MESSAGES[user.language];
    await ctx.reply(msg.interval);
  } else if (state === "setting_interval") {
    const hours = parseInt(text);
    if (isNaN(hours) || hours < 1 || hours > 24) {
      const user = getUser(userId);
      const msg = MESSAGES[user.language];
      await ctx.reply(msg.invalid_interval);
      return;
    }

    const user = getUser(userId);
    saveUser(userId, { interval: hours });
    userStates.delete(userId);

    const msg = MESSAGES[user.language];
    await ctx.reply(msg.setup_complete);
  }
});

bot.on("callback_query:data", async (ctx) => {
  try {
    const data = ctx.callbackQuery.data;
    const user = getUser(ctx.from.id);

    if (data === "more_etymology") {
      if (user && user.language && user.interests) {
        try {
          // Show typing indicator
          await ctx.replyWithChatAction("typing");

          // Use enhanced cultural etymology 40% of the time
          const useCultural = Math.random() < 0.4;
          const etymology = useCultural
            ? await generateCentralAsianEtymology(user.language, user.interests)
            : await generateEtymology(user.language, user.interests);

          await ctx.editMessageText(etymology, {
            reply_markup: createMoreButton(user.language),
          });
          await ctx.answerCallbackQuery();
        } catch (error) {
          console.error("More button error:", error.message);
          const msg = MESSAGES[user.language] || MESSAGES.english;
          await ctx.answerCallbackQuery(`${msg.error}: ${error.message}`);
        }
      } else {
        await ctx.answerCallbackQuery("Please setup the bot first with /start");
      }
    } else if (data === "get_etymology") {
      if (user && user.language && user.interests) {
        try {
          await ctx.replyWithChatAction("typing");

          // Use enhanced cultural etymology 40% of the time
          const useCultural = Math.random() < 0.4;
          const etymology = useCultural
            ? await generateCentralAsianEtymology(user.language, user.interests)
            : await generateEtymology(user.language, user.interests);

          await ctx.reply(etymology, {
            reply_markup: createMoreButton(user.language),
          });
          await ctx.answerCallbackQuery();
        } catch (error) {
          console.error("Menu etymology error:", error.message);
          const msg = MESSAGES[user.language] || MESSAGES.english;
          await ctx.answerCallbackQuery(`${msg.error}: ${error.message}`);
        }
      } else {
        await ctx.answerCallbackQuery("Please setup the bot first with /start");
      }
    } else if (data === "main_menu") {
      if (user && user.language) {
        const menuText =
          user.language === "kyrgyz"
            ? "Башкы меню:"
            : user.language === "russian"
              ? "Главное меню:"
              : "Main menu:";

        await ctx.editMessageText(menuText, {
          reply_markup: createMainMenu(user.language),
        });
        await ctx.answerCallbackQuery();
      }
    } else if (data === "settings_menu") {
      if (user && user.language) {
        const settingsText =
          user.language === "kyrgyz"
            ? "Жөндөөлөр:"
            : user.language === "russian"
              ? "Настройки:"
              : "Settings:";

        await ctx.editMessageText(settingsText, {
          reply_markup: createSettingsMenu(user.language),
        });
        await ctx.answerCallbackQuery();
      }
    } else if (data === "change_language") {
      userStates.set(ctx.from.id, "selecting_language");
      await ctx.editMessageText(MESSAGES.english.welcome, {
        reply_markup: createLanguageKeyboard(),
      });
      await ctx.answerCallbackQuery();
    } else if (data === "change_interests") {
      if (user && user.language) {
        userStates.set(ctx.from.id, "entering_interests");
        const examples = getInterestExamples(user.language);
        const msg = MESSAGES[user.language];
        await ctx.editMessageText(`${msg.interests}: ${examples})`);
        await ctx.answerCallbackQuery();
      }
    } else if (data === "change_interval") {
      if (user && user.language) {
        userStates.set(ctx.from.id, "setting_interval");
        const msg = MESSAGES[user.language];
        await ctx.editMessageText(msg.interval);
        await ctx.answerCallbackQuery();
      }
    } else if (data === "info") {
      if (user && user.language) {
        const infoText =
          user.language === "kyrgyz"
            ? "🤖 Этимология бот\n\nБул бот сөздөрдүн келип чыгышын изилдейт жана кызыктуу маалыматтарды бөлүшөт.\n\n📊 Командалар:\n/start - Баштоо\n/etymology - Этимология алуу\n/menu - Башкы меню\n/settings - Жөндөөлөр"
            : user.language === "russian"
              ? "🤖 Бот этимологии\n\nЭтот бот исследует происхождение слов и делится интересными фактами.\n\n📊 Команды:\n/start - Начать\n/etymology - Получить этимологию\n/menu - Главное меню\n/settings - Настройки"
              : "🤖 Etymology Bot\n\nThis bot explores word origins and shares fascinating etymological facts.\n\n📊 Commands:\n/start - Get started\n/etymology - Get etymology\n/menu - Main menu\n/settings - Settings";

        await ctx.editMessageText(infoText, {
          reply_markup: createMainMenu(user.language),
        });
        await ctx.answerCallbackQuery();
      }
    } else {
      await ctx.answerCallbackQuery();
    }
  } catch (error) {
    console.error("Callback query error:", error);
    // Don't re-throw, just log it to prevent crashes
  }
});

// Scheduled sending
function startScheduledSending() {
  setInterval(
    async () => {
      const users = getUsersWithIntervals();
      const now = new Date();

      for (const user of users) {
        const lastSent = user.lastSent ? new Date(user.lastSent) : new Date(0);
        const hoursDiff = (now - lastSent) / (1000 * 60 * 60);

        if (hoursDiff >= user.interval) {
          try {
            // Show typing indicator for scheduled messages
            await bot.api.sendChatAction(user.userId, "typing");

            // Use enhanced cultural etymology 40% of the time
            const useCultural = Math.random() < 0.4;
            const etymology = useCultural
              ? await generateCentralAsianEtymology(
                  user.language,
                  user.interests,
                )
              : await generateEtymology(user.language, user.interests);

            await bot.api.sendMessage(user.userId, etymology, {
              reply_markup: createMoreButton(user.language),
            });
            saveUser(user.userId, { lastSent: now.toISOString() });
          } catch (error) {
            console.error(
              `Failed to send to user ${user.userId}:`,
              error.message,
            );
          }
        }
      }
    },
    60 * 60 * 1000,
  ); // Check every hour
}

// Add error handler
bot.catch((err) => {
  console.error("Bot error:", err.message);
  console.error("Full error:", err);
});

// Set bot commands for better UX
async function setBotCommands() {
  await bot.api.setMyCommands([
    { command: "start", description: "Start the bot and set preferences" },
    { command: "etymology", description: "Get a random etymology" },
    { command: "menu", description: "Open main menu" },
    { command: "settings", description: "Change bot settings" },
  ]);
}

bot.start();
startScheduledSending();
setBotCommands();
console.log("Etymology bot started! 🌟");
