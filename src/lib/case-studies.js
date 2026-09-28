import { UIUX } from './uiux-media.js'

/**
 * UI/UX CASE STUDIES
 * ----------------------------------------------------------------
 * One entry per page of the Figma file "Vyom Shah" (12 pages). Each is a
 * normal project (bucket `uiux`) plus a `caseStudy` block that the
 * project panel renders as a long-form page instead of the one-piece
 * stage used for videos and graphics.
 *
 * Every sentence describes what is visible in the designs themselves —
 * screen names, fields, flows, notes left on the canvas. No metrics,
 * dates or outcomes are claimed; add them only when the owner supplies
 * them. Client names are given only where the brand is on the screens.
 *
 * Image shape: { ...UIUX[slug][key], caption, scroll? } — `scroll` shows a
 * long web page inside a fixed-height window you scroll through.
 */

export const UIUX_CREDIT = 'UI/UX DESIGN: VYOM SHAH'

const shot = (slug, key, caption, extra = {}) => ({ ...UIUX[slug][key], caption, ...extra })

export const CASE_STUDIES = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'invest-app',
    title: 'INVEST — MUTUAL FUND & SIP APP',
    client: 'UNDISCLOSED CLIENT',
    role: 'Wireframes, hi-fi screens and a component library for a retail investing app.',
    summary:
      'A mobile app that lets a first-time investor see their whole portfolio, read a fund at a glance and start a SIP in a few taps.',
    caseStudy: {
      platform: 'IOS & ANDROID APP',
      scope: ['WIREFRAMES', 'HI-FI UI', 'DESIGN SYSTEM'],
      brief:
        'Investing apps tend to bury the basics under jargon. The brief here was the opposite: one home for every product, a fund page anyone can read, and a checkout as familiar as online shopping.',
      sections: [
        {
          kicker: 'DISCOVER',
          title: 'One home for every product',
          body: 'The dashboard leads with total assets and one insight card, then puts every product — SIP, lump sum, tax-saving funds, equity, gold, debentures, fixed deposits — in a single icon grid, with insurance and special offers a tab away. Search shows the most-viewed categories before you type anything.',
          images: [shot('invest-app', 'discover', 'Dashboard, search, SIP picks and my assets')],
        },
        {
          kicker: 'DECIDE & BUY',
          title: 'Read a fund, then start a SIP',
          body: 'A fund page opens on its NAV trend with a month scrubber, then current NAV and CAGR side by side, then its holdings. The same chart pattern is reused for “my assets”, so tracking money feels like researching it. Starting a SIP is one form — mandate, amount, frequency — and payment keeps the bank account and UPI or net-banking choice on a single screen, ending on a clear receipt with a transaction ID.',
          images: [shot('invest-app', 'sip-flow', 'Fund detail → start SIP → pay → success')],
        },
        {
          kicker: 'CART',
          title: 'Queue several funds, pay once',
          body: 'Funds can be added to a cart, so an investor can line up more than one SIP and complete a single payment. Help is always one tap away: support opens straight into a WhatsApp chat.',
          images: [shot('invest-app', 'cart', 'Add to cart, your cart, WhatsApp support')],
        },
        {
          kicker: 'SYSTEM',
          title: 'Built from one component library',
          body: 'Colour ramps (teal primary, magenta accent, neutrals and navy), icons, inputs, buttons, tabs and list rows were set up as components first, so every screen in the flow is assembled from the same parts.',
          images: [shot('invest-app', 'design-system', 'Colour ramps, icons and components')],
        },
      ],
      deliverables: ['12 HI-FI SCREENS', 'WIREFRAMES', 'COMPONENT LIBRARY'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'loan-app',
    title: 'BUSINESS LOAN — APPLY IN MINUTES',
    client: 'MSWIPE',
    role: 'End-to-end loan journey for small merchants: apply, KYC, sanction and repayment.',
    summary:
      'A mobile flow that takes a shop owner from “how much can I borrow?” to a sanctioned loan, with KYC split into three short steps and repayment tied to their payment device.',
    caseStudy: {
      platform: 'ANDROID APP',
      scope: ['USER FLOW', 'HI-FI UI', 'KYC FORMS', 'PROTOTYPE'],
      brief:
        'Loan forms lose people halfway. The design had to explain the whole journey before asking for anything, keep every step short, and show the applicant exactly where they are at all times.',
      sections: [
        {
          kicker: 'START',
          title: 'Explain the journey before the first field',
          body: 'The first screen maps the three stages — personal details, business details, bank details — to “loan applied”. Sign-in, OTP and a three-field quick application follow, so the applicant sees an offer before any paperwork.',
          images: [shot('loan-app', 'apply', 'Journey map, sign in, OTP and quick application')],
        },
        {
          kicker: 'OFFER',
          title: 'Show the offer, let them shape it',
          body: '“Avail loan” leads with the pre-approved amount, the three steps it takes and the documents to keep handy, with features and FAQs below. The amount is set on a dial, tenure on a slider, and the daily instalment updates as they move.',
          images: [shot('loan-app', 'offer', 'Pre-approved offer and choose your amount')],
        },
        {
          kicker: 'KYC',
          title: 'Three steps, one progress bar',
          body: 'A stepper at the top tracks personal (PAN, address proof, selfie), business (GST, shop photos, type of property and business) and bank details (account, IFSC, six-month statement). An overview screen lets the applicant review every section before submitting.',
          images: [shot('loan-app', 'kyc', 'Personal, business and bank details, overview, submitted')],
        },
        {
          kicker: 'AFTER APPROVAL',
          title: 'Sanction, insurance and repayment',
          body: 'A dashboard with a progress ring carries the loan forward: sanction details, a group insurance policy, and a choice of payment device to repay from. Mandate registration — agreement, e-NACH, Aadhaar — is broken into its own checklist.',
          images: [
            shot('loan-app', 'post-approval', 'Dashboard, sanction, insurance and repayment device'),
            shot('loan-app', 'repayment', 'Mandate registration steps and bank details'),
          ],
        },
      ],
      deliverables: ['27 SCREENS', 'KYC FLOW', 'REPAYMENT FLOW', 'CLICKABLE PROTOTYPE'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'merchant-onboarding',
    title: 'MERCHANT ONBOARDING — GET A POS DEVICE',
    client: 'MSWIPE',
    role: 'Self-serve onboarding: pick a payment device, complete KYC, check out.',
    summary:
      'A journey where a merchant signs up, compares payment devices, chooses full or minimum KYC and pays for the device — without waiting for a sales visit.',
    caseStudy: {
      platform: 'ANDROID APP',
      scope: ['USER FLOW', 'HI-FI UI', 'KYC FORMS', 'CHECKOUT'],
      brief:
        'Getting a card machine usually starts with a salesperson. This flow lets the merchant do it alone: understand the devices, pick one, prove who they are and pay.',
      sections: [
        {
          kicker: 'SIGN IN',
          title: 'Mobile number first',
          body: 'Sign-up asks only for a mobile number, email and PAN, confirmed by OTP. A partner-code screen lets merchants who came through a partner say so up front.',
          images: [shot('merchant-onboarding', 'signin', 'Get your device, OTP, details and partner code')],
        },
        {
          kicker: 'CHOOSE',
          title: 'Compare devices like products',
          body: 'Devices sit in category tabs with price, a short spec and a buy button. Each has a “why this device” page — the Boombox sound box, the Wisepad card reader — before the merchant commits.',
          images: [shot('merchant-onboarding', 'device', 'Avail POS, device catalogue and device detail')],
        },
        {
          kicker: 'KYC',
          title: 'Full or minimum KYC — the merchant decides',
          body: 'Two illustrated cards explain the difference between full and minimum KYC. The forms then follow a three-step stepper: personal details, business details with type-of-business icons, and bank details with cheque upload.',
          images: [shot('merchant-onboarding', 'kyc', 'KYC choice, personal and business details')],
        },
        {
          kicker: 'CHECKOUT',
          title: 'Pay for the device and go',
          body: 'A payment summary and checkout close the flow, with the device, fees and payment options on one screen.',
          images: [shot('merchant-onboarding', 'checkout', 'Pay-up summary and checkout')],
        },
      ],
      deliverables: ['18 SCREENS', 'DEVICE CATALOGUE', 'KYC FLOW', 'CHECKOUT'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'pos-merchant-app',
    title: 'MERCHANT APP — ON THE POS DEVICE',
    client: 'MSWIPE',
    role: 'Home, reports, support and profile for merchants running a POS terminal.',
    summary:
      'The everyday app on the terminal: today’s takings, every way to take a payment, loans, rewards and support — laid out so the counter never waits.',
    caseStudy: {
      platform: 'ANDROID POS TERMINAL',
      scope: ['INFORMATION ARCHITECTURE', 'HI-FI UI', 'DATA VIZ'],
      brief:
        'A POS home screen has to do two jobs: take a payment in one tap, and give the owner a quick read on the day. Everything else — loans, rewards, insurance, support — has to be findable without getting in the way.',
      sections: [
        {
          kicker: 'HOME',
          title: 'Today at the top, payments one tap below',
          body: 'The header compares today’s total with yesterday’s and lists recent transactions. Below it, a grid covers every payment type — card, QR, bank EMI, brand EMI, void, cash, pre-auth — followed by loans and credit, rewards and cashback, the MoneyBack card, business tools and insurance. Two expanded states add an activity chart (1 day to 3 years) and a breakdown by payment mode.',
          images: [shot('pos-merchant-app', 'home', 'Home, activity chart and payment-mode breakdown')],
        },
        {
          kicker: 'REPORTS · SUPPORT · PROFILE',
          title: 'The rest of the app, one tab each',
          body: 'Reports filter by sale type and link to history, statements, invoices and summaries. Support shows on-hold transactions and offers call, WhatsApp or email. Profile keeps print and quick-sale switches, KYC, business info and account actions in labelled groups.',
          images: [shot('pos-merchant-app', 'reports', 'Reports, support and profile')],
        },
      ],
      deliverables: ['6 SCREENS', 'HOME STATES', 'REPORTS', 'SETTINGS'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'merchant-rewards',
    title: 'MERCHANT REWARDS — SCRATCH CARDS',
    client: 'MSWIPE',
    role: 'User flow and app journey for a scratch-card rewards programme.',
    summary:
      'A rewards layer for the merchant app: transactions earn scratch cards, cards reveal coins, and coins are redeemed for brand offers.',
    caseStudy: {
      platform: 'ANDROID POS TERMINAL',
      scope: ['USER FLOW', 'INTERACTION DESIGN', 'HI-FI UI'],
      brief:
        'Rewards only work if merchants notice them and trust them. The flow had to define exactly when a card is generated, then make scratching and redeeming feel instant.',
      sections: [
        {
          kicker: 'USER FLOW',
          title: 'Where scratch cards come from',
          body: 'Before any screen, a flow chart mapped the scratch-card touch-points: which events generate a card, the decision points along the way, and how each path ends.',
          images: [shot('merchant-rewards', 'user-flow', 'Scratch-card generation touch-points')],
        },
        {
          kicker: 'APP JOURNEY',
          title: 'Scratch, reveal, redeem',
          body: 'A banner on the home screen leads to the rewards page: coins available and redeemed at the top, “my scratch cards” and “my rewards” as tabs. Scratching reveals the reward in place; redeemed offers grey out and show their expiry.',
          images: [shot('merchant-rewards', 'journey', 'Home entry, card grid, scratch, rewards, redeemed')],
        },
      ],
      deliverables: ['USER FLOW', '6 SCREENS', 'SCRATCH INTERACTION'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'vendor-portal',
    title: 'VENDOR PAYMENTS PORTAL',
    client: 'V2P',
    role: 'Vendor registration, landing page, dashboard and invoicing for a B2B payments portal.',
    summary:
      'A web portal where vendors register step by step, then raise invoices, approve payments and see their pre-approved credit from one dashboard.',
    caseStudy: {
      platform: 'WEB · DESKTOP',
      scope: ['REGISTRATION FLOW', 'LANDING PAGE', 'DASHBOARD', 'RISK STATES'],
      brief:
        'Vendors had to be registered before they could be paid. The portal needed a registration that doesn’t feel like paperwork, and a dashboard that answers “when do I get paid?” first.',
      sections: [
        {
          kicker: 'REGISTRATION',
          title: 'One question per screen, with a picture',
          body: 'Registration is split into short steps. Every screen pairs an illustration on the left with a small form on the right, so progress feels quick and the vendor always knows what the step is about.',
          images: [
            shot('vendor-portal', 'onboarding-1', 'Registration — step 1'),
            shot('vendor-portal', 'onboarding-2', 'Registration — step 2'),
            shot('vendor-portal', 'onboarding-4', 'Registration — step 4'),
            shot('vendor-portal', 'onboarding-6', 'Registration complete'),
          ],
        },
        {
          kicker: 'LANDING',
          title: 'Why register, in one scroll',
          body: 'The landing page sells the portal with headline numbers, the products on offer, a partner strip and FAQs.',
          images: [shot('vendor-portal', 'landing', 'Landing page', { scroll: true })],
        },
        {
          kicker: 'DASHBOARD & INVOICES',
          title: 'Payments first',
          body: 'The dashboard opens on quick links for vendor payments, upcoming payments with their actions, and the vendor’s pre-approved credit. Invoice approval, invoice creation and bulk invoice upload share the same left navigation, filters and table patterns.',
          images: [
            shot('vendor-portal', 'dashboard-1', 'Dashboard'),
            shot('vendor-portal', 'dashboard-2', 'Invoice approval'),
            shot('vendor-portal', 'dashboard-3', 'Create invoice'),
            shot('vendor-portal', 'dashboard-7', 'Upload invoices'),
          ],
        },
        {
          kicker: 'RISK CHECKS',
          title: 'Colour-coded vendor risk',
          body: 'When invoices are uploaded, each vendor is checked and the whole screen takes on the result’s colour: green for information (“always pays GST on time”), amber for a risk profile, and red for action required — where the user must reject or proceed anyway.',
          images: [
            shot('vendor-portal', 'dashboard-4', 'Information — green'),
            shot('vendor-portal', 'dashboard-5', 'Risk profile — amber'),
            shot('vendor-portal', 'dashboard-6', 'Action required — red'),
          ],
        },
      ],
      deliverables: ['14 DESKTOP SCREENS', 'LANDING PAGE', 'RISK STATES'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'connectify',
    title: 'CONNECTIFY — WHATSAPP COMMERCE',
    client: 'CONNECTIFY',
    role: 'Web console, mobile app and marketing website for a WhatsApp business-messaging product.',
    summary:
      'Connectify lets a business chat with customers, run bulk WhatsApp campaigns and manage contacts and catalogues — designed across a web console, a mobile app and the product website.',
    caseStudy: {
      platform: 'WEB · ANDROID · WEBSITE',
      scope: ['PRODUCT DESIGN', 'WEB APP', 'MOBILE APP', 'MARKETING SITE'],
      brief:
        'Businesses already talk to customers on WhatsApp, one chat at a time. Connectify turns that into a shared inbox, campaigns and a customer directory — and every one of those needed to feel as simple as WhatsApp itself.',
      sections: [
        {
          kicker: 'INBOX',
          title: 'A shared inbox that still feels like WhatsApp',
          body: 'Chats on the left, the conversation in the middle, and the customer on the right — labels, catalogue products and custom fields — so an agent never leaves the chat to look someone up.',
          images: [
            shot('connectify', 'web-1', 'Chats'),
            shot('connectify', 'web-2', 'Conversation with customer details'),
          ],
        },
        {
          kicker: 'CAMPAIGNS',
          title: 'Bulk messages in three steps',
          body: 'A campaign is built in a vertical stepper — channel, message template, contacts — with contacts imported from a file and a final review before launch.',
          images: [
            shot('connectify', 'web-3', 'Step 1 — channel'),
            shot('connectify', 'web-4', 'Step 2 — message template'),
            shot('connectify', 'web-5', 'Step 3 — filter contacts'),
            shot('connectify', 'web-6', 'Step 3 — import contacts from CSV'),
            shot('connectify', 'web-7', 'Review and launch'),
          ],
        },
        {
          kicker: 'SETTINGS',
          title: 'Everything else, in consistent tables',
          body: 'Business profile, channels, contacts, labels, custom fields, quick replies, templates and media share one table pattern, so learning one screen teaches them all.',
          images: [
            shot('connectify', 'web-8', 'Business profile'),
            shot('connectify', 'web-9', 'Channels'),
            shot('connectify', 'web-11', 'Templates'),
          ],
        },
        {
          kicker: 'MOBILE',
          title: 'The same inbox in your pocket',
          body: 'The app mirrors the console: register, log in, then chats, campaigns and contacts as three tabs.',
          images: [shot('connectify', 'mobile', 'Register, login, chats, conversation, campaign, contacts')],
        },
        {
          kicker: 'WEBSITE',
          title: 'Selling the product',
          body: 'The marketing site walks through each feature — customer directory, product catalogue, support, rewards, insights and chatbots — then the businesses it suits and pricing.',
          images: [shot('connectify', 'website', 'Product website', { scroll: true })],
        },
      ],
      deliverables: ['21 WEB SCREENS', '10 APP SCREENS', 'MARKETING WEBSITE'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'fuel-card-app',
    title: 'FIELD APP — FUEL CARDS & COLLECTIONS',
    client: 'UNDISCLOSED CLIENT',
    role: 'Mobile app for field agents managing fuel cards, client follow-ups and collections.',
    summary:
      'An app for agents to issue and manage fuel cards — limits, top-ups, pumps and vehicles — while tracking their clients, collections and incentives.',
    caseStudy: {
      platform: 'ANDROID APP',
      scope: ['INFORMATION ARCHITECTURE', 'HI-FI UI', 'DASHBOARDS'],
      brief:
        'Fuel spending for employees had to be tallied without paper bills. Agents on the move needed card controls, client follow-ups and their own targets in one app.',
      sections: [
        {
          kicker: 'CARDS',
          title: 'The card and its limits, front and centre',
          body: 'The card screen shows fuel and spend limits against what has been consumed, with check limit, top-up and lost card as the three actions. Pumps are found on a map, and vehicles are registered by number, chassis and licence.',
          images: [shot('fuel-card-app', 'card', 'Card, locate pump, register vehicle')],
        },
        {
          kicker: 'CLIENTS',
          title: 'Follow-ups that don’t slip',
          body: 'Search returns clients with their payment status and a “send reminder” button. Tabs for my clients, reminders, goals and transactions keep the day organised, with last interaction and next call on every card.',
          images: [shot('fuel-card-app', 'clients', 'Search, reminders, goals and clients')],
        },
        {
          kicker: 'COLLECTIONS',
          title: 'Targets and collections',
          body: 'An incentives gauge shows the amount left to the next slab and what has been earned so far. Premium collection lists customers with call, payment-link, cheque and WhatsApp actions, and ends on a clear receipt.',
          images: [shot('fuel-card-app', 'collections', 'Incentives, collection, receipt, new application')],
        },
      ],
      deliverables: ['20 SCREENS', 'CARD CONTROLS', 'AGENT DASHBOARD'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'mswipe-website',
    title: 'MSWIPE — WEBSITE FOR INDIA & UAE',
    client: 'MSWIPE TECHNOLOGIES',
    role: 'Marketing website for India, Singapore and the UAE, including the UTap partner pages.',
    summary:
      'Country websites for a payments company, built on one shared layout so each market swaps its content, not its structure.',
    caseStudy: {
      platform: 'WEBSITE · DESKTOP',
      scope: ['WEB DESIGN', 'PAGE TEMPLATES', 'LEAD CAPTURE'],
      brief:
        'Three markets, three product line-ups, one brand. The site needed a long-scroll template that could carry each country’s devices and offers without redesigning it every time.',
      sections: [
        {
          kicker: 'INDIA',
          title: 'One long scroll, one call to action',
          body: 'The home page moves from a clear promise, through solutions, devices and testimonials, to support and a partner sign-up — with “become a merchant” repeated at every natural stop.',
          images: [shot('mswipe-website', 'india-home', 'India home page', { scroll: true })],
        },
        {
          kicker: 'UAE',
          title: 'The same template, a new market',
          body: 'For the UAE, the template carries the UTap partnership: offerings, a device page with features and benefits, pay by link, the merchant app and merchant login.',
          images: [
            shot('mswipe-website', 'utap-home', 'UTap home', { scroll: true }),
            shot('mswipe-website', 'utap-device', 'UTap device page', { scroll: true }),
          ],
        },
        {
          kicker: 'LEAD CAPTURE',
          title: 'Request a callback without leaving the page',
          body: 'A two-field callback form opens over the page, so a visitor can ask for a call from anywhere in the scroll.',
          images: [shot('mswipe-website', 'utap-callback', 'Request a callback')],
        },
      ],
      deliverables: ['COUNTRY TEMPLATES', 'DEVICE PAGES', 'CALLBACK FLOW'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'utap-portal',
    title: 'UTAP — MERCHANT PORTAL & TERMINAL APP',
    client: 'ETISALAT UTAP × MSWIPE',
    role: 'Merchant web portal and payment app for the UAE launch.',
    summary:
      'A merchant portal for transaction history, pay-by-link and statements, and the payment app that runs on the terminal.',
    caseStudy: {
      platform: 'WEB · ANDROID TERMINAL',
      scope: ['WEB APP', 'TERMINAL UI', 'PAYMENT FLOWS'],
      brief:
        'Merchants in the UAE needed to see and reconcile what their terminals take, and to collect payments remotely. The portal and the terminal app had to speak the same visual language.',
      sections: [
        {
          kicker: 'PORTAL',
          title: 'Log in, filter, drill down',
          body: 'After a merchant login, transaction history filters by date range and sale type. Each day expands into its individual transactions with a clear success or failure mark.',
          images: [
            shot('utap-portal', 'portal-1', 'Merchant login'),
            shot('utap-portal', 'portal-4', 'Transaction history with date picker'),
            shot('utap-portal', 'portal-6', 'Transactions for one day'),
          ],
        },
        {
          kicker: 'PAY BY LINK',
          title: 'Get paid without the card present',
          body: 'Pay by link creates a single payment link — amount, purpose, invoice, SMS or email — or uploads a batch file for many at once. Statements are generated by date type and month and saved as a spreadsheet.',
          images: [
            shot('utap-portal', 'portal-8', 'Create a payment link'),
            shot('utap-portal', 'portal-10', 'Bulk upload'),
            shot('utap-portal', 'portal-11', 'Statements'),
          ],
        },
        {
          kicker: 'TERMINAL APP',
          title: 'Taking the payment',
          body: 'On the terminal, card details, approval or decline, and the receipt each get a full screen. EMI is offered by bank and tenure, and home shows the day’s totals with the features the merchant has turned on.',
          images: [
            shot('utap-portal', 'app-pay', 'Card payment, receipt, declined, approved'),
            shot('utap-portal', 'app-emi', 'EMI — bank and tenure'),
            shot('utap-portal', 'app-home', 'Home and feature tiles'),
          ],
        },
      ],
      deliverables: ['12 PORTAL SCREENS', '16 TERMINAL SCREENS', 'PAYMENT FLOWS'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ott-app',
    title: 'OTT — MOVIE & SERIES STREAMING APP',
    client: 'CONCEPT WORK',
    role: 'Research, colour exploration and UI for a streaming app.',
    summary:
      'A streaming app designed from a research board: a teardown of Hotstar, Netflix and Prime, hand sketches, three colour directions and the final dark interface.',
    caseStudy: {
      platform: 'IOS & ANDROID APP',
      scope: ['COMPETITOR RESEARCH', 'SKETCHING', 'COLOUR EXPLORATION', 'HI-FI UI'],
      brief:
        'A streaming app lives or dies on its home screen. Before designing it, the category was studied: how the leading apps structure browsing, and which colours suit how people actually watch.',
      sections: [
        {
          kicker: 'RESEARCH',
          title: 'Why the interface is dark',
          body: 'The research board notes that apps in this segment mostly use dark grey or black — to reduce eye strain, because most people watch at night. Hotstar, Netflix and Prime were broken down screen by screen, the layout was sketched by hand, and three accent directions — yellow, blue and orange — were tried on the same home screen.',
          images: [shot('ott-app', 'research', 'Research board: annotations, competitors, sketches, colour')],
        },
        {
          kicker: 'ONBOARDING',
          title: 'Phone number and one OTP',
          body: 'Sign-in, verification and first-time registration stay on the same dark canvas as the app, with one field and one button per screen.',
          images: [shot('ott-app', 'onboarding', 'Log in, verify, first-time user')],
        },
        {
          kicker: 'BROWSE',
          title: 'A hero, then rows',
          body: 'Home opens on a full-bleed title with play and my list, then continue watching, trending now and TV shows as scrolling rows. Movies and series have their own tabs, and a side menu holds everything else.',
          images: [shot('ott-app', 'browse', 'Home, movies, menu')],
        },
      ],
      deliverables: ['RESEARCH BOARD', '13 SCREENS', 'COLOUR STUDY'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'emailers',
    title: 'MSWIPE — PRODUCT EMAILERS',
    client: 'MSWIPE',
    role: 'Email campaigns for merchant onboarding and product launches.',
    summary:
      'Emailers for a merchant audience — a welcome mail, the Boombox launch, POS delivery over WhatsApp and ATM Express — each a single scannable column with one call to action.',
    caseStudy: {
      platform: 'EMAIL · DESKTOP & MOBILE',
      scope: ['EMAIL DESIGN', 'ILLUSTRATION LAYOUT', 'RESPONSIVE'],
      brief:
        'Merchants read email on their phones, between customers. Each mailer had to make one point, show the product, and give one button to act on.',
      sections: [
        {
          kicker: 'CAMPAIGNS',
          title: 'Four mailers, one system',
          body: 'All four share a header, a hero line, an illustrated middle and a support footer, so the brand is recognisable before the mail is read. The welcome mailer was designed in both mobile and desktop widths.',
          images: [
            shot('emailers', 'emailer-1', 'Welcome on board — mobile and desktop'),
            shot('emailers', 'emailer-2', 'Boombox launch'),
            shot('emailers', 'emailer-3', 'POS delivery via WhatsApp'),
            shot('emailers', 'emailer-4', 'ATM Express'),
          ],
        },
      ],
      deliverables: ['4 EMAILERS', 'MOBILE + DESKTOP'],
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'v2p-platform',
    title: 'V2P 2.0 — ONBOARDING, INVOICES & PAYMENTS',
    client: 'V2P',
    role: 'Second version of the V2P portal: a new login and onboarding, invoice approval, payments and GST.',
    summary:
      'The next version of the V2P B2B payments portal — a redesigned sign-in and company onboarding, then the full invoice-to-payment loop with credit, card payments and GST challans.',
    caseStudy: {
      platform: 'WEB · DESKTOP',
      scope: ['ONBOARDING FLOW', 'PAYMENT FLOWS', 'MODALS & STATES', 'HI-FI UI'],
      brief:
        'Version one proved the idea. Version two had to onboard whole companies — GSTIN, partners, CIN, users — and take an invoice all the way to a paid receipt without leaving the portal.',
      sections: [
        {
          kicker: 'SIGN IN',
          title: 'Email or mobile, then one OTP',
          body: 'A split screen keeps a rotating brand message and illustration on the left — “last mile in B2B payments”, “bringing all the processes on a single platform” — and a single short form on the right: email and password, or mobile number, then a six-digit verification.',
          images: [shot('v2p-platform', 'login', 'Email login, mobile login, verification')],
        },
        {
          kicker: 'COMPANY ONBOARDING',
          title: 'A company in three steps',
          body: 'A three-step progress bar walks through GSTIN details, the list of partners, CIN details and the users to add, and ends on a declaration that shows everything captured before submitting.',
          images: [shot('v2p-platform', 'onboarding', 'GSTIN, partners, CIN, users, declaration')],
        },
        {
          kicker: 'INVOICES',
          title: 'Create, approve, pay',
          body: 'Creating an invoice starts with a nudge to clear recent invoices using pre-approved credit. Approval lists every pending invoice with approve and reject actions, and a bulk view lets a whole batch be selected and paid at once.',
          images: [
            shot('v2p-platform', 'create-invoice', 'Create invoice'),
            shot('v2p-platform', 'invoice-approval', 'Invoice approval'),
            shot('v2p-platform', 'bulk-approval', 'Select and pay in bulk'),
          ],
        },
        {
          kicker: 'PAYMENT',
          title: 'Every step confirmed',
          body: 'Paying is guarded by clear modals — OTP verification, a confirmation with the exact amount, an insufficient-funds warning that offers pre-approved credit instead, and a redirect loader. Card payment and the payment-status receipt close the loop.',
          images: [
            shot('v2p-platform', 'confirm-pay', 'Verification, confirmation, insufficient funds, redirect'),
            shot('v2p-platform', 'card-payment', 'Credit card payment'),
            shot('v2p-platform', 'payment-status', 'Payment status and receipt'),
          ],
        },
        {
          kicker: 'GST',
          title: 'GST in the same flow',
          body: 'GST challans are uploaded and paid with the same form pattern as invoices, and invoices can be raised by a maker for approval.',
          images: [shot('v2p-platform', 'gst', 'Upload challan, upload invoice by maker, payment status')],
        },
      ],
      deliverables: ['NEW ONBOARDING', 'INVOICE & PAYMENT FLOWS', 'GST FLOW', 'MODAL STATES'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'enquest-hrms',
    title: 'ENQUEST — HR MANAGEMENT SYSTEM',
    client: 'ENQUEST ERP SOFTWARE',
    role: 'Login, dashboards and HR modules for the HR suite of an ERP.',
    summary:
      'An HR system inside an ERP: a company-aware login, a dashboard for every module, employee records, disciplinary cases and leave — laid out as clear, sectioned screens.',
    caseStudy: {
      platform: 'WEB · DESKTOP',
      scope: ['REDESIGN', 'DASHBOARDS', 'FORMS', 'DESIGN SYSTEM'],
      brief:
        'HR screens carry a lot of fields. The design had to keep every one an HR team relies on while making each screen readable at a glance and consistent across a dozen modules.',
      sections: [
        {
          kicker: 'LOGIN',
          title: 'Company first, then the person',
          body: 'Because one install serves several companies, login starts with a searchable company code, then email or username and password. Every state was designed — the company list open, fields filled, “stay logged in”, and an invalid-username error.',
          images: [
            shot('enquest-hrms', 'login', 'Login'),
            shot('enquest-hrms', 'login-states', 'Company search, filled, stay logged in, error'),
          ],
        },
        {
          kicker: 'DASHBOARD',
          title: 'The month at the top, the person below',
          body: 'Colour-coded tiles show present days, hours, overtime, absences and leave for the current period. Below sit the profile, leave balance and approvals, reporting lines, files, useful links and a monthly trend. The same layout carries through every module in the side navigation — general setup, master, employee, leave, appraisal, recruitment, project tracking, earnings, assets, training and medical claims.',
          images: [
            shot('enquest-hrms', 'dashboard', 'Employee dashboard'),
            shot('enquest-hrms', 'dashboard-modules', 'The same frame across modules'),
          ],
        },
        {
          kicker: 'EMPLOYEE',
          title: 'A long record, broken into sections',
          body: 'Employee details are grouped into collapsible sections — employment, personal, other and customised fields — with a left index of every sub-page, and an edit mode that keeps the same layout.',
          images: [
            shot('enquest-hrms', 'employee', 'Employee details'),
            shot('enquest-hrms', 'employee-edit', 'Employee details — edit'),
          ],
        },
        {
          kicker: 'DISCIPLINARY CASE',
          title: 'From a single column to a structured case',
          body: 'The reference form kept in the file was one long column of fields. The new version lays the case out in a three-column grid — dates and times, who is involved, type and severity, description, files, invitees and CC — with dedicated view and edit states.',
          images: [
            shot('enquest-hrms', 'disciplinary-before', 'Before — the reference form', { narrow: true }),
            shot('enquest-hrms', 'disciplinary-form', 'After — new disciplinary case'),
            shot('enquest-hrms', 'disciplinary-views', 'View and edit states'),
          ],
        },
        {
          kicker: 'LEAVE',
          title: 'Apply with the calendar in view',
          body: 'The leave application sits next to a colour-coded calendar and a table of leave balances, so an employee sees what they have left and what is already booked while they fill it in.',
          images: [
            shot('enquest-hrms', 'leave', 'Leave application'),
            shot('enquest-hrms', 'leave-request', 'Leave request details'),
          ],
        },
      ],
      deliverables: ['LOGIN STATES', '12 MODULE DASHBOARDS', 'HR FORMS', 'COMPONENTS'],
    },
  },
]

/**
 * CLIENT FOLDERS
 * ----------------------------------------------------------------
 * Several products for one client are shown as ONE card on Our Work — a
 * folder — the same way a client's many videos sit in one project. The
 * panel opens with a chapter list; each chapter is a full case study.
 * Case studies not listed in a folder get a card of their own.
 */
export const FOLDERS = [
  {
    slug: 'mswipe',
    title: 'MSWIPE — MERCHANT PAYMENTS, INDIA & UAE',
    client: 'MSWIPE TECHNOLOGIES · ETISALAT UTAP',
    role: 'Apps, portals, website and emailers across Mswipe’s merchant products — including UTap, its UAE partnership with Etisalat.',
    summary:
      'Seven products for one payments company: getting a merchant onboarded, the app on their terminal, rewards, business loans, the UAE merchant portal, the website and the emails that tie it together.',
    platform: 'ANDROID · POS · WEB · EMAIL',
    children: ['merchant-onboarding', 'pos-merchant-app', 'merchant-rewards', 'loan-app', 'utap-portal', 'mswipe-website', 'emailers'],
  },
  {
    slug: 'v2p',
    title: 'V2P — B2B PAYMENTS PORTAL',
    client: 'V2P',
    role: 'Two versions of a vendor-payments portal: registration and dashboard, then onboarding, invoicing and payments.',
    summary:
      'A B2B payments portal designed twice — first vendor registration, a landing page and a risk-aware dashboard; then company onboarding and the full invoice-to-payment flow.',
    platform: 'WEB · DESKTOP',
    children: ['v2p-platform', 'vendor-portal'],
  },
]
