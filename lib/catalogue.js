// Pig.ai central catalogue — the single source of truth for services, packages, prices, limits and exclusions.
// Used by the Services page, Pricing page and the Ask Pig advisor (both the client-side guided questionnaire
// and the /api/advisor route). The AI model only ever *proposes* ids; prices are always computed here,
// deterministically, so nothing the model says can change what a visitor is actually charged.

export const CONTACT = {
  email: 'blast.ai.grow@gmail.com',
  instagramUrl: 'https://www.instagram.com/pig.ai00/?hl=en',
  instagramHandle: '@pig.ai00',
};

export const SERVICES = [
  {
    id: 'automation', letter: 'A', name: 'Business Automation', short: 'Automation',
    problem: 'You forget follow-ups, or retype the same information into different tools.',
    deliver: 'One defined workflow connecting up to two tools you already use, tested, with a handover walkthrough.',
    example: 'Save new enquiries to a customer sheet and send an acknowledgement automatically.',
    variants: [{ id: 'automation', label: 'One workflow', setup: 149, monthly: 0 }],
    addons: [{ id: 'automation_monitoring', label: 'Monitoring', setup: 0, monthly: 49, note: 'Monthly check and up to 30 minutes of small adjustments.' }],
    priceLine: '$149 one-time setup · optional monitoring $49/month',
    startingAt: '$149',
    extra: ['Additional workflows and larger changes need a quote.', 'Subscriptions for any paid tools you connect are billed to you by those tools.'],
    thirdParty: ['Paid plans for connected tools, if any'],
  },
  {
    id: 'website', letter: 'B', name: 'Websites and Landing Pages', short: 'Website',
    problem: 'Customers look you up and find nothing, or a page that does not work on phones.',
    deliver: 'A mobile-friendly site with your services, an enquiry form, contact buttons, a link or embed for your existing booking tool, basic page titles and descriptions, and domain connection.',
    example: 'A cleaner gets a one-page site with a quote form and a tap-to-call button.',
    variants: [
      { id: 'website_one', label: 'One-page website', setup: 249, monthly: 0 },
      { id: 'website_five', label: 'Up to five pages', setup: 399, monthly: 0 },
    ],
    addons: [],
    priceLine: 'One page $249 · up to five pages $399, one-time',
    startingAt: '$249',
    extra: ['First-year standard domain registration up to $20 is included; you own the domain.', 'Hosting, renewals, paid booking tools, ecommerce and advanced 3D work are separate.'],
    thirdParty: ['Hosting', 'Domain renewal after year one', 'Paid booking tool, if you choose one'],
  },
  {
    id: 'app', letter: 'C', name: 'Simple Business Apps', short: 'Simple app',
    problem: 'You track orders, enquiries or expenses in your head or in scattered notes.',
    deliver: 'A browser-based app with up to three screens, one user role and one main business function.',
    example: 'Customer enquiry tracking, order-status tracking, or a simple internal expense log.',
    variants: [{ id: 'app', label: 'Simple app', setup: 799, monthly: 0, from: true, quote: true }],
    addons: [],
    priceLine: 'From $799 one-time · final quote required',
    startingAt: 'From $799',
    extra: ['Native mobile apps, complex accounting, regulated financial functions, payment processing and complex integrations are outside this starting scope.'],
    thirdParty: ['Hosting or database plan, if needed'],
  },
  {
    id: 'chatgpt_ads', letter: 'D', name: 'ChatGPT Ads Management', short: 'ChatGPT ads',
    problem: 'People ask ChatGPT for recommendations and your business is never in the answer.',
    deliver: 'One campaign, three ad variations, supported measurement setup, weekly checks and a monthly report.',
    example: 'A salon runs one campaign aimed at people asking about hair colour services nearby.',
    variants: [{ id: 'chatgpt_ads', label: 'One campaign', setup: 199, monthly: 199 }],
    addons: [],
    priceLine: '$199 setup + $199/month · ad spend separate',
    startingAt: '$199 + $199/mo',
    extra: ['Available subject to your account eligibility, authorised access and platform capabilities.', 'Paid ads are separate from organic ChatGPT recommendations; those cannot be promised.', 'Pig.ai is not an official OpenAI partner.'],
    thirdParty: ['Advertising spend, paid to the platform'],
  },
  {
    id: 'video', letter: 'E', name: 'AI Promotional Videos', short: 'Promo videos',
    problem: 'You need short videos for your products or services but have no time to film.',
    deliver: 'Each video is 15–30 seconds, vertical, with one approved concept, script, AI presenter or product visuals, voiceover, captions, editing and one revision.',
    example: 'A bakery gets three creator-style clips introducing its weekend specials.',
    variants: [
      { id: 'video_one', label: 'One video', setup: 49, monthly: 0 },
      { id: 'video_batch', label: 'Three-video batch', setup: 129, monthly: 0 },
    ],
    addons: [],
    priceLine: 'One video $49 · three-video batch $129',
    startingAt: '$49',
    extra: ['Complex product demonstrations, many scene changes, custom characters and additional formats need a quote.', 'These are AI-generated promotional videos; a synthetic presenter is never presented as a real customer testimonial.'],
    thirdParty: [],
  },
  {
    id: 'meta_ads', letter: 'F', name: 'Facebook and Instagram Ads', short: 'Meta ads',
    problem: 'You want more enquiries but boosting posts has not worked.',
    deliver: 'One Meta campaign, up to two ad sets, three initial image ads, public competitor-ad research, supported tracking setup, weekly checks and a monthly report.',
    example: 'A home-service business runs one campaign for quote requests in its service area.',
    variants: [{ id: 'meta_ads', label: 'One campaign', setup: 149, monthly: 149 }],
    addons: [],
    priceLine: '$149 setup + $149/month · ad spend separate',
    startingAt: '$149 + $149/mo',
    extra: ['Entry plan manages up to $1,000/month in your ad spend; larger budgets or more campaigns need a quote.', 'Research uses publicly visible ads only — no access to competitors’ private targeting or results.'],
    thirdParty: ['Advertising spend, paid to Meta'],
  },
];

