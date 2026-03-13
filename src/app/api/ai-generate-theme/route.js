import { getSupabaseClient, getSupabaseAdminClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const appDescription = body?.appDescription || ''

    const supabase = getSupabaseClient()

    const { data: existingThemes } = await supabase
      .from('themes')
      .select('name, category, code')

    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

    // If no description, generate a theme for an existing popular app
    const isRandom = !appDescription?.trim()

    // Pre-defined list of popular apps to choose from
    const POPULAR_APPS = [
  'Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Snapchat', 'Reddit',
  'Threads', 'Bluesky', 'Mastodon', 'Pinterest', 'Tumblr', 'TikTok',
  'BeReal', 'VSCO', 'MeWe', 'Parler', 'Gab', 'Clubhouse', 'Vero',
  'Path', 'Ello', 'Diaspora', 'Minds', 'Steemit', 'Hive', 'Peach',
  'Locket', 'Poparazzi', 'Yubo', 'Caffeine', 'Periscope', 'Bebo',
  'Hi5', 'Orkut', 'Friendster', 'MySpace', 'Xanga', 'LiveJournal',
  'Plurk', 'Renren', 'Weibo', 'WeChat', 'QQ', 'Douyin', 'Kuaishou',
  'Bilibili', 'Xiaohongshu', 'Zhihu', 'Baidu Tieba', 'VKontakte',
  'Odnoklassniki', 'Telegram', 'Signal', 'WhatsApp', 'Messenger',
  'Line', 'KakaoTalk', 'Viber', 'Skype', 'ICQ', 'AIM', 'Discord',
  'Slack', 'Teams', 'Zoom', 'Google Meet', 'Webex', 'GoToMeeting',
  'Jitsi', 'Around', 'Gather', 'Loom', 'Mmhmm',

  // Messaging & Communication
  'iMessage', 'Google Chat', 'Hangouts', 'Allo', 'Duo', 'FaceTime',
  'Marco Polo', 'Houseparty', 'Bunch', 'HeyTell', 'Voxer', 'Zello',
  'GroupMe', 'Kik', 'TextNow', 'TextFree', 'Google Voice', 'Talkatone',
  'Nextdoor', 'Band', 'Remind', 'Flock', 'Chanty', 'Rocket.Chat',
  'Mattermost', 'Zulip', 'Twist', 'Spike', 'Front',

  // Video & Streaming
  'YouTube', 'Netflix', 'Hulu', 'Disney+', 'HBO Max', 'Amazon Prime Video',
  'Apple TV+', 'Peacock', 'Paramount+', 'ESPN+', 'Twitch', 'Vimeo',
  'Dailymotion', 'Rumble', 'Odysee', 'BitChute', 'Plex', 'Emby',
  'Jellyfin', 'Kodi', 'VLC', 'MX Player', 'Infuse', 'Stremio',
  'Crunchyroll', 'Funimation', 'HIDIVE', 'VRV', 'Retrocrush',
  'Mubi', 'Criterion Channel', 'Shudder', 'Screambox', 'Tubi',
  'Pluto TV', 'Xumo', 'IMDb TV', 'Crackle', 'Popcornflix',
  'Kanopy', 'Hoopla', 'BritBox', 'Acorn TV', 'CuriosityStream',
  'Discovery+', 'Sling', 'FuboTV', 'YouTube TV', 'Hulu Live TV',
  'DirecTV Stream', 'PhiloTV', 'Frndly TV',

  // Music & Audio
  'Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Tidal',
  'Deezer', 'Pandora', 'iHeartRadio', 'SoundCloud', 'Bandcamp',
  'Audiomack', 'Datpiff', 'Mixcloud', 'Last.fm', 'Shazam',
  'SoundHound', 'Musixmatch', 'Genius', 'Pocket Casts', 'Overcast',
  'Castro', 'Breaker', 'Stitcher', 'Podbean', 'Anchor', 'Buzzsprout',
  'Libsyn', 'Transistor', 'Simplecast', 'Audible', 'Libby', 'Hoopla',
  'Storytel', 'Scribd', 'Blinkist', 'Headway', 'Instaread',
  'GarageBand', 'FL Studio Mobile', 'BandLab', 'Voloco', 'Smule',
  'StarMaker', 'Yokee', 'WeSing', 'Sing! Karaoke', 'AutoRap',

  // Productivity & Work
  'Notion', 'Evernote', 'OneNote', 'Bear', 'Obsidian', 'Roam Research',
  'Logseq', 'Craft', 'Notability', 'GoodNotes', 'Nebo', 'Notepad++',
  'Typora', 'iA Writer', 'Ulysses', 'Scrivener', 'Draft', 'Hemingway',
  'Grammarly', 'ProWritingAid', 'LanguageTool', 'Quillbot', 'Wordtune',
  'Todoist', 'Things', 'OmniFocus', 'Any.do', 'TickTick', 'Microsoft To Do',
  'Remember The Milk', 'Habitica', 'Streaks', 'Finch', 'Structured',
  'Fantastical', 'Calendly', 'Cal.com', 'Doodle', 'When2meet', 'Acuity',
  'Trello', 'Asana', 'Monday.com', 'ClickUp', 'Basecamp', 'Wrike',
  'Smartsheet', 'Airtable', 'Coda', 'Fibery', 'Height', 'Linear',
  'Jira', 'Confluence', 'YouTrack', 'Taiga', 'Plane', 'GitLab Issues',
  'GitHub Projects', 'Shortcut', 'ZenHub', 'Productboard', 'Aha!',
  'Miro', 'FigJam', 'MURAL', 'Conceptboard', 'Lucidspark', 'Stormboard',
  'Lark', 'Feishu', 'DingTalk', 'Workplace', 'Yammer', 'Chatter',
  'Quip', 'Slite', 'Tettra', 'Guru', 'Confluence', 'Nuclino', 'Slab',
  'Helpjuice', 'Document360', 'Gitbook', 'Archbee', 'Outline', 'Bookstack',
  'RoboHelp', 'Paligo', 'MadCap Flare',

  // Cloud Storage & File Management
  'Dropbox', 'Google Drive', 'OneDrive', 'iCloud', 'Box', 'pCloud',
  'Sync.com', 'Tresorit', 'Mega', 'MediaFire', 'WeTransfer', 'Smash',
  'Send Anywhere', 'Files.fm', 'Backblaze', 'Carbonite', 'Acronis',
  'IDrive', 'Crashplan', 'SpiderOak', 'Egnyte', 'Citrix ShareFile',

  // Design & Creative
  'Figma', 'Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD',
  'Adobe InDesign', 'Adobe After Effects', 'Adobe Premiere Pro',
  'Adobe Lightroom', 'Adobe Spark', 'Adobe Fresco', 'Adobe Animate',
  'Adobe Audition', 'Adobe Acrobat', 'Sketch', 'InVision', 'Zeplin',
  'Marvel', 'Framer', 'Origami Studio', 'Principle', 'ProtoPie',
  'Axure', 'Balsamiq', 'Whimsical', 'Overflow', 'Abstract', 'Avocode',
  'Affinity Designer', 'Affinity Photo', 'Affinity Publisher', 'CorelDRAW',
  'Inkscape', 'GIMP', 'Krita', 'Procreate', 'Clip Studio Paint',
  'Paint Tool SAI', 'Medibang Paint', 'Sketchbook', 'Adobe Draw',
  'Vectornator', 'Pixelmator', 'Acorn', 'Snapseed', 'Lightroom Mobile',
  'VSCO', 'A Color Story', 'Darkroom', 'Halide', 'Lensa', 'FaceApp',
  'Facetune', 'Meitu', 'PicsArt', 'Prisma', 'Canva', 'Over', 'Unfold',
  'StoryArt', 'Mojo', 'Splice', 'CapCut', 'InShot', 'KineMaster',
  'FilmoraGo', 'LumaFusion', 'iMovie', 'DaVinci Resolve', 'Final Cut Pro',
  'Premiere Rush', 'Magisto', 'Animoto', 'Viddyoze', 'Renderforest',
  'Biteable', 'Powtoon', 'Vyond', 'Doodly', 'VideoScribe',
  'Blender', 'Cinema 4D', 'Maya', 'ZBrush', 'Houdini', '3ds Max',
  'Modo', 'Rhino', 'SketchUp', 'Fusion 360', 'Tinkercad', 'Onshape',

  // Developer Tools
  'GitHub', 'GitLab', 'Bitbucket', 'SourceForge', 'Gitea', 'Gogs',
  'VS Code', 'Sublime Text', 'Atom', 'Vim', 'Neovim', 'Emacs',
  'JetBrains IntelliJ', 'JetBrains WebStorm', 'JetBrains PyCharm',
  'JetBrains GoLand', 'JetBrains CLion', 'JetBrains Rider',
  'Xcode', 'Android Studio', 'Eclipse', 'NetBeans', 'CodeBlocks',
  'Brackets', 'Espresso', 'Nova', 'BBEdit', 'TextMate', 'Coda',
  'Vercel', 'Netlify', 'Railway', 'Render', 'Fly.io', 'Heroku',
  'DigitalOcean', 'Linode', 'Vultr', 'AWS', 'Google Cloud', 'Azure',
  'Cloudflare', 'Fastly', 'Akamai', 'Bunny CDN', 'KeyCDN',
  'Supabase', 'Firebase', 'Appwrite', 'PlanetScale', 'Neon',
  'Turso', 'CockroachDB', 'Fauna', 'Convex', 'Hasura', 'Prisma',
  'MongoDB Atlas', 'Redis Cloud', 'Upstash', 'Pinecone', 'Weaviate',
  'Qdrant', 'Milvus', 'Chroma', 'LanceDB',
  'Postman', 'Insomnia', 'Hoppscotch', 'Bruno', 'HTTPie',
  'Swagger', 'Stoplight', 'ReadMe', 'Redoc', 'Apiary',
  'Docker', 'Kubernetes', 'Podman', 'Rancher', 'OpenShift',
  'Terraform', 'Pulumi', 'Ansible', 'Chef', 'Puppet', 'Salt',
  'Datadog', 'New Relic', 'Grafana', 'Prometheus', 'Splunk',
  'PagerDuty', 'OpsGenie', 'VictorOps', 'StatusPage', 'Pingdom',
  'Sentry', 'Rollbar', 'Bugsnag', 'Airbrake', 'Raygun',
  'LaunchDarkly', 'Split.io', 'Optimizely', 'Unleash', 'Flagsmith',
  'Segment', 'Rudderstack', 'Mixpanel', 'Amplitude', 'Heap',
  'FullStory', 'Hotjar', 'LogRocket', 'Mouseflow', 'Smartlook',
  'Linear', 'Arc Browser', 'Warp', 'iTerm2', 'Hyper', 'Alacritty',
  'Raycast', 'Alfred', 'Spotlight', 'LaunchBar', 'Cerebro',
  'Next.js', 'Tailwind CSS', 'Nx', 'Turborepo', 'Lerna', 'Rush',
  'Webpack', 'Vite', 'Parcel', 'Rollup', 'esbuild', 'SWC',
  'Prettier', 'ESLint', 'Stylelint', 'Husky', 'Lint-staged',
  'Jest', 'Vitest', 'Cypress', 'Playwright', 'Selenium', 'Puppeteer',
  'Storybook', 'Chromatic', 'Percy', 'Applitools', 'BrowserStack',
  'Sauce Labs', 'LambdaTest', 'TestRail', 'Zephyr',

  // E-Commerce & Finance
  'Amazon', 'eBay', 'Shopify', 'Etsy', 'Walmart', 'Target', 'Best Buy',
  'Wayfair', 'Overstock', 'Wish', 'AliExpress', 'Alibaba', 'Shein',
  'ASOS', 'Zara', 'H&M', 'Nike', 'Adidas', 'Puma', 'Under Armour',
  'StockX', 'GOAT', 'Stadium Goods', 'Grailed', 'Depop', 'Poshmark',
  'ThredUp', 'The RealReal', 'Vestiaire', 'Vinted', 'Mercari',
  'OfferUp', 'Facebook Marketplace', 'Craigslist', 'Letgo',
  'PayPal', 'Venmo', 'Cash App', 'Zelle', 'Apple Pay', 'Google Pay',
  'Samsung Pay', 'Stripe', 'Square', 'Braintree', 'Adyen', 'Klarna',
  'Afterpay', 'Affirm', 'Sezzle', 'Splitit', 'Zip', 'Laybuy',
  'Coinbase', 'Binance', 'Kraken', 'Gemini', 'FTX', 'Bybit',
  'Robinhood', 'Webull', 'TD Ameritrade', 'E*Trade', 'Schwab',
  'Fidelity', 'Vanguard', 'Wealthfront', 'Betterment', 'Acorns',
  'Stash', 'M1 Finance', 'Public', 'eToro', 'Plus500',
  'Mint', 'YNAB', 'Personal Capital', 'Copilot', 'Monarch', 'Simplifi',
  'QuickBooks', 'FreshBooks', 'Xero', 'Wave', 'Zoho Books', 'Sage',
  'Expensify', 'Ramp', 'Brex', 'Divvy', 'Spendesk', 'Payhawk',
  'TurboTax', 'H&R Block', 'TaxAct', 'TaxSlayer', 'FreeTaxUSA',
  'Credit Karma', 'NerdWallet', 'Bankrate', 'LendingTree',
  'Chime', 'Revolut', 'N26', 'Monzo', 'Starling', 'Ally', 'Marcus',
  'SoFi', 'Aspiration', 'Current', 'Dave', 'Varo', 'Step', 'Greenlight',

  // Travel & Transportation
  'Uber', 'Lyft', 'Bolt', 'Via', 'Grab', 'Gojek', 'Didi', 'Ola',
  'Cabify', 'inDriver', 'Heetch', 'Yandex Go', 'Careem', 'Maxim',
  'Lime', 'Bird', 'Spin', 'Voi', 'Tier', 'Dott', 'Helbiz',
  'Airbnb', 'Vrbo', 'Booking.com', 'Hotels.com', 'Expedia', 'Kayak',
  'Skyscanner', 'Google Flights', 'Momondo', 'Hopper', 'Scott\'s Cheap Flights',
  'TripAdvisor', 'Yelp', 'Foursquare', 'Google Maps', 'Apple Maps',
  'Waze', 'HERE Maps', 'MapQuest', 'Sygic', 'TomTom Go',
  'Rome2Rio', 'Wanderlog', 'TripIt', 'Roadtrippers', 'Furkot',
  'Amtrak', 'FlixBus', 'Greyhound', 'Rome2Rio', 'Omio', 'Trainline',
  'Delta', 'United', 'American Airlines', 'Southwest', 'JetBlue',
  'Alaska Airlines', 'Spirit', 'Frontier', 'Allegiant',

  // Food & Delivery
  'DoorDash', 'Uber Eats', 'Grubhub', 'Instacart', 'Postmates',
  'Seamless', 'Caviar', 'Delivery.com', 'Slice', 'Gopuff', 'goPuff',
  'Gopuff', 'Farmstead', 'Imperfect Foods', 'Misfits Market',
  'HelloFresh', 'Blue Apron', 'Home Chef', 'EveryPlate', 'Dinnerly',
  'Green Chef', 'Sun Basket', 'Purple Carrot', 'Factor', 'Freshly',
  'Yemeksepeti', 'Deliveroo', 'Just Eat', 'Takeaway.com', 'Foodora',
  'Rappi', 'iFood', 'PedidosYa', 'Zomato', 'Swiggy',
  'Starbucks', 'McDonald\'s', 'Burger King', 'Chick-fil-A', 'Chipotle',
  'Taco Bell', 'Subway', 'Domino\'s', 'Pizza Hut', 'Papa John\'s',
  'OpenTable', 'Resy', 'Yelp Reservations', 'SevenRooms', 'Tablein',
  'MyFitnessPal', 'Lose It!', 'Cronometer', 'Noom', 'WW', 'Lifesum',
  'Yummly', 'Allrecipes', 'Food Network Kitchen', 'Tasty', 'SideChef',
  'Whisk', 'Paprika', 'Mela', 'AnyList', 'OurGroceries',

  // Health & Fitness
  'Apple Health', 'Google Fit', 'Samsung Health', 'Fitbit', 'Garmin Connect',
  'Strava', 'Nike Run Club', 'Adidas Running', 'MapMyRun', 'Runkeeper',
  'Peloton', 'Beachbody', 'Daily Burn', 'Aaptiv', 'Fitbod',
  'JEFIT', 'Strong', 'Hevy', 'Rep Count', 'GymBook', 'FitNotes',
  'Headspace', 'Calm', 'Insight Timer', 'Waking Up', 'Ten Percent Happier',
  'Breathwrk', 'Oak', 'Buddhify', 'Simple Habit', 'Meditopia',
  'Nap26', 'Sleep Cycle', 'AutoSleep', 'Pillow', 'Rise', 'Oura',
  'Whoop', 'Levels', 'Ultrahuman', 'Lingo', 'Zoe', 'January AI',
  'Flo', 'Clue', 'Glow', 'Ovia', 'Premom', 'Natural Cycles',
  'BetterHelp', 'Talkspace', 'Cerebral', 'Brightside', 'Hims & Hers',
  'Roman', 'Teladoc', 'MDLive', 'Zocdoc', 'Doximity', 'GoodRx',
  'Ro', 'Keeps', 'Ritual', 'Care/of', 'Thrive Market', 'Athletic Greens',
  'ClassPass', 'Mindbody', 'WellnessLiving', 'Vagaro', 'Glofox',

  // Gaming
  'Steam', 'Epic Games', 'GOG', 'itch.io', 'Humble Bundle',
  'Xbox Game Pass', 'PlayStation Now', 'GeForce NOW', 'Stadia', 'Luna',
  'Roblox', 'Minecraft', 'Fortnite', 'Among Us', 'Fall Guys',
  'Valorant', 'Apex Legends', 'Overwatch', 'League of Legends',
  'Dota 2', 'Counter-Strike', 'PUBG', 'Warzone', 'Rainbow Six Siege',
  'World of Warcraft', 'Final Fantasy XIV', 'Elder Scrolls Online',
  'Destiny 2', 'Path of Exile', 'Diablo', 'Hearthstone', 'Magic Arena',
  'Clash of Clans', 'Clash Royale', 'Brawl Stars', 'Hay Day', 'Boom Beach',
  'Pokémon GO', 'Wizards Unite', 'Ingress', 'Pikmin Bloom',
  'Candy Crush', 'Coin Master', 'Gardenscapes', 'Homescapes', 'Royal Match',
  'Words With Friends', 'Scrabble GO', 'Wordle', 'Letterboxd',
  'Duolingo', 'Chess.com', 'Lichess', 'Backgammon', 'Solitaire',
  'Discord', 'TeamSpeak', 'Mumble', 'GameOn', 'Guilded',
  'Twitch', 'YouTube Gaming', 'Facebook Gaming', 'Kick', 'Trovo',
  'Overwolf', 'Medal.tv', 'Plays.tv', 'Outplayed', 'Nvidia Highlights',
  'Nintendo Switch Online', 'PlayStation App', 'Xbox App',
  'Riot Games', 'Battle.net', 'Origin', 'EA App', 'Uplay',

  // Education & Learning
  'Duolingo', 'Babbel', 'Rosetta Stone', 'Pimsleur', 'Busuu',
  'Memrise', 'Anki', 'Quizlet', 'Brainscape', 'Cram', 'StudyBlue',
  'Khan Academy', 'Coursera', 'Udemy', 'edX', 'Skillshare',
  'MasterClass', 'LinkedIn Learning', 'Pluralsight', 'Codecademy',
  'freeCodeCamp', 'The Odin Project', 'Treehouse', 'Frontend Mentor',
  'Scrimba', 'Mimo', 'Sololearn', 'Grasshopper', 'Enki', 'Brilliant',
  'Wolfram Alpha', 'Photomath', 'Mathway', 'Symbolab', 'Desmos',
  'Google Classroom', 'Canvas', 'Blackboard', 'Moodle', 'Schoology',
  'Remind', 'ClassDojo', 'Bloomz', 'SeeSaw', 'Edmodo', 'Nearpod',
  'Pear Deck', 'Kahoot', 'Quizizz', 'Gimkit', 'Blooket', 'Quizalize',
  'Turnitin', 'Grammarly', 'Chegg', 'Course Hero', 'Bartleby',
  'Audible', 'Blinkist', 'Headway', 'Shortform', 'ReadWise', 'Matter',
  'Pocket', 'Instapaper', 'Reeder', 'Feedly', 'Inoreader',

  // AI & Machine Learning Tools
  'ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity', 'You.com',
  'Poe', 'Character.ai', 'Replika', 'Pi', 'Inflection',
  'Midjourney', 'DALL-E', 'Stable Diffusion', 'Adobe Firefly',
  'Runway', 'Pika', 'Sora', 'Kling', 'HeyGen', 'D-ID', 'Synthesia',
  'ElevenLabs', 'Murf', 'Play.ht', 'Resemble AI', 'Descript',
  'Otter.ai', 'Fireflies', 'Grain', 'Fathom', 'Tactiq', 'Notion AI',
  'Jasper', 'Copy.ai', 'Writesonic', 'Rytr', 'Anyword', 'Peppertype',
  'Phrasee', 'MarketMuse', 'Clearscope', 'Surfer SEO', 'Frase',
  'GitHub Copilot', 'Tabnine', 'Codeium', 'Cursor', 'Aider',
  'Hugging Face', 'Weights & Biases', 'MLflow', 'DVC', 'Comet',
  'Roboflow', 'Scale AI', 'Labelbox', 'V7', 'CVAT',

  // Business & Marketing
  'Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Freshsales',
  'Monday Sales CRM', 'Close', 'Copper', 'Nimble', 'Insightly',
  'Mailchimp', 'Klaviyo', 'ActiveCampaign', 'ConvertKit', 'Drip',
  'Constant Contact', 'GetResponse', 'Campaign Monitor', 'Sendgrid',
  'Postmark', 'Mailgun', 'Brevo', 'Omnisend', 'Iterable', 'Braze',
  'Intercom', 'Zendesk', 'Freshdesk', 'Help Scout', 'Groove',
  'Gorgias', 'Tidio', 'Drift', 'Crisp', 'Olark', 'Tawk.to',
  'Hootsuite', 'Buffer', 'Sprout Social', 'Later', 'Planoly',
  'SocialBee', 'Publer', 'ContentStudio', 'Agorapulse', 'Sendible',
  'Google Analytics', 'Adobe Analytics', 'Matomo', 'Fathom Analytics',
  'Plausible', 'Pirsch', 'Umami', 'PostHog', 'Mixpanel', 'Amplitude',
  'Semrush', 'Ahrefs', 'Moz', 'Screaming Frog', 'Majestic',
  'BuzzSumo', 'SpyFu', 'iSpionage', 'SimilarWeb', 'Alexa',
  'Canva', 'Adobe Express', 'Crello', 'Snappa', 'Stencil', 'Desygner',
  'Lottiefiles', 'Undraw', 'Unsplash', 'Pexels', 'Pixabay', 'Shutterstock',
  'Getty Images', 'iStock', 'Adobe Stock', 'Depositphotos', 'Dreamstime',
  'Zoom', 'Webinar Jam', 'Demio', 'HeySummit', 'Hopin', 'Airmeet',
  'Eventbrite', 'Cvent', 'Splash', 'Bizzabo', 'Whova', 'Hubilo',
  'Typeform', 'SurveyMonkey', 'Google Forms', 'JotForm', 'Tally',
  'Paperform', 'Formstack', 'Cognito Forms', 'Arengu', '123FormBuilder',
  'DocuSign', 'HelloSign', 'PandaDoc', 'SignNow', 'Adobe Sign',
  'Proposify', 'Better Proposals', 'Qwilr', 'Loopio', 'RFPIO',
  'Calendly', 'Chili Piper', 'Acuity', 'SimplyBook', 'YouCanBook.me',
  'Drift', 'Qualified', 'Clearbit', 'ZoomInfo', 'Apollo.io',
  'Outreach', 'Salesloft', 'Reply.io', 'Lemlist', 'Woodpecker',
  'Hunter', 'Snov.io', 'Voila Norbert', 'FindThatLead',
  'Zapier', 'Make', 'n8n', 'Automate.io', 'Workato', 'Tray.io',
  'Pabbly', 'KonnectzIT', 'Integrately', 'Albato', 'SyncSpider',

  // News & Media
  'Google News', 'Apple News', 'Flipboard', 'Feedly', 'SmartNews',
  'News Republic', 'Ground News', 'AllSides', 'RealClearPolitics',
  'The New York Times', 'The Washington Post', 'The Guardian',
  'BBC News', 'Reuters', 'Associated Press', 'Bloomberg', 'Forbes',
  'TechCrunch', 'The Verge', 'Engadget', 'Wired', 'Ars Technica',
  'HackerNews', 'Product Hunt', 'Lobsters', 'Slashdot', 'Digg',
  'Medium', 'Substack', 'Ghost', 'WordPress', 'Wix', 'Squarespace',
  'Weebly', 'Webflow', 'Framer', 'Editor X', 'Strikingly',
  'Quora', 'Stack Overflow', 'Stack Exchange', 'Reddit', 'Discord',
  'Wikipedia', 'Wikia', 'Fandom', 'TV Tropes', 'Know Your Meme',

  // Dating & Social
  'Tinder', 'Bumble', 'Hinge', 'OKCupid', 'Match', 'eHarmony',
  'Coffee Meets Bagel', 'Plenty of Fish', 'Zoosk', 'MeetMe',
  'Badoo', 'Happn', 'Grindr', 'Scruff', 'HER', 'Feeld',
  'Raya', 'The League', 'Hily', 'Clover', 'Inner Circle',
  'Meetup', 'Couchsurfing', 'Internations', 'Tandem', 'HelloTalk',
  'Speaky', 'Amigos', 'Interpals', 'MyLanguageExchange',

  // Utilities & Tools
  '1Password', 'LastPass', 'Bitwarden', 'Dashlane', 'NordPass',
  'Keeper', 'RoboForm', 'Enpass', 'Strongbox', 'Buttercup',
  'NordVPN', 'ExpressVPN', 'Surfshark', 'ProtonVPN', 'Mullvad',
  'PIA', 'CyberGhost', 'IPVanish', 'TunnelBear', 'Windscribe',
  'Malwarebytes', 'Bitdefender', 'Norton', 'McAfee', 'Kaspersky',
  'Avast', 'AVG', 'ESET', 'Webroot', 'Sophos',
  'CCleaner', 'CleanMyMac', 'Disk Drill', 'DaisyDisk', 'OmniDiskSweeper',
  'f.lux', 'Lungo', 'Amphetamine', 'Mela', 'Hand Mirror',
  'Dropzone', 'PopClip', 'Paste', 'Snippets Lab', 'Dash',
  'BetterZip', 'The Unarchiver', 'Archiver', 'Keka', 'Bandizip',
  'PDF Expert', 'PDF Squeezer', 'Smallpdf', 'ilovepdf', 'Adobe Acrobat',
  'Permute', 'HandBrake', 'FFmpeg', 'VidConverter', 'Permute 3',
  'iStatMenus', 'Stats', 'Activity Monitor', 'App Tamer', 'Taskplane',
  'TextExpander', 'Keyboard Maestro', 'BetterTouchTool', 'Karabiner-Elements',
  'Rectangle', 'Magnet', 'Moom', 'Mosaic', 'Yabai',
  'Proxyman', 'Charles', 'mitmproxy', 'Fiddler', 'Wireshark',
  'TablePlus', 'DBngin', 'Sequel Pro', 'DataGrip', 'DBeaver',
  'Paw', 'RapidAPI', 'Kreya', 'gRPCox',
  'Transmit', 'Cyberduck', 'FileZilla', 'ForkLift', 'Mountain Duck',
  'Screens', 'AnyDesk', 'TeamViewer', 'Royal TSX', 'Jump Desktop',
  'CleanShot X', 'Skitch', 'Annotate', 'ScreenFloat', 'Screenium',
  'OBS Studio', 'Streamlabs', 'Ecamm Live', 'Restream', 'StreamYard',
  'Superwall', 'RevenueCat', 'Adapty', 'Purchasely', 'Qonversion',
  'Lottie', 'Principle', 'Flinto', 'Phase', 'Jitter',
  'Permute', 'IINA', 'Elmedia', 'Infuse', 'Movist', 'Mplayer',
  'Deliveries', 'Parcel', 'Arrive', 'Slice', '17TRACK',
  'QReate', 'QR Factory', 'QRCode Monkey', 'QR Tiger', 'Beaconstac',

  // HR & Ops
  'Workday', 'BambooHR', 'Gusto', 'Rippling', 'Deel', 'Remote',
  'Oyster', 'Papaya Global', 'Velocity Global', 'Globalization Partners',
  'Lattice', 'Culture Amp', 'Leapsome', 'Betterworks', '15Five',
  'Officevibe', 'Peakon', 'Glint', 'Qualtrics', 'SurveyMonkey Engage',
  'Greenhouse', 'Lever', 'Workable', 'JazzHR', 'Recruitee',
  'SmartRecruiters', 'iCIMS', 'Jobvite', 'Breezy HR', 'Pinpoint',
  'Linkedin Recruiter', 'Indeed', 'Glassdoor', 'ZipRecruiter', 'Monster',
  'CareerBuilder', 'Dice', 'AngelList', 'Wellfound', 'Contra', 'Toptal',
  'Upwork', 'Fiverr', 'Freelancer', 'PeoplePerHour', '99designs',
  'Loom', 'Guru', 'Tettra', 'Document360', 'Trainual', 'Lessonly',
  'Docebo', 'Absorb LMS', 'TalentLMS', 'Cornerstone', 'SAP SuccessFactors',
  'ServiceNow HR', 'Zenefits', 'ADP', 'Paychex', 'Paycom', 'Paylocity',
  'Kronos', 'UKG', 'Deputy', 'When I Work', 'Homebase', 'Sling',

  // Legal & Compliance
  'LegalZoom', 'Rocket Lawyer', 'Clerky', 'Stripe Atlas', 'Firstbase',
  'Ironclad', 'Contractbook', 'Juro', 'LinkSquares', 'Icertis',
  'DocuSign CLM', 'Clio', 'MyCase', 'Practice Panther', 'Smokeball',
  'Relativity', 'Logikcull', 'Everlaw', 'Disco', 'Exterro',
  'OneTrust', 'TrustArc', 'BigID', 'Securiti', 'WireWheel',
  'Vanta', 'Drata', 'Secureframe', 'Tugboat Logic', 'Laika',
  'HackerOne', 'Bugcrowd', 'Synack', 'Cobalt', 'Intigriti',

  // Real Estate
  'Zillow', 'Trulia', 'Realtor.com', 'Redfin', 'Compass',
  'LoopNet', 'CoStar', 'Crexi', 'Buildout', 'Reonomy',
  'AppFolio', 'Buildium', 'Yardi', 'RealPage', 'Entrata',
  'DoorLoop', 'Rentec Direct', 'TenantCloud', 'Cozy', 'Avail',
  'Opendoor', 'Offerpad', 'Knock', 'Orchard', 'Flyhomes',
  'Better.com', 'Rocket Mortgage', 'LoanDepot', 'UWM', 'Guaranteed Rate',

  // IoT & Smart Home
  'SmartThings', 'HomeKit', 'Google Home', 'Amazon Alexa', 'IFTTT',
  'Home Assistant', 'OpenHAB', 'Hubitat', 'Wink', 'Insteon',
  'Nest', 'Ecobee', 'Honeywell Home', 'Sensi', 'Emerson',
  'Philips Hue', 'LIFX', 'Govee', 'Nanoleaf', 'Yeelight',
  'Ring', 'Arlo', 'Wyze', 'Blink', 'SimpliSafe', 'ADT',
  'August', 'Schlage', 'Yale', 'Kwikset', 'Level Lock',
  'Canary', 'Abode', 'Vivint', 'Brinks', 'Frontpoint',

  // Automotive
  'Tesla', 'Waze', 'Gas Guru', 'GasBuddy', 'iExit',
  'Carfax', 'AutoCheck', 'CarGurus', 'Cars.com', 'TrueCar',
  'Vroom', 'Carvana', 'CarMax', 'Shift', 'Driveway',
  'Turo', 'Getaround', 'HyreCar', 'Zipcar', 'Enterprise CarShare',
  'AAA', 'Roadside America', 'SpeedFine', 'Parkopedia', 'SpotHero', 'ParkMobile',
  'OBD Fusion', 'Torque Pro', 'BlueDriver', 'DashCommand', 'Fuelly',

  // Miscellaneous Popular Apps
  'Shazam', 'SoundHound', 'ACRCloud', 'Musixmatch', 'AZLyrics',
  'Goodreads', 'LibraryThing', 'Storygraph', 'BookSloth', 'Readerly',
  'Letterboxd', 'JustWatch', 'Reelgood', 'TVTime', 'Trakt',
  'FlightAware', 'Flightradar24', 'FlightView', 'App in the Air', 'TravelAware',
  'PackPoint', 'TripIt', 'Wanderlog', 'Sygic Travel', 'Maps.me',
  'AllTrails', 'Komoot', 'Gaia GPS', 'CalTopo', 'OnX Maps',
  'iNaturalist', 'Merlin', 'BirdNET', 'Audubon', 'eBird',
  'Weather.com', 'AccuWeather', 'Weather Underground', 'Dark Sky', 'Tomorrow.io',
  'Windy', 'MyRadar', 'RadarScope', 'Weather Bug', 'Carrot Weather',
  'Astronomy', 'SkySafari', 'Star Walk', 'SkyView', 'Stellarium',
  'PictureThis', 'PlantNet', 'Seek', 'LeafSnap', 'PlantSnap',
  'Furbo', 'Petcube', 'Whistle', 'FitBark', 'PetDesk', 'Rover',
  'Wag', 'BarkYard', 'DogVacay', 'PawShake',
  'ClassDojo', 'Khan Academy Kids', 'Starfall', 'ABCmouse', 'Reading Eggs',
  'Epic!', 'Raz-Kids', 'MobyMax', 'IXL', 'Prodigy',
  'Toca Boca', 'Pango Storytime', 'Endless Alphabet', 'Sago Mini',
  'Homer', 'Kiddopia', 'Little Fox', 'Lingokids', 'Azoomee',
  'Photoroom', 'Remove.bg', 'Upscale.media', 'Cleanup.pictures',
  'Luminar', 'ON1 Photo RAW', 'Capture One', 'RawTherapee', 'darktable',
  'Lasso', 'Zotero', 'Mendeley', 'Papers', 'Paperpile', 'Endnote',
  'MindNode', 'XMind', 'MindMeister', 'Coggle', 'Miro', 'Ayoa',
  'OmniGraffle', 'Diagrams.net', 'Lucidchart', 'Gliffy', 'Creately',
  'Grammarly', 'Hemingway', 'ProWritingAid', 'AutoCrit', 'Fictionary',
  'iBooks', 'Kindle', 'Kobo', 'Nook', 'Google Play Books',
  'Comixology', 'Webtoon', 'Tapas', 'Mangaplus', 'Viz Media',
  'Wattpad', 'Royal Road', 'ScribbleHub', 'Archive of Our Own',
];

    // Filter out apps that already have themes
    const themedAppNames = existingThemes?.map(t => {
      // Clean name like "Netflix Theme" to just "Netflix"
      return t.name.replace(/\s+Theme$/i, '').trim().toLowerCase()
    }) || []

    const availableApps = POPULAR_APPS.filter(app => !themedAppNames.includes(app.toLowerCase()))

    // Pick a random app from the available ones if it's a random generation
    let TargetAppName = ''
    if (isRandom) {
      if (availableApps.length > 0) {
        TargetAppName = availableApps[Math.floor(Math.random() * availableApps.length)]
      } else {
        // Fallback if all popular apps are taken (unlikely but safe)
        TargetAppName = 'a unique futuristic'
      }
    }
    const systemPrompt = isRandom
      ? `You are an expert design agent. Output ONLY valid JSON for the app: ${TargetAppName}.

JSON STRUCTURE:
{
"name": "${TargetAppName} Theme",
"slug": "${TargetAppName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-theme",
"category": "company",
"icon_url": "https://api.companyenrich.com/logo/DOMAIN",
"code": ":root{--background:0 0% 100%;--foreground:240 10% 3.9%;--primary:BRAND_HSL;--primary-foreground:0 0% 98%;...}.dark{--primary:BRAND_HSL;...}"
}

STRICT RULES:
1. "icon_url": Guess the official domain and use https://api.companyenrich.com/logo/domain.com
2. "code": MUST be valid CSS using shadcn variables.
3. CSS MUST BE MINIFIED. Absolutely NO newlines or comments in the "code" string.
4. Colors MUST match ${TargetAppName} exactly.
5. Support :root (light) and .dark (dark).

DO NOT include markdown code blocks. DO NOT include explanation. DO NOT include any text before or after the JSON.`
      : `You are an expert design agent. Output ONLY valid JSON for the brand described.

JSON STRUCTURE:
{
"name": "Brand Theme",
"slug": "brand-theme",
"category": "company",
"code": "FULL CSS HERE"
}

CSS Structure - use these variables:

Required CSS Structure:
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --font-sans: "Inter", sans-serif;
  --background: hsl(0 0% 100%);
  --foreground: hsl(240 10% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(240 10% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(240 10% 3.9%);
  --primary: hsl(240 5.9% 10%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(240 4.8% 95.9%);
  --secondary-foreground: hsl(240 5.9% 10%);
  --muted: hsl(240 4.8% 95.9%);
  --muted-foreground: hsl(240 3.8% 46.1%);
  --accent: hsl(240 4.8% 95.9%);
  --accent-foreground: hsl(240 5.9% 10%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 5.9% 90%);
  --input: hsl(240 5.9% 90%);
  --ring: hsl(240 10% 3.9%);
  --radius: 0.5rem;
  --chart-1: hsl(12 76% 61%);
  --chart-2: hsl(173 58% 39%);
  --chart-3: hsl(197 37% 24%);
  --chart-4: hsl(43 74% 66%);
  --chart-5: hsl(27 87% 67%);
  --sidebar-background: hsl(0 0% 100%);
  --sidebar-foreground: hsl(240 5.3% 26.1%);
  --sidebar-primary: hsl(240 5.9% 10%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(240 4.8% 95.9%);
  --sidebar-accent-foreground: hsl(240 5.9% 10%);
  --sidebar-border: hsl(240 5.9% 90%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

.dark {
  --background: hsl(240 10% 3.9%);
  --foreground: hsl(0 0% 98%);
  --card: hsl(240 10% 3.9%);
  --card-foreground: hsl(0 0% 98%);
  --popover: hsl(240 10% 3.9%);
  --popover-foreground: hsl(0 0% 98%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(240 5.9% 10%);
  --secondary: hsl(240 3.7% 15.9%);
  --secondary-foreground: hsl(0 0% 98%);
  --muted: hsl(240 3.7% 15.9%);
  --muted-foreground: hsl(240 5% 64.9%);
  --accent: hsl(240 3.7% 15.9%);
  --accent-foreground: hsl(0 0% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 3.7% 15.9%);
  --input: hsl(240 3.7% 15.9%);
  --ring: hsl(240 4.9% 83.9%);
  --chart-1: hsl(220 70% 50%);
  --chart-2: hsl(160 60% 45%);
  --chart-3: hsl(30 80% 55%);
  --chart-4: hsl(280 65% 60%);
  --chart-5: hsl(340 75% 55%);
  --sidebar-background: hsl(240 5.9% 10%);
  --sidebar-foreground: hsl(240 4.8% 95.9%);
  --sidebar-primary: hsl(224.3 76.3% 48%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(240 3.7% 15.9%);
  --sidebar-accent-foreground: hsl(240 4.8% 95.9%);
  --sidebar-border: hsl(240 3.7% 15.9%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

@theme inline {
  --font-sans: var(--font-sans);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

body {
  font-family: var(--font-sans);
}

Choose colors that match the app description and create a cohesive, beautiful theme. Return ONLY valid JSON.`

    const userPrompt = isRandom
      ? `Generate a beautiful, unique theme for ${TargetAppName}. Be creative with the colors to match their brand!`
      : `App: ${appDescription}\n\nCreate the perfect theme.`

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.1, // Lower temperature for more consistent JSON
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API Error:', errorText)
      throw new Error('Failed to generate theme with AI')
    }

    const data = await response.json()

    if (data.error) {
      console.error('Gemini Error:', data.error)
      throw new Error(data.error.message || 'AI error')
    }

    let generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!generatedContent) {
      console.error('No content in response:', data)
      throw new Error('No content generated')
    }

    // LOG FULL RESPONSE FOR DEBUGGING
    console.log('--- RAW AI RESPONSE START ---')
    console.log(generatedContent)
    console.log('--- RAW AI RESPONSE END ---')

    // Helper to repair truncated JSON
    const repairJson = (str) => {
      let repaired = str.trim()

      // Remove markdown and everything before/after the first/last braces
      const firstBrace = repaired.indexOf('{')
      const lastBrace = repaired.lastIndexOf('}')
      if (firstBrace !== -1) {
        repaired = repaired.substring(firstBrace)
      }

      // If truncated, let's fix it
      // 1. Close open quotes if needed (odd number of quotes)
      const quoteCount = (repaired.match(/"/g) || []).length
      if (quoteCount % 2 !== 0) {
        repaired += '"'
      }

      // 2. Remove trailing command if present before fixing braces
      repaired = repaired.replace(/,\s*$/, '')

      // 3. Balance braces
      let openBraces = (repaired.match(/\{/g) || []).length
      let closeBraces = (repaired.match(/\}/g) || []).length
      while (openBraces > closeBraces) {
        repaired += '}'
        closeBraces++
      }

      return repaired
    }

    let cleanedText = repairJson(generatedContent)
    let themeData = null

    try {
      themeData = JSON.parse(cleanedText)
    } catch (e) {
      console.warn('JSON.parse failed on cleaned text, trying manual extraction...')
      // Fallback: try to extract fields manually if parse fails even after repair
      try {
        const nameMatch = cleanedText.match(/"name"\s*:\s*"([^"]*)"/)
        const slugMatch = cleanedText.match(/"slug"\s*:\s*"([^"]*)"/)
        const codeMatch = cleanedText.match(/"code"\s*:\s*"([^"]*)"/)
        const iconMatch = cleanedText.match(/"icon_url"\s*:\s*"([^"]*)"/)

        if (nameMatch && codeMatch) {
          themeData = {
            name: nameMatch[1],
            slug: slugMatch ? slugMatch[1] : 'brand-theme',
            category: 'company',
            icon_url: iconMatch ? iconMatch[1] : '',
            code: codeMatch[1]
          }
        }
      } catch (e2) {
        console.error('Manual extraction failed')
      }
    }

    if (!themeData || !themeData.name || !themeData.code) {
      console.error('Final parsed theme data invalid:', themeData)
      throw new Error('AI response was invalid or incomplete')
    }

    // AUTO-SAVE: Insert the theme into Supabase using admin client to bypass RLS
    const adminSupabase = getSupabaseAdminClient()
    const { data: savedTheme, error: saveError } = await adminSupabase
      .from('themes')
      .insert([
        {
          name: themeData.name,
          slug: themeData.slug,
          category: themeData.category || 'company',
          icon_url: themeData.icon_url,
          code: themeData.code,
        },
      ])
      .select()
      .single()

    if (saveError) {
      console.error('Supabase auto-save error:', saveError)
      // We still return the theme data even if save fails, but maybe add a warning?
      // Or throw error if you want strict auto-save
      throw new Error(`Failed to auto-save theme: ${saveError.message}`)
    }

    return NextResponse.json(savedTheme || themeData)
  } catch (error) {
    console.error('AI Theme Generation Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate theme' },
      { status: 500 }
    )
  }
}