export const PACKAGES = [
  {
    id: 'get_online', name: 'Get Online', setup: 249, monthly: 0,
    tagline: 'For a business that needs a proper place online.',
    items: ['One-page mobile-friendly website', 'Services and business information', 'Enquiry form', 'Call button and booking link', 'Domain connection', 'First-year standard domain allowance up to $20', 'Two revision rounds', 'Handover walkthrough', 'No required Pig.ai monthly service fee'],
    covers: ['website'], firstMonthLabel: '$249', ongoingLabel: 'No monthly fee',
    extras: 'Excludes hosting and domain renewals after year one.',
  },
  {
    id: 'save_time', name: 'Save Time', setup: 449, monthly: 49,
    tagline: 'For a business that loses enquiries to busy days.',
    items: ['Website with up to three pages', 'Contact form and booking link', 'Simple customer tracking sheet', 'One enquiry acknowledgement and tracking workflow', 'Monthly automation check', 'Up to 30 minutes of small changes monthly', 'Website domain allowance and handover as above'],
    covers: ['website', 'automation'], firstMonthLabel: '$498', ongoingLabel: 'then $49/month',
    extras: 'Excludes hosting, domain renewals and any paid tool subscriptions.',
  },
  {
    id: 'bring_in_enquiries', name: 'Bring In Enquiries', setup: 599, monthly: 299,
    tagline: 'For a business ready to advertise every month.',
    items: ['Website with up to five pages', 'One enquiry acknowledgement and tracking workflow', 'One Meta campaign with up to two ad sets', 'Up to $1,000/month in your ad spend managed', 'Three AI promotional videos and two image ads each month', 'Weekly campaign checks', 'Monthly automation check and results report', 'Up to 30 minutes of website changes monthly', 'Website domain allowance and handover as above'],
    covers: ['website', 'automation', 'meta_ads', 'video'], firstMonthLabel: '$898', ongoingLabel: 'then $299/month',
    extras: 'Excludes hosting, domain renewals, tool subscriptions and your advertising spend (paid to Meta).',
  },
];

export const GLOBAL_EXCLUSIONS = 'Totals exclude hosting, additional software, usage fees, advertising spend and applicable taxes.';

export const PRICE_CONSISTENCY_CHECK = PACKAGES.every(p => p.setup + p.monthly === Number(p.firstMonthLabel.replace(/[^0-9]/g, '')));

const money = n => '$' + n.toLocaleString('en-US');

export function findVariant(id) {
  for (const s of SERVICES) {
    const v = s.variants.find(v => v.id === id); if (v) return { service: s, variant: v, kind: 'variant' };
    const a = s.addons.find(a => a.id === id); if (a) return { service: s, variant: a, kind: 'addon' };
  }
  return null;
}
export function findPackage(id) { return PACKAGES.find(p => p.id === id) || null; }

// Deterministic pricing. Input is an *intent* (ids only); output has every number computed from this file.
export function computePlan(intent) {
  const pkg = intent.packageId ? findPackage(intent.packageId) : null;
  const lines = []; const thirdParty = new Set(); const quoteRequired = []; const dropped = [];
  if (pkg) {
    lines.push({ id: pkg.id, name: pkg.name + ' package', setup: pkg.setup, monthly: pkg.monthly, deliverables: pkg.items });
    if (pkg.covers.includes('website')) { thirdParty.add('Hosting'); thirdParty.add('Domain renewal after year one'); }
    if (pkg.covers.includes('meta_ads')) thirdParty.add('Advertising spend, paid to Meta');
  }
  const ids = [...new Set([...(intent.variantIds || []), ...(intent.addonIds || [])])].filter(Boolean);
  for (const id of ids) {
    const hit = findVariant(id);
    if (!hit) { dropped.push(id); continue; }
    if (pkg && pkg.covers.includes(hit.service.id)) { dropped.push(id); continue; } // avoid duplicate charges
    if (hit.kind === 'addon' && !ids.includes(hit.service.variants[0].id) && !(pkg && pkg.covers.includes(hit.service.id))) { dropped.push(id); continue; }
    const v = hit.variant;
    if (v.quote) {
      quoteRequired.push({ name: hit.service.name + ' — ' + v.label, from: v.setup });
    } else {
      lines.push({ id: v.id, name: hit.service.name + (hit.service.variants.length > 1 || hit.kind === 'addon' ? ' — ' + v.label : ''), setup: v.setup, monthly: v.monthly, deliverables: [hit.kind === 'addon' ? v.note : hit.service.deliver] });
    }
    hit.service.thirdParty.forEach(t => thirdParty.add(t));
  }
  const setup = lines.reduce((s, l) => s + l.setup, 0);
  const monthly = lines.reduce((s, l) => s + l.monthly, 0);
  const cheaper = suggestCheaperPackage(lines, pkg);
  return {
    lines, setupTotal: setup, monthlyTotal: monthly, firstMonthTotal: setup + monthly,
    setupLabel: money(setup), monthlyLabel: monthly ? money(monthly) + '/month' : 'No Pig.ai monthly fee', firstMonthLabel: money(setup + monthly),
    thirdParty: [...thirdParty], quoteRequired, dropped, cheaperPackage: cheaper,
    partial: quoteRequired.length > 0, hasPriced: lines.length > 0,
  };
}

function suggestCheaperPackage(lines, pkg) {
  if (pkg) return null;
  const ids = lines.map(l => l.id);
  const has = id => ids.includes(id);
  const setup = lines.reduce((s, l) => s + l.setup, 0);
  if ((has('website_five') || has('website_one')) && has('automation') && has('meta_ads')) {
    if (setup > 599) return findPackage('bring_in_enquiries');
  }
  if ((has('website_five')) && has('automation') && has('automation_monitoring') && !has('meta_ads')) {
    return findPackage('save_time');
  }
  return null;
}

// ---------- Rule engine for the guided questionnaire (and as a guard for AI proposals) ----------

export const CATEGORIES = {
  website: ['website', 'web site', 'landing page', 'online presence', 'google me', 'look me up', 'homepage', 'site'],
  followup: ['follow up', 'follow-up', 'forget', 'forgetting', 'reply', 'respond', 'acknowledg', 'spreadsheet', 'manual', 'retyp', 'automat', 'reminder', 'missed call', 'miss calls', 'chase', 'admin'],
  video: ['video', 'reel', 'tiktok', 'content', 'clip', 'promo'],
  enquiries: ['enquir', 'inquir', 'leads', 'customers', 'more clients', 'more bookings', 'advertis', 'facebook', 'instagram', 'meta', 'ads', 'marketing', 'get found', 'grow'],
  app: ['app', 'track orders', 'order status', 'expense', 'internal tool', 'dashboard', 'portal'],
  chatgpt: ['chatgpt', 'chat gpt', 'openai', 'ai search', 'ai recommend'],
};
export const UNSUPPORTED = [
  { match: ['ios app', 'android app', 'app store', 'native app', 'mobile app'], reason: 'native mobile apps' },
  { match: ['accounting', 'bookkeeping', 'payroll', 'tax filing', 'quickbooks setup'], reason: 'accounting or payroll systems' },
  { match: ['payment processing', 'take payments', 'stripe integration', 'ecommerce', 'online store', 'shopify'], reason: 'ecommerce and payment processing' },
  { match: ['logo', 'branding', 'brand identity'], reason: 'logo and brand-identity design' },
  { match: ['seo', 'rank on google', 'first page of google'], reason: 'SEO campaigns' },
  { match: ['guarantee', 'guaranteed'], reason: 'guaranteed results' },
  { match: ['photograph', 'photo shoot', 'photoshoot'], reason: 'photography' },
];

/** @returns {{category: string, secondary?: string|null, reason?: string}} */
export function classifyProblem(text) {
  const t = (text || '').toLowerCase();
  for (const u of UNSUPPORTED) if (u.match.some(m => t.includes(m))) return { category: 'unsupported', reason: u.reason };
  /** @type {[string, number][]} */
  const scores = Object.entries(CATEGORIES).map(([k, words]) => [k, words.filter(w => t.includes(w)).length]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  if (!scores.length) return { category: 'unknown' };
  return { category: scores[0][0], secondary: scores[1] ? scores[1][0] : null };
}

export const BUDGET_SETUP = [
  { label: 'Under $150', max: 149 }, { label: '$150–$300', max: 300 }, { label: '$300–$600', max: 600 }, { label: '$600 or more', max: 99999 }, { label: 'Not sure', max: null },
];
export const BUDGET_MONTHLY = [
  { label: 'Nothing monthly', max: 0 }, { label: 'Up to $50', max: 50 }, { label: 'Up to $150', max: 150 }, { label: 'Up to $300', max: 300 }, { label: '$300 or more', max: 99999 }, { label: 'Not sure', max: null },
];
export const QUESTIONS = [
  { key: 'problem', ask: 'What is slowing your business down right now?', options: ['I need a professional website.', 'I keep forgetting to follow up.', 'I need videos for my products.', 'I want more customer enquiries.'], free: true },
  { key: 'businessType', ask: 'What kind of business is it?', options: ['Café or restaurant', 'Salon or spa', 'Cleaning or home services', 'Local shop', 'Small online store', 'Other'], free: true },
  { key: 'hasWebsite', ask: 'Do you already have a website that works for you?', options: ['Yes, it works', 'Yes, but it needs replacing', 'No website yet', 'Not sure'] },
  { key: 'advertising', ask: 'Have you run any Facebook or Instagram ads before?', options: ['Yes, currently running', 'Tried before, stopped', 'Never', 'Not sure'], onlyFor: ['enquiries', 'chatgpt', 'unknown'] },
  { key: 'setupBudget', ask: 'Roughly what could you spend on a one-time setup?', options: BUDGET_SETUP.map(b => b.label) },
  { key: 'monthlyBudget', ask: 'And what feels comfortable monthly, if anything?', options: BUDGET_MONTHLY.map(b => b.label) },
];

export function nextQuestion(ctx) {
  const cat = ctx.category || 'unknown';
  for (const q of QUESTIONS) {
    if (ctx[q.key]) continue;
    if (q.onlyFor && !q.onlyFor.includes(cat)) continue;
    return q;
  }
  return null;
}

const budgetMax = (list, label) => { const b = list.find(b => b.label === label); return b && b.max != null ? b.max : null; };

export function recommend(ctx) {
  const cat = ctx.category || 'unknown';
  const hasSite = ctx.hasWebsite === 'Yes, it works';
  const needsSite = ctx.hasWebsite === 'No website yet' || ctx.hasWebsite === 'Yes, but it needs replacing';
  const setupMax = budgetMax(BUDGET_SETUP, ctx.setupBudget);
  const monthlyMax = budgetMax(BUDGET_MONTHLY, ctx.monthlyBudget);
  const biz = ctx.businessType && ctx.businessType !== 'Other' ? ctx.businessType.toLowerCase() : 'small business';
  const intent = { packageId: null, variantIds: [], addonIds: [], understood: '', tryNow: '', ownerReview: [], unresolved: [], unsupported: null, note: null };
  const problemText = ctx.problem ? `“${ctx.problem.trim().replace(/[.!?]+$/, '')}”` : 'your goal';
  intent.understood = `You run a ${biz}. Your main issue: ${problemText}. ${hasSite ? 'You already have a website that works.' : needsSite ? 'You need a website that works properly.' : 'We have not confirmed your website situation.'}${ctx.setupBudget ? ` Setup budget around ${ctx.setupBudget.toLowerCase()}` : ''}${ctx.monthlyBudget ? `, monthly ${ctx.monthlyBudget.toLowerCase()}.` : '.'}`;

  if (cat === 'unsupported') {
    intent.unsupported = `Pig.ai does not offer ${ctx.unsupportedReason || 'that'}. `;
    intent.tryNow = 'Search for a specialist in that area, and compare two or three quotes before deciding.';
    if (needsSite) { intent.variantIds.push('website_one'); intent.unsupported += 'If a working website would still help, a one-page site is the closest fit we do offer.'; }
    else intent.unsupported += 'Nothing in our catalogue genuinely fits, so we will not suggest a paid service.';
    intent.unresolved.push('Whether an adjacent Pig.ai service would be useful at all');
    return intent;
  }

  if (cat === 'followup') {
    intent.tryNow = 'Write one short acknowledgement message today and save it as a phone text-replacement or email template, so every enquiry gets a same-day reply.';
    intent.variantIds.push('automation'); intent.addonIds.push('automation_monitoring');
    if (needsSite) { intent.packageId = 'save_time'; intent.variantIds = []; intent.addonIds = []; intent.note = 'Because you also need a working website, the Save Time package covers both for less than buying separately.'; }
    intent.ownerReview.push('Which two tools the workflow connects (e.g. your form and a Google Sheet)');
  } else if (cat === 'website') {
    intent.tryNow = 'Write down your five most-asked customer questions; they become the content of your site.';
    if (hasSite) { intent.unresolved.push('What specifically is not working about your current site'); intent.variantIds.push('website_one'); intent.note = 'You said your site works, so consider whether a fresh one-page site is really needed — tell us what is missing and we will confirm.'; }
    else intent.packageId = 'get_online';
    intent.ownerReview.push('Whether one page or up to five pages fits your services');
  } else if (cat === 'video') {
    intent.tryNow = 'Pick the three products or services you most want to sell this month; each becomes one 15–30 second video.';
    intent.variantIds.push(setupMax != null && setupMax < 129 ? 'video_one' : 'video_batch');
    intent.ownerReview.push('The one concept and script per video before production');
  } else if (cat === 'enquiries') {
    intent.tryNow = 'Make sure your Google Business Profile and Instagram bio show your phone number, opening hours and one clear call to action.';
    if (needsSite && (monthlyMax == null || monthlyMax >= 299)) intent.packageId = 'bring_in_enquiries';
    else if (needsSite) { intent.packageId = monthlyMax != null && monthlyMax < 49 ? 'get_online' : 'save_time'; intent.note = 'A monthly ad campaign is outside your stated monthly budget, so this starts with a website that can capture enquiries; ads can be added later.'; }
    else { intent.variantIds.push('meta_ads'); if (setupMax == null || setupMax >= 300) intent.variantIds.push('video_batch'); }
    intent.ownerReview.push('Your Meta account access and a sensible monthly ad budget (paid to Meta, separate from our fee)');
    intent.unresolved.push('Monthly advertising spend you are comfortable paying the platform');
  } else if (cat === 'app') {
    intent.tryNow = 'Sketch the one screen you would open every morning — what three columns would it show?';
    intent.variantIds.push('app');
    intent.unresolved.push('Exact scope, so the owner can confirm a final quote');
  } else if (cat === 'chatgpt') {
    intent.tryNow = 'Ask ChatGPT for a recommendation in your category and town; note how competitors are described.';
    intent.variantIds.push('chatgpt_ads');
    intent.unresolved.push('Whether your account is eligible for ChatGPT ads; organic mentions cannot be promised');
  } else {
    intent.tryNow = 'Write one sentence about what a good week looks like for your business; it helps us pick the right first step.';
    if (needsSite) intent.packageId = 'get_online'; else intent.variantIds.push('automation');
    intent.unresolved.push('Your main goal in one sentence');
  }
  return fitToBudget(intent, setupMax, monthlyMax);
}

export function fitToBudget(intent, setupMax, monthlyMax) {
  const plan = computePlan(intent);
  if (monthlyMax != null && plan.monthlyTotal > monthlyMax) {
    if (intent.packageId === 'bring_in_enquiries') intent.packageId = monthlyMax >= 49 ? 'save_time' : 'get_online';
    else if (intent.packageId === 'save_time' && monthlyMax < 49) intent.packageId = 'get_online';
    intent.addonIds = intent.addonIds.filter(a => a !== 'automation_monitoring' || monthlyMax >= 49);
    intent.variantIds = intent.variantIds.filter(v => !['meta_ads', 'chatgpt_ads'].includes(v) || monthlyMax >= 149);
    intent.note = (intent.note ? intent.note + ' ' : '') + 'Monthly items above your comfortable budget were left out; they can be added later.';
  }
  const plan2 = computePlan(intent);
  if (setupMax != null && plan2.setupTotal > setupMax) {
    if (intent.packageId === 'bring_in_enquiries') intent.packageId = 'save_time';
    if (intent.packageId === 'save_time' && setupMax < 449) intent.packageId = 'get_online';
    intent.variantIds = intent.variantIds.map(v => v === 'website_five' ? 'website_one' : v === 'video_batch' ? 'video_one' : v);
    const plan3 = computePlan(intent);
    if (plan3.setupTotal > setupMax) {
      intent.smallest = plan3.lines.slice().sort((a, b) => a.setup - b.setup)[0] || null;
      intent.note = (intent.note ? intent.note + ' ' : '') + `The smallest suitable paid option is still above your stated setup budget. The free step above is a genuine start; the smallest option is shown so you can plan for it, with no pressure.`;
    } else intent.note = (intent.note ? intent.note + ' ' : '') + 'Scaled to the smallest option that fits your setup budget.';
  }
  return intent;
}

// Compact description for the AI system prompt (ids + limits only — no free-form prices for the model to repeat).
export function catalogueForModel() {
  return SERVICES.map(s => `${s.id}: ${s.name}. For: ${s.problem} Delivers: ${s.deliver} Variants: ${s.variants.map(v => v.id + ' (' + v.label + (v.quote ? ', quote required' : '') + ')').join(', ')}${s.addons.length ? '. Add-ons: ' + s.addons.map(a => a.id + ' (' + a.label + ')').join(', ') : ''}. Limits: ${s.extra.join(' ')}`).join('\n')
    + '\nPackages: ' + PACKAGES.map(p => `${p.id}: ${p.name} — ${p.tagline} Covers: ${p.covers.join(', ')}.`).join(' ');
}

export function planToText(plan, intent, ctx) {
  const L = [];
  L.push('PIG.AI — SUGGESTED PLAN (subject to scope confirmation)');
  L.push('');
  L.push('What I understood: ' + intent.understood);
  L.push('What you can try now: ' + intent.tryNow);
  if (intent.unsupported) L.push('Note: ' + intent.unsupported);
  if (plan.lines.length) { L.push('How Pig.ai can help:'); plan.lines.forEach(l => L.push(`- ${l.name}: setup ${money(l.setup)}${l.monthly ? ', ' + money(l.monthly) + '/month' : ''}`)); }
  plan.quoteRequired.forEach(q => L.push(`- ${q.name}: custom quote required (from ${money(q.from)})`));
  L.push('Setup cost: ' + plan.setupLabel + (plan.partial ? ' (excludes items awaiting quote)' : ''));
  L.push('Monthly cost: ' + plan.monthlyLabel);
  if (plan.thirdParty.length) L.push('Separate third-party costs: ' + plan.thirdParty.join('; '));
  if (intent.ownerReview.length) L.push('Needs owner review: ' + intent.ownerReview.join('; '));
  if (intent.unresolved.length) L.push('Open questions: ' + intent.unresolved.join('; '));
  if (ctx && ctx.websiteUrl) L.push('Website: ' + ctx.websiteUrl);
  L.push(GLOBAL_EXCLUSIONS);
  return L.join('\n');
}

// Shapes a computed intent into the exact view model the Ask Pig plan card renders,
// plus the plain-text brief. Used by both the client-side guided flow and the
// /api/advisor route (AI mode) so the two paths render identically.
export function buildPlanView(intent, ctx) {
  const plan = computePlan(intent);
  const smallest = intent.smallest ? ` Smallest option: ${intent.smallest.name} at ${money(intent.smallest.setup)}.` : '';
  const view = {
    understood: intent.understood, tryNow: intent.tryNow, unsupported: intent.unsupported || null,
    lines: plan.lines.map(l => ({ ...l, priceLabel: l.setup ? money(l.setup) + (l.monthly ? ' + ' + money(l.monthly) + '/mo' : '') : money(l.monthly) + '/mo' })),
    hasLines: plan.lines.length > 0, noLines: plan.lines.length === 0,
    quoteRequired: plan.quoteRequired.map(q => ({ ...q, fromLabel: money(q.from) })),
    note: (intent.note || '') + smallest || null,
    cheaper: plan.cheaperPackage ? `A cheaper way to get the same things: the ${plan.cheaperPackage.name} package (${plan.cheaperPackage.firstMonthLabel} first month, ${plan.cheaperPackage.ongoingLabel}).` : null,
    setupLabel: plan.setupLabel, monthlyLabel: plan.monthlyLabel, partial: plan.partial,
    thirdParty: plan.thirdParty.length ? plan.thirdParty.join(' · ') + '. ' + GLOBAL_EXCLUSIONS : 'None identified. ' + GLOBAL_EXCLUSIONS,
    review: [...(intent.ownerReview || []), ...(intent.unresolved || []).map(u => 'Open: ' + u), 'Final scope and start date are confirmed by the owner — nothing here is a booking.'].join(' · '),
  };
  const brief = planToText(plan, intent, ctx);
  return { view, brief };
}

export { money };
