# App Description and Product Requirements: AI Sentence Translation Language Learning App

**Product name:** TBD  
**Document version:** 2.0  
**Date:** 2026-06-16  
**Document type:** Product Requirements Document  
**Scope:** Product description, positioning, UX, UI direction, learning flows, motivation, monetization, AI behavior, content safety, MVP scope, and acceptance criteria  
**Out of scope:** Technical architecture, backend implementation, database design, API design, model selection, infrastructure, and code-level decisions

---

## 1. Product summary

The app helps people learn a new language by practicing translation one sentence at a time.

The app is **not a chatbot**. Instead, it presents a sentence in the user's known language and asks the user to translate it into the language they are learning. After the user submits an answer, the app gives clear feedback, explains mistakes, shows better translations, saves useful words and sentences, and creates personalized review exercises from the user's actual learning history.

The core learning loop is:

> Receive sentence → Translate → Submit → Get feedback → Save or review → Improve over time

The app should feel like a serious, modern, personal language teacher. It should be simple enough for daily use, but intelligent enough to adapt to the user's level, goals, mistakes, saved words, and progress.

---

## 2. Product vision

Build a focused language-learning app that helps users improve through sentence translation, personalized correction, mistake-based review, and motivational progress tracking.

The app should feel more useful than generic flashcards and less overwhelming than open-ended AI chat. The user should always know what to do next.

The strongest differentiator is:

> Personalized correction and review based on the user's actual mistakes.

---

## 3. Product principles

### 3.1 Focused learning

The main activity is always clear: translate one sentence.

The app should avoid overwhelming users with too many modes, screens, or choices during practice.

### 3.2 Feedback is the product

The correction experience is the most important part of the app. The app should not only say whether the answer is right or wrong. It should explain what changed, why it changed, and how the user can improve.

### 3.3 Multiple answers can be correct

The app should understand that translations are flexible. It should accept natural alternative translations when the meaning is correct.

### 3.4 Mistakes become lessons

The user's wrong answers should automatically become study material. Wrong words, weak grammar patterns, skipped sentences, and low-confidence answers should shape future practice.

### 3.5 Motivation without guilt

The app should use goals, levels, streaks, achievements, and progress reports to motivate users, but it should not make users feel punished for missing a day.

### 3.6 Professional and calm design

The app should look serious, polished, modern, and premium. It should not feel childish, noisy, or overly colorful.

### 3.7 Safe and ethical AI behavior

The AI should behave like a responsible teacher. It should avoid adult, hateful, racist, discriminatory, violent, unsafe, or inappropriate content.

---

## 4. Target users

## 4.1 Beginner learner

A user who knows basic words but struggles to write full sentences.

Needs:

- Simple sentence structure.
- Clear explanations in their known language.
- Soft validation.
- Encouraging feedback.
- Basic vocabulary review.
- Frequent hints.
- Slow difficulty progression.

## 4.2 Intermediate learner

A user who understands many words but makes grammar, tense, and word-order mistakes.

Needs:

- Realistic daily sentences.
- Balanced validation.
- Mistake categories.
- Review of repeated weak points.
- Saved words and sentences.
- Progress charts.

## 4.3 Advanced learner

A user who wants more natural, precise, and fluent writing.

Needs:

- Complex sentences.
- Strict validation.
- Natural phrasing feedback.
- Alternative translations.
- Formal and informal style guidance.
- More detailed grammar explanations.

## 4.4 Busy learner

A user who wants to practice a few minutes per day.

Needs:

- Short sessions.
- Quick daily goals.
- Notifications.
- Review reminders.
- Weekly progress reports.

## 4.5 Goal-oriented learner

A user learning for a practical reason.

Possible goals:

- Travel.
- Work.
- School.
- Exams.
- Interviews.
- Conversation.
- Writing.
- Understanding movies, videos, or media.

Needs:

- Goal-based sentence topics.
- Practical vocabulary.
- Visible progress.
- Personalized learning path.

---

## 5. Product goals

## 5.1 User goals

The user should be able to:

- Select their known language.
- Select the language they want to learn.
- Set their current level.
- Take a short placement test if they are unsure of their level.
- Practice one sentence at a time.
- Translate sentences into the target language.
- Submit answers for validation.
- Choose how strict the validation should be.
- See where they were wrong.
- Understand why they were wrong.
- Save useful words.
- Save useful sentences.
- Automatically track wrong words.
- Review words and sentences with flashcards and other tools.
- See history of translated sentences.
- See words they are learning and words they already learned.
- See progress charts and learning feedback.
- Set goals and earn achievements.
- Configure notifications.
- Skip sentences when needed.

## 5.2 Business goals

The app should:

- Launch as a free product.
- Use ads carefully without damaging the learning experience.
- Build retention before introducing paid plans.
- Encourage daily practice.
- Encourage review of saved and wrong content.
- Create enough user value to support a future subscription plan.

## 5.3 Product experience goals

The app should feel:

- Clean.
- Fast.
- Calm.
- Professional.
- Premium.
- Encouraging.
- Educational.
- Modern.
- Animated.
- Responsive.

---

## 6. Non-goals

The first version should not try to be:

- A full chatbot.
- A social network.
- A complete grammar course.
- A live tutoring marketplace.
- A public content-sharing platform.
- A certification or exam platform.
- A children's game.
- A meme-style gamified app.
- A complex analytics dashboard.

The app can add some of these ideas later, but the first product should stay focused on sentence translation, correction, review, and progress.

---

## 7. Recommended feature additions included in this PRD

The following improvements are now part of the product scope.

## 7.1 Adaptive placement test

The app should not rely only on the user's self-selected level. During onboarding, users can either choose a level manually or take a short placement test.

The placement test should include a small number of translation exercises and recommend a level.

Goal:

- Avoid giving beginners sentences that are too hard.
- Avoid boring advanced users.
- Make the app feel personalized from the first session.

## 7.2 Hint ladder

When the user is stuck, the app should not immediately reveal the answer. It should provide progressive help.

Suggested hint levels:

1. Grammar hint.
2. Vocabulary hint.
3. First-word hint.
4. Word bank.
5. Full answer reveal.

Example:

Sentence:

> "Ayer compré comida para la cena."

Hints:

1. "This sentence uses the past tense."
2. "The main verb means 'bought'."
3. "The sentence can start with 'Yesterday...'"
4. Word bank: "Yesterday / I / bought / food / for / dinner"
5. Correct answer: "Yesterday I bought food for dinner."

## 7.3 Multiple accepted translations

The app should accept more than one valid translation.

For each sentence, feedback should support:

- Best natural translation.
- Accepted alternatives.
- Explanation of why the user's answer is correct, partially correct, or incorrect.
- Optional formality notes.

Example:

Source sentence:

> "Voy a llamarte más tarde."

Accepted answers:

- "I am going to call you later."
- "I'll call you later."
- "I will call you later."

## 7.4 Error categories

Mistakes should be classified into simple categories.

Required error categories:

- Wrong word.
- Missing word.
- Extra word.
- Wrong tense.
- Wrong word order.
- Wrong preposition.
- Wrong article.
- Spelling mistake.
- Punctuation issue.
- Capitalization issue.
- Meaning changed.
- Unnatural phrasing.
- Formality mismatch.

These categories should power feedback, progress charts, review exercises, and weekly reports.

## 7.5 Mistake notebook

The app should automatically create a personal "Mistake Notebook."

The notebook should show:

- Words the user frequently misses.
- Sentences answered incorrectly.
- Grammar patterns the user struggles with.
- Mistakes that are improving.
- Mistakes that still need practice.
- Explanations and examples.

Example insight:

> You often confuse "make" and "do." Review 5 examples today.

## 7.6 Review modes beyond flashcards

Flashcards should be included, but review should not be limited to flashcards.

Required review modes:

- Word translation.
- Sentence translation.
- Fill in the blank.
- Word ordering.
- Multiple choice.
- Fix the mistake.
- Listen and type.
- Retry previous wrong sentence.
- Review low-confidence answers.

## 7.7 Sentence themes

Users should be able to practice by theme.

Suggested themes:

- Daily life.
- Work.
- Travel.
- Food.
- Shopping.
- School.
- Technology.
- Family-safe relationships.
- Health basics.
- Interviews.
- Business communication.
- Common phrases.
- Grammar focus.
- User's saved words.
- User's weak areas.

## 7.8 Personal goals

Users should define why they are learning.

Goal options:

- Travel.
- Work.
- School.
- Exams.
- Interviews.
- Conversation.
- Writing.
- Movies and media.
- General improvement.

The app should use this goal to influence sentence topics, vocabulary, achievements, and weekly feedback.

## 7.9 Confidence rating

After each answer, the app can ask how confident the user felt.

Options:

- Guessed.
- Not sure.
- Mostly sure.
- Very sure.

A correct answer with low confidence should still be reviewed later.

## 7.10 "Explain this simply" action

Feedback should include an action that lets the user ask for a simpler explanation.

Button label:

> Explain this simply

The explanation should be short, practical, and written in the user's known language.

## 7.11 Audio support

The app should include audio for language learning.

Required audio moments:

- Hear the source sentence.
- Hear the correct target-language sentence.
- Hear saved words.
- Hear saved sentences.

Future audio moments:

- Pronunciation practice.
- Listen and type exercises.
- Speaking comparison.

## 7.12 Healthy streaks

The app should include streaks or consistency tracking, but not in a punishing way.

Recommended motivation tools:

- Daily goal.
- Weekly consistency.
- Streak freeze.
- Gentle return reminders.
- Progress recovery.
- "Still on track this week" messaging.

Avoid guilt-based messages.

## 7.13 Smart skip behavior

Skipping should be allowed.

When the user skips, the app should optionally ask why:

- Too hard.
- Too easy.
- I do not know the vocabulary.
- I am not interested in this topic.
- I already know this.

Skipped sentences should appear in History but should not count as correct or incorrect.

## 7.14 Weekly learning report

The app should give users a weekly report.

The report should show:

- Sentences completed.
- Words learned.
- Words still difficult.
- Most common mistakes.
- Accuracy trend.
- Strongest category.
- Recommended focus for next week.

Example:

> This week, your accuracy improved from 62% to 71%. You are getting better with past tense, but prepositions still need practice.

## 7.15 Rewarded ads

Because the app starts free, rewarded ads should be preferred over disruptive ads.

Good rewarded ad moments:

- Earn bonus hints.
- Unlock a bonus review pack.
- Earn a streak freeze.
- Unlock extra practice after completing the daily goal.
- Access a longer weekly report.

Ads should never interrupt typing, correction, or active review.

---

## 8. Core user journeys

## 8.1 First-time user journey

1. User opens the app.
2. User selects their known language.
3. User selects the language they want to learn.
4. User chooses a level or takes a placement test.
5. User chooses a learning goal.
6. User chooses sentence themes or skips theme selection.
7. User sets a daily goal.
8. User configures notifications.
9. User starts the first practice session.
10. App shows one sentence.
11. User translates it.
12. App gives immediate feedback.
13. App explains saved words, review, history, and progress.

## 8.2 Daily practice journey

1. User opens the app.
2. Home screen shows today's goal and a primary "Start practice" action.
3. App shows one sentence in the user's known language.
4. User translates into the target language.
5. User submits.
6. App validates the answer based on the selected validation mode.
7. App highlights mistakes.
8. App shows the correct translation and explanation.
9. App saves wrong words automatically.
10. User can save the sentence, retry, continue, or skip.
11. At the end, app shows a session summary.

## 8.3 Review journey

1. User opens the Review section.
2. App shows recommended review decks.
3. User chooses a deck or starts recommended review.
4. App presents flashcards or interactive exercises.
5. User marks items as known, unsure, or difficult.
6. App updates mastery status.
7. App recommends the next review time or next action.

## 8.4 Notification journey

1. User receives a configured notification.
2. Notification contains a reminder, word, or sentence challenge.
3. User opens the app from the notification.
4. App starts a quick practice or review session.
5. User completes the action.
6. App updates daily goal progress.

---

## 9. App information architecture

The app should include the following main sections.

## 9.1 Home

Purpose:

- Give the user a clear place to continue learning.

Home should show:

- Daily goal progress.
- Current level.
- Weekly consistency or streak.
- Primary "Start practice" button.
- Review reminder.
- Difficult words preview.
- Recent achievement.
- Short AI teacher tip.
- Optional weekly progress card.

Suggested layout:

1. Header with greeting and level.
2. Large "Continue learning" card.
3. Daily goal progress.
4. Recommended action.
5. Quick cards:
   - Review.
   - Saved Words.
   - Mistake Notebook.
   - Progress.
6. Bottom navigation.

Home should feel calm and uncluttered.

## 9.2 Practice

Purpose:

- Let the user translate one sentence at a time.

Practice should show:

- Source sentence.
- Target language.
- Text input.
- Submit button.
- Hint button.
- Skip button.
- Save action.
- Validation mode indicator.
- Audio button.
- Session progress.

The sentence should be the visual focus.

No ads should appear on the Practice screen.

## 9.3 Feedback

Purpose:

- Help the user understand their answer.

Feedback should show:

- Result status.
- User answer.
- Correct answer.
- Highlighted mistakes.
- Explanation.
- Accepted alternatives.
- Error categories.
- Save word/sentence actions.
- Retry action.
- Continue action.
- "Explain this simply" action.

Feedback should be clear, animated, and easy to understand.

## 9.4 Review

Purpose:

- Help users study saved and difficult content.

Review should show:

- Recommended review.
- Saved words deck.
- Wrong words deck.
- Saved sentences deck.
- Mistake notebook deck.
- Low-confidence deck.
- Recently learned deck.

Review should support multiple exercise types, not only flashcards.

## 9.5 Saved Words

Purpose:

- Store words the user wants to learn.

Each word should show:

- Word.
- Translation.
- Example sentence.
- Times missed.
- Times answered correctly.
- Mastery status.
- Last practiced date.
- Audio button.
- Practice action.

Statuses:

- New.
- Learning.
- Difficult.
- Improving.
- Learned.

## 9.6 Saved Sentences

Purpose:

- Store useful sentences for later study.

Each sentence should show:

- Source sentence.
- Correct translation.
- User's previous answer if available.
- Explanation.
- Topic.
- Difficulty.
- Saved date.
- Practice again action.

## 9.7 Mistake Notebook

Purpose:

- Turn wrong answers into personalized lessons.

The notebook should show:

- Frequently missed words.
- Repeated grammar mistakes.
- Weak topics.
- Improving mistakes.
- Recently fixed mistakes.
- Recommended review.

Example cards:

- "You often miss past tense verbs."
- "You confuse 'make' and 'do'."
- "You improved with word order this week."

## 9.8 Progress

Purpose:

- Make learning visible.

Progress should show:

- Sentences completed.
- Words learned.
- Words still difficult.
- Accuracy over time.
- Mistakes by category.
- Practice calendar.
- Daily and weekly goal completion.
- Review completion.
- Current level progress.
- Weekly report.

Charts should be simple and readable.

## 9.9 History

Purpose:

- Let users review previous practice.

Each history item should show:

- Source sentence.
- User translation.
- Correct translation.
- Result.
- Mistake categories.
- Validation mode.
- Date.
- Topic.
- Level.
- Retry action.
- Save action.

Filters:

- Correct.
- Almost correct.
- Incorrect.
- Skipped.
- Saved.
- Difficult.
- Topic.
- Level.
- Date.

## 9.10 Goals and Achievements

Purpose:

- Motivate users with visible progress.

The section should include:

- Daily goal.
- Weekly goal.
- Current level progress.
- Achievements.
- Streak or consistency.
- Upcoming milestones.

## 9.11 Settings

Purpose:

- Let users control the learning experience.

Settings should include:

- Known language.
- Target language.
- Current level.
- Learning goal.
- Preferred themes.
- Validation mode.
- Notification preferences.
- Audio preferences.
- Accessibility preferences.
- Ad/premium preferences when available.
- Privacy and content-safety controls.

---

## 10. Onboarding requirements

Onboarding should be fast, polished, and focused.

## 10.1 Welcome screen

Message:

> Learn by translating real sentences, one at a time.

Primary action:

> Get started

Visual direction:

- Clean background.
- One animated sentence card.
- Minimal copy.
- Professional tone.

## 10.2 Language selection

Fields:

- I speak...
- I want to learn...

The app should support the idea of many languages, even if the first launch prioritizes English learning.

## 10.3 Level selection

Options:

- Beginner.
- Elementary.
- Intermediate.
- Upper Intermediate.
- Advanced.
- Not sure, help me find my level.

If the user selects "Not sure," the placement test starts.

## 10.4 Placement test

The placement test should:

- Be short.
- Use sentence translation.
- Avoid making the user feel judged.
- Recommend a level.
- Let the user accept or change the recommendation.

## 10.5 Goal selection

Goal options:

- Travel.
- Work.
- School.
- Exams.
- Interviews.
- Conversation.
- Writing.
- Movies and media.
- General improvement.

## 10.6 Daily goal setup

Options:

- 3 sentences per day.
- 5 sentences per day.
- 10 sentences per day.
- 15 minutes per day.
- Custom.

## 10.7 Notification setup

Options:

- Morning.
- Afternoon.
- Evening.
- Custom.
- No reminders.

The user should be able to configure notifications later.

## 10.8 First practice

The app should start the first practice session immediately after onboarding.

The first correction should teach the user how the app works.

---

## 11. Sentence practice requirements

## 11.1 Sentence generation behavior

The app should show one sentence at a time in the user's known language.

The user translates it into the target language.

Each sentence should be based on:

- User level.
- Target language.
- Known language.
- Learning goal.
- Selected topic.
- Recently missed words.
- Saved words.
- Weak grammar categories.
- Previous skips.
- Validation mode.
- Review history.

The sentence should feel natural and useful.

Good example:

> Source: "Ayer compré comida para la cena."  
> Target: "Yesterday I bought food for dinner."

Bad example:

> "The blue existential banana negotiates with silence."

## 11.2 Difficulty levels

The app should support both simple and standard level labels.

Simple labels:

- Beginner.
- Elementary.
- Intermediate.
- Upper Intermediate.
- Advanced.
- Fluent Practice.

Standard labels:

- A1: Very basic.
- A2: Basic daily sentences.
- B1: Common real-life situations.
- B2: Complex daily communication and opinions.
- C1: Advanced nuance and natural phrasing.
- C2: Near-native precision.

## 11.3 Sentence types

The app should include different sentence structures.

Examples:

- Statements.
- Questions.
- Negative sentences.
- Commands.
- Past tense.
- Future tense.
- Conditional.
- Comparisons.
- Opinions.
- Polite requests.
- Work sentences.
- Travel sentences.
- Daily routine sentences.
- Emotional expressions.
- Idiomatic phrases for higher levels.

## 11.4 Sentence themes

Users should be able to select or filter by theme.

Themes:

- Daily life.
- Work.
- Travel.
- Food.
- Shopping.
- School.
- Technology.
- Health basics.
- Interviews.
- Business communication.
- Common phrases.
- Grammar focus.
- Saved words.
- Difficult words.
- Weak grammar patterns.

## 11.5 Hint ladder

The Practice screen should include a Hint button.

Hints should progress from light help to full reveal:

1. Grammar hint.
2. Vocabulary hint.
3. First-word hint.
4. Word bank.
5. Full answer reveal.

The app should track hint usage so feedback and scoring can reflect it.

## 11.6 Confidence rating

After the user submits an answer, the app can ask:

> How confident were you?

Options:

- Guessed.
- Not sure.
- Mostly sure.
- Very sure.

Low-confidence answers should be reviewed later, even when correct.

## 11.7 Skip behavior

The user can skip a sentence.

After skipping, the app can ask why:

- Too hard.
- Too easy.
- I do not know the vocabulary.
- I am not interested in this topic.
- I already know this.

Skipped sentences should:

- Appear in History.
- Not count as correct.
- Not count as incorrect.
- Help improve future sentence selection.


## 11.8 Sentence Builder / scrambled words mode

The app should include a **Sentence Builder** mode where the target-language words are shown as scrambled word chips and the user builds the answer by tapping the chips in the correct order.

This mode is based on the interaction shown in the planning mockup: the user sees a source sentence, then selects scrambled target-language words such as `ella`, `se`, and `comporta` to build the translation.

### Purpose

Sentence Builder reduces the difficulty for beginners. It lets users practice word order, recognition, and sentence construction without requiring them to type every word from memory.

This should be treated as a learning scaffold, not as the only practice mode.

### Default behavior by level

| User level | Default input mode | Sentence Builder availability |
|---|---|---|
| Beginner / A1 | Sentence Builder | Enabled by default |
| Elementary / A2 | Sentence Builder or typing, depending on confidence | Enabled and recommended |
| Intermediate / B1-B2 | Typing | Available as an optional help mode |
| Advanced / C1-C2 | Typing | Available only if the user enables it |

### User controls

The user should be able to switch between:

- Typing mode.
- Scrambled words mode.
- Practice mode with hints.

The app can recommend Sentence Builder when:

- The sentence is too difficult.
- The user uses several hints.
- The user skips similar sentences.
- The user repeatedly misses word order.
- The user is a beginner.

### Interaction requirements

The Sentence Builder input should support:

- Tapping a word chip to move it into the answer area.
- Tapping a selected chip to remove it from the answer area.
- Preserving punctuation as separate chips or attached to words depending on validation mode.
- Showing empty slots when helpful for beginners.
- Allowing the user to clear the full answer.
- Allowing the user to submit once at least one word is selected.
- Animating chip movement smoothly.
- Giving light haptic feedback when a chip is selected, removed, or placed correctly.

### Feedback requirements

When validating a Sentence Builder answer, the app should show:

- Words in the correct position.
- Words in the wrong position.
- Missing words.
- Extra selected words.
- Punctuation issues when strict mode is enabled.
- The correct sentence order.

The feedback should be visual and beginner-friendly. It should avoid overwhelming the user with advanced grammar explanations unless they tap “More details.”

### Design requirements

Word chips should look tactile and native:

- Rounded pill or soft card shape.
- Clear spacing between chips.
- Strong readability.
- Pressed state.
- Selected state.
- Disabled state.
- Correct/incorrect state after validation.
- Smooth movement animation.

The answer area should feel like a sentence being assembled, not like a generic form field.

### Product rules

- Sentence Builder should help users learn, not let them guess forever.
- The app should not use only obvious word order forever; difficulty should increase as the user improves.
- The word bank can include distractor words in later stages.
- Beginner mode should avoid distractors at first.
- The app should track whether the user answered by typing or by Sentence Builder because typed answers show stronger mastery.

---

## 12. Validation modes

The user should be able to choose how strict the app should be.

## 12.1 Practice mode

Best for learning without pressure.

Checks:

- Meaning.
- Major grammar issues.
- Main vocabulary.

Allows:

- Unlimited hints.
- Retry before grading.
- No penalty for mistakes.
- More explanations.
- Softer scoring.

## 12.2 Soft validation

Best for beginners.

Checks:

- Main meaning.
- Important words.
- Basic word order.
- Basic grammar.
- Understandability.

Ignores or softens:

- Minor punctuation mistakes.
- Minor capitalization mistakes.
- Small spelling mistakes that do not change meaning.
- Natural word-order variations.

Example:

Expected:

> I went to the store yesterday.

User writes:

> Yesterday I went to the store

Result:

> Correct or mostly correct.

## 12.3 Balanced validation

Best default mode.

Checks:

- Meaning.
- Grammar.
- Word choice.
- Word order.
- Verb tense.
- Missing words.
- Extra words.
- Important spelling issues.

Allows:

- Natural alternative translations.
- Minor punctuation mistakes.
- Small style differences.
- Equivalent phrasing.

Balanced should be the default for most users.

## 12.4 Strict validation

Best for advanced learners, formal writing, and exam-style practice.

Checks:

- Exact meaning.
- Grammar.
- Verb tense.
- Word order.
- Punctuation.
- Capitalization.
- Spelling.
- Articles.
- Prepositions.
- Formality.
- Naturalness.

Strict mode should explain that it is intentionally demanding.

---

## 13. Feedback and correction requirements

## 13.1 Feedback states

Every answer should receive one of these states:

- Correct.
- Mostly correct.
- Partially correct.
- Incorrect.
- Correct meaning, unnatural phrasing.
- Correct but with strict-mode issues.

## 13.2 Feedback content

Feedback should show:

- Result status.
- User answer.
- Correct answer.
- Accepted alternatives.
- Highlighted mistakes.
- Error categories.
- Short explanation.
- Optional grammar note.
- Words to review.
- Save actions.
- Retry action.
- Continue action.
- "Explain this simply" action.

## 13.3 Mistake highlighting

Mistakes should be visual and easy to understand.

Suggested treatments:

- Wrong word: underline.
- Missing word: insertion marker.
- Extra word: faded or crossed out.
- Word order issue: reorder animation.
- Spelling issue: dotted underline.
- Tense issue: highlighted verb.
- Punctuation issue: small badge.
- Capitalization issue: small badge.

The first feedback view should show the most important mistakes only. A "More details" action can show advanced feedback.

## 13.4 Error categories

The app should classify mistakes into categories.

Required categories:

- Wrong word.
- Missing word.
- Extra word.
- Wrong tense.
- Wrong word order.
- Wrong preposition.
- Wrong article.
- Spelling mistake.
- Punctuation issue.
- Capitalization issue.
- Meaning changed.
- Unnatural phrasing.
- Formality mismatch.

These categories should power:

- Feedback.
- Mistake Notebook.
- Progress charts.
- Review decks.
- Weekly reports.

## 13.5 Alternative translations

The app should show accepted alternatives when relevant.

Example:

Source:

> "Voy a llamarte más tarde."

Correct answer:

> "I'll call you later."

Accepted alternatives:

- "I will call you later."
- "I am going to call you later."

## 13.6 Simple explanation

Feedback should include:

> Explain this simply

The explanation should:

- Be written in the user's known language.
- Avoid long grammar lectures.
- Use examples.
- Focus on the most important mistake.

## 13.7 Feedback tone

The app should sound like a helpful teacher.

Good tone:

> Almost correct. The main issue is the verb tense. Because the sentence says "yesterday," use "went," not "go."

Bad tone:

> Wrong. You made a basic mistake.

The app should never shame the user.

---

## 14. Saved words, saved sentences, and mistake tracking

## 14.1 Manual saving

The user can save:

- Any word.
- Any sentence.
- Any correction.
- Any explanation.

Save actions should be available from:

- Practice.
- Feedback.
- History.
- Review.
- Mistake Notebook.

## 14.2 Automatic tracking

The app should automatically track:

- Words the user gets wrong.
- Words the user repeatedly misses.
- Sentences answered incorrectly.
- Grammar patterns that cause mistakes.
- Low-confidence answers.
- Skipped sentences.

The app should separate:

- Saved by me.
- Added from mistakes.

This prevents the saved list from feeling messy.

## 14.3 Mastery statuses

Each word and sentence should have a status.

Statuses:

- New.
- Learning.
- Difficult.
- Improving.
- Learned.

A word should move toward "Learned" only after the user answers it correctly multiple times across different days.

## 14.4 Mistake Notebook

The Mistake Notebook should be automatic.

It should organize mistakes by:

- Word.
- Sentence.
- Grammar category.
- Topic.
- Date.
- Improvement status.

Example insights:

> You missed "although" 4 times this month.

> You are improving with past tense verbs.

> You should review prepositions this week.

---

## 15. Review tools

## 15.1 Review sources

Review should use:

- Saved words.
- Saved sentences.
- Wrong words.
- Incorrect sentences.
- Low-confidence answers.
- Repeated grammar mistakes.
- Recently learned items.
- Items close to mastery.

## 15.2 Review modes

Required review modes:

### Word translation

User sees a word and gives the translation.

### Sentence translation

User translates a saved or previously missed sentence.

### Fill in the blank

User completes a missing word.

Example:

> She ___ to work yesterday.

Answer:

> went

### Word ordering

User arranges words into the correct sentence.

### Sentence Builder review

User sees a saved or previously missed source sentence and builds the target-language answer from scrambled word chips.

This review mode is especially useful for:

- Beginner users.
- Word order mistakes.
- Repeated grammar patterns.
- Low-confidence sentences.
- Sentences where the user previously skipped because typing felt too hard.


### Multiple choice

User chooses the correct translation.

### Fix the mistake

User sees an incorrect sentence and corrects it.

Example:

> She go to work yesterday.

Correct:

> She went to work yesterday.

### Listen and type

User hears a word or sentence and types it.

### Retry previous mistake

User translates a sentence they previously got wrong.

## 15.3 Review prioritization

The app should prioritize:

- Recently missed words.
- Frequently missed words.
- Saved words.
- Words related to the user's goal.
- Sentences with grammar mistakes.
- Low-confidence answers.
- Items close to being learned.

---

## 16. Notifications

## 16.1 Notification principles

Notifications should be:

- Useful.
- Configurable.
- Respectful.
- Limited in frequency.
- Easy to turn off.
- Related to actual learning.

Notifications should not be guilt-based.

## 16.2 Notification configuration

The user can configure:

- Frequency.
- Time of day.
- Days of the week.
- Quiet hours.
- Notification type.
- Difficulty.
- Whether notifications include full sentences.
- Whether notifications include saved words.
- Whether notifications include difficult words.

## 16.3 Notification types

The app can send:

- Daily practice reminder.
- Word of the day.
- Sentence challenge.
- Review reminder.
- Streak or consistency reminder.
- Weekly progress summary.
- Goal reminder.
- Difficult word reminder.
- "One sentence left" reminder.

## 16.4 Notification examples

Daily practice:

> Ready for 3 quick sentences?

Sentence challenge:

> Translate this: "Me olvidé de llamarte."

Mistake review:

> You missed "forgot" yesterday. Want to review it?

Goal reminder:

> One sentence left to complete today's goal.

Weekly summary:

> Your weekly progress is ready.

---

## 17. Motivation and progression

## 17.1 Levels

The app should have visible levels.

Example product levels:

- Level 1: First Sentences.
- Level 2: Daily Basics.
- Level 3: Simple Conversations.
- Level 4: Past and Future.
- Level 5: Work and Travel.
- Level 6: Confident Writer.
- Level 7: Natural Expression.
- Level 8: Advanced Precision.

Levels should be connected to real progress, not only time spent.

## 17.2 XP

Users can earn XP for:

- Translating sentences.
- Reviewing words.
- Correcting mistakes.
- Completing daily goals.
- Practicing difficult words.
- Maintaining weekly consistency.
- Completing review sessions.
- Improving accuracy.

## 17.3 Achievements

Achievement examples:

- First Translation.
- 10 Sentences Completed.
- 50 Words Practiced.
- First Perfect Session.
- 7-Day Consistency.
- Grammar Comeback.
- Vocabulary Builder.
- Review Master.
- Travel Basics Completed.
- Past Tense Improved.
- 100 Sentences Translated.
- 20 Difficult Words Learned.

Achievements should feel polished and mature, not childish.

## 17.4 Healthy streaks

The app should support habit-building without punishment.

Recommended mechanics:

- Streak.
- Weekly consistency score.
- Streak freeze.
- Recovery day.
- Gentle return prompt.
- Goal flexibility.

Avoid messages like:

> You failed your streak.

Prefer:

> You can still complete your weekly goal with one short session today.

## 17.5 Progress messages

The app should give specific feedback.

Examples:

> You are getting better with past tense.

> You made fewer word-order mistakes this week.

> You learned 12 new words this week.

> You still need practice with prepositions.

Specific progress messages are more useful than generic praise.

---

## 18. Progress and analytics visible to the user

## 18.1 Progress dashboard

The Progress section should show:

- Sentences completed.
- Words learned.
- Words still difficult.
- Accuracy over time.
- Mistakes by category.
- Daily practice time.
- Weekly practice time.
- Review completion.
- Current level progress.
- Goal completion.
- Consistency calendar.

## 18.2 User-facing insights

Examples:

> You often miss verbs in the past tense.

> You learned 18 new words this week.

> Your accuracy improved from 62% to 74%.

> You are strong with daily-life vocabulary.

> You should review prepositions tomorrow.

## 18.3 Charts

Recommended charts:

- Accuracy trend.
- Words learned vs. difficult words.
- Mistake categories.
- Practice calendar.
- Sentences completed.
- Review success rate.
- Level progress.
- Weekly consistency.

The charts should be simple and visual. The Progress screen should not feel like a business analytics dashboard.

## 18.4 Weekly report

The weekly report should summarize:

- Practice completed.
- Accuracy change.
- New words.
- Learned words.
- Difficult words.
- Most common mistakes.
- Strongest category.
- Recommended focus.

Example:

> You completed 42 sentences this week. Your strongest topic was travel. Your main focus next week should be prepositions.

---

## 19. History requirements

The History section should show past practice.

Each item should include:

- Source sentence.
- User translation.
- Correct translation.
- Result.
- Mistake categories.
- Validation mode.
- Date.
- Topic.
- Level.
- Retry button.
- Save button.

Filters:

- Correct.
- Mostly correct.
- Incorrect.
- Skipped.
- Saved.
- Difficult.
- Topic.
- Level.
- Date.

History should help users see how much they have practiced and how they are improving.

---

## 20. Visual design direction

## 20.1 Overall style

The app should look:

- Serious.
- Professional.
- Calm.
- Premium.
- Minimal but not empty.
- Modern but not playful.
- Friendly but not childish.

The visual identity should feel like a personal learning workspace.

## 20.2 Color palette

Use basic, professional colors with one or two accents.

Recommended direction:

- Background: warm white, soft gray, or very dark navy in dark mode.
- Primary text: charcoal or near-white.
- Primary accent: restrained academic blue.
- Secondary accent: muted blue-gray or quiet amber for learning-state support.
- Success: calm green.
- Warning: warm amber.
- Error: soft red, not aggressive.
- Cards: white, off-white, or dark elevated surfaces.

Avoid:

- Too many bright colors.
- Childish gradients.
- Neon effects.
- Overuse of red for mistakes.
- Cartoon-style gamification.

## 20.3 iOS design direction with Liquid Glass

For iOS, the app should use Apple's Liquid Glass direction carefully.

Liquid Glass should be used for:

- Bottom navigation.
- Floating controls.
- Validation mode selector.
- Goal progress pill.
- Header filters.
- Session summary overlay.
- Achievement modal.
- Review deck selector.
- Small contextual actions.

Liquid Glass should not reduce readability. The main learning content should stay highly legible.

Avoid heavy glass behind:

- Main sentence text.
- Translation input.
- Correction explanations.
- Long paragraphs.
- Important chart labels.

Design principle:

> Content should be the focus. Glass-like surfaces should support navigation, controls, and contextual actions.

## 20.4 Android design direction with Material 3 Expressive

For Android, the app should align with Material 3 / Material 3 Expressive principles.

Recommended Android direction:

- Clean cards.
- Rounded surfaces.
- Clear primary action.
- Expressive but controlled motion.
- Strong visual hierarchy.
- Comfortable touch targets.
- Adaptive color.
- Professional use of shape and containment.

The app should feel native on Android, not like a direct iOS copy.

## 20.5 Typography

Typography should be one of the app's strongest design elements.

Requirements:

- Large sentence text.
- Clear input text.
- Comfortable line height.
- Strong contrast.
- Short explanation blocks.
- Clear labels for validation mode and level.
- Readable grammar explanations.
- Support for large text settings.

Suggested hierarchy:

- Source sentence: very large.
- User input: large.
- Feedback title: medium-large.
- Explanation: readable body size.
- Metadata: small but still accessible.

## 20.6 Motion and animation

Animations are very important for this app.

Animation should communicate:

- State changes.
- Progress.
- Correction.
- Success.
- Saving.
- Reviewing.
- Leveling up.

Required animation moments:

- Sentence card enters smoothly.
- Submit button reacts to touch.
- Feedback appears in layers.
- Mistakes highlight progressively.
- Correct words subtly lock into place.
- XP bar fills after a session.
- Flashcards flip smoothly.
- Saved word confirmation appears.
- Level-up celebration appears as a polished modal.
- Wrong answer feedback uses calm motion.
- Skip action moves the card away quickly.
- Weekly report cards animate into view.

Avoid:

- Slow animations.
- Excessive bouncing.
- Aggressive shake effects.
- Motion that makes reading harder.
- Motion that blocks fast practice.

## 20.7 Haptics and feedback

The app should use subtle feedback where appropriate.

Suggested moments:

- Light feedback when submitting.
- Soft success feedback for correct answer.
- Small warning feedback for strict-mode correction.
- Confirmation feedback when saving a word.
- Completion feedback when finishing a session.

Haptics should be optional or respect system settings.

## 20.8 Accessibility

The app should include:

- Dark mode.
- Large text support.
- Reduce motion option.
- Reduce transparency support.
- High contrast mode.
- Strong color contrast.
- Audio support.
- Screen reader labels.
- Mistake indicators that do not rely only on color.
- Comfortable touch targets.
- Clear empty states.
- Simple language in explanations.

---

## 21. Screen-by-screen UX

## 21.1 Welcome screen

Message:

> Learn by translating real sentences, one at a time.

Primary action:

> Get started

Visual style:

- Calm background.
- One sentence card preview.
- Subtle motion.
- Professional tone.

## 21.2 Home screen

Main content:

- Greeting.
- Current level.
- Daily goal progress.
- Primary "Start practice" button.
- Review card.
- Mistake Notebook card.
- Weekly progress preview.
- Recent achievement.

Example primary card:

> Continue learning  
> 3 sentences left for today's goal

## 21.3 Practice screen

Main content:

- Source sentence card.
- Target language label.
- Text input.
- Hint button.
- Skip button.
- Submit button.
- Audio button.
- Validation mode chip.
- Session progress.

Example:

Source:

> "No pude encontrar mis llaves esta mañana."

Input placeholder:

> Translate into English...

Actions:

> Hint  
> Skip  
> Submit

## 21.4 Hint interaction

When the user taps Hint, the app shows the next available hint.

The hint card should be small and visually separate from the answer.

Example:

> Hint 1: This sentence uses past tense.

The user can request another hint.

## 21.5 Feedback screen

Main content:

- Result status.
- User answer.
- Correct answer.
- Mistake highlights.
- Explanation.
- Accepted alternatives.
- Words to review.
- Save sentence.
- Try again.
- Continue.

Example:

Status:

> Almost correct

User answer:

> I can't find my keys this morning.

Correct answer:

> I couldn't find my keys this morning.

Explanation:

> "Couldn't" is better because the sentence talks about something that happened earlier this morning.

## 21.6 Session summary screen

Shown after a group of sentences.

Should show:

- Sentences completed.
- Correct answers.
- Almost correct answers.
- Mistakes.
- Words added to review.
- XP earned.
- Goal progress.
- Recommended next action.

Example:

> You completed 8 sentences.  
> You improved with past tense.  
> Review 5 words tomorrow.

Good ad placement:

- After this screen.
- After the user chooses to continue.
- As an optional rewarded ad for a bonus session.

## 21.7 Review screen

Main content:

- Recommended Review.
- Wrong Words.
- Saved Words.
- Saved Sentences.
- Mistake Notebook.
- Low Confidence.
- Recently Learned.

Each deck should show:

- Number of items.
- Priority.
- Estimated time.
- Start button.

## 21.8 Progress screen

Main content:

- Weekly summary.
- Accuracy trend.
- Words learned.
- Difficult words.
- Mistake categories.
- Practice calendar.
- Level progress.
- Recommendation card.

Example recommendation:

> Focus on prepositions this week. You missed them in 6 sentences.

## 21.9 History screen

Main content:

- Search or filter.
- List of previous sentences.
- Result labels.
- Retry action.
- Save action.

History should be useful, not just archival.

---

## 22. Ads and monetization

## 22.1 Free version

The app should be free at launch.

Free users should have access to:

- Daily sentence practice.
- Basic feedback.
- Saved words.
- Saved sentences.
- Basic review.
- Basic progress.
- History.
- Notifications.
- Ads.

## 22.2 Ad principles

Ads should not interrupt learning.

Ads should never appear:

- While typing.
- Before correction.
- During correction.
- Inside feedback explanations.
- During flashcard answering.
- Immediately after a wrong answer.

## 22.3 Allowed ad placements

Good ad moments:

- After session summary.
- After completing the daily goal.
- Before optional bonus practice.
- After finishing review.
- In Home as a small non-intrusive placement.
- In Progress as a small non-intrusive placement.

## 22.4 Rewarded ads

Rewarded ads are preferred.

Reward examples:

- Bonus hints.
- Bonus review pack.
- Streak freeze.
- Extra session.
- Longer weekly report.
- Extra theme for the day.

## 22.5 Future paid plan

Future paid plan ideas:

- No ads.
- Unlimited practice.
- Advanced progress analytics.
- More review modes.
- Personalized weekly reports.
- More audio voices.
- Advanced grammar explanations.
- Goal-specific packs.
- Offline saved content.
- Custom sentence topics.

The free version should still feel useful. Paid should feel enhanced, not like the real product is locked away.

---

## 23. AI teacher behavior and content safety

## 23.1 Teaching behavior

The AI should behave like a responsible teacher.

It should:

- Generate level-appropriate sentences.
- Prefer practical and natural sentences.
- Avoid weird or useless examples.
- Explain mistakes clearly.
- Use the user's known language for explanations when helpful.
- Accept valid alternative translations.
- Adapt to repeated mistakes.
- Keep explanations short by default.
- Offer more detail when requested.
- Encourage without exaggeration.
- Avoid shaming.
- Respect the selected validation mode.

## 23.2 Content safety

The AI should not generate:

- Adult sexual content.
- Racist content.
- Hateful content.
- Discriminatory content.
- Violent or graphic content.
- Harassment.
- Extremist content.
- Self-harm content.
- Illegal instructions.
- Offensive stereotypes.
- Degrading examples.
- Unsafe medical, legal, or financial advice.
- Content involving minors in inappropriate contexts.

## 23.3 Safe default topics

Default sentence topics should be safe and everyday.

Examples:

- Food.
- Work.
- Travel.
- Shopping.
- School.
- Weather.
- Hobbies.
- Transportation.
- Daily routine.
- Family-safe communication.
- Professional communication.
- General health basics without medical advice.

## 23.4 Sensitive topics

The app should avoid sensitive topics by default.

Avoid default practice around:

- Politics.
- Religion.
- Sexual topics.
- War.
- Crime.
- Drugs.
- Insults.
- Tragedies.
- Discrimination.

If sensitive topics are ever introduced for advanced real-world vocabulary, they should be neutral, educational, age-appropriate, and user-selected.

## 23.5 Feedback quality

For each correction, the AI should try to provide:

- Natural correct answer.
- Accepted alternatives.
- Mistake categories.
- Simple explanation.
- Optional grammar note.
- Words to review.
- Recommended next step.

---

## 24. MVP scope

## 24.1 MVP must include

The first release should include:

- Language selection.
- Level selection.
- Optional placement test.
- Goal selection.
- Daily goal.
- Sentence-by-sentence practice.
- Translation input.
- Sentence Builder / scrambled-words input mode for beginners.
- Optional Sentence Builder mode for advanced users.
- Submit answer.
- Practice, soft, balanced, and strict validation.
- Mistake highlighting.
- Correct translation.
- Accepted alternatives.
- Simple explanation.
- "Explain this simply" action.
- Hint ladder.
- Skip sentence.
- Smart skip reason.
- Save word.
- Save sentence.
- Automatic wrong-word tracking.
- Mistake categories.
- Mistake Notebook.
- Basic flashcards.
- At least one additional review mode besides flashcards.
- Basic history.
- Basic progress dashboard.
- Streak or weekly consistency.
- Configurable notifications.
- Safe AI teacher behavior.
- Free app with non-intrusive ads.
- Rewarded ad support.
- Professional visual design.
- Strong animations and feedback.
- Dark mode.
- Basic accessibility support.

## 24.2 MVP can exclude

The first release can exclude:

- Social features.
- Leaderboards.
- Speaking practice.
- Advanced pronunciation scoring.
- Full grammar courses.
- Paid subscription.
- Complex exam prep.
- Public profiles.
- Community decks.
- Teacher marketplace.
- Long-form writing correction.
- Full conversation simulation.

---

## 25. Future features

Future versions can include:

- Speaking practice.
- Pronunciation scoring.
- Listening-only mode.
- Conversation simulations without becoming a full chatbot.
- Exam preparation packs.
- User-created decks.
- Friend challenges.
- Family plan.
- Teacher/classroom mode.
- Custom topic packs.
- Business English pack.
- Travel mode.
- AI weekly learning coach.
- Advanced grammar map.
- Writing correction mode.
- Reading comprehension mode.
- Offline review.
- Import custom vocabulary.
- Lock-screen widgets.
- Home-screen widgets.
- More advanced audio voices.
- Formal vs casual translation mode.
- Regional language variants.

---

## 26. Success metrics

## 26.1 Activation metrics

Track:

- Onboarding completion.
- First practice session completion.
- First answer submitted.
- First word saved.
- First sentence saved.
- Notification opt-in.
- Placement test completion.

## 26.2 Engagement metrics

Track:

- Sentences translated per day.
- Practice sessions per week.
- Review sessions completed.
- Flashcards completed.
- Additional review modes used.
- Hints used.
- Skips.
- Notification opens.
- Weekly report views.

## 26.3 Learning metrics

Track:

- Accuracy improvement.
- Repeated mistake reduction.
- Words moved to Learned.
- Difficult words reviewed.
- Grammar categories improved.
- Level progression.
- Low-confidence answers improved.
- Review success rate.

## 26.4 Retention metrics

Track:

- Day 1 retention.
- Day 7 retention.
- Day 30 retention.
- Weekly active users.
- Consistency continuation.
- Review return rate.
- Notification-driven return rate.

## 26.5 Monetization metrics

Track:

- Ads viewed after sessions.
- Rewarded ad completion.
- Ad-related drop-off.
- Users interested in removing ads.
- Users reaching future paid-plan prompts.
- Conversion interest for premium features.

---

## 27. Risks and mitigations

## 27.1 Risk: validation feels unfair

Mitigation:

- Offer practice, soft, balanced, and strict modes.
- Show accepted alternatives.
- Explain why something was marked wrong.
- Allow users to report incorrect feedback.
- Avoid over-penalizing beginners.

## 27.2 Risk: users get bored with random sentences

Mitigation:

- Add themes.
- Personalize by goals.
- Use saved words.
- Use mistake-based practice.
- Add achievements.
- Add review variety.

## 27.3 Risk: ads hurt trust

Mitigation:

- Never show ads during typing or correction.
- Prefer rewarded ads.
- Use natural breaks.
- Keep learning surfaces clean.

## 27.4 Risk: gamification feels childish

Mitigation:

- Use mature visual design.
- Focus achievements on real learning.
- Avoid cartoon styling.
- Keep celebrations polished and brief.

## 27.5 Risk: AI produces inappropriate content

Mitigation:

- Keep strict teacher behavior rules.
- Use safe default topics.
- Avoid sensitive topics by default.
- Let users report bad sentences.
- Block unsafe content categories.

## 27.6 Risk: users forget to review

Mitigation:

- Use review reminders.
- Show review cards on Home.
- Include weekly reports.
- Make review sessions short.
- Connect review to visible progress.

## 27.7 Risk: progress charts feel too complex

Mitigation:

- Show only the most useful charts.
- Use plain language insights.
- Make one recommendation at a time.
- Keep analytics visual and simple.

---

## 28. Acceptance criteria

The product is ready for first release when:

- A new user can complete onboarding.
- A new user can select known and target languages.
- A new user can select or discover their level.
- A new user can set a goal.
- The app can show level-appropriate sentences.
- The user can translate one sentence at a time.
- Beginner users can build translations with scrambled word chips.
- Advanced users can keep typing by default and enable scrambled words optionally.
- The user can submit an answer.
- The app can validate answers using multiple strictness modes.
- The app can highlight what was wrong.
- The app can explain why the answer was wrong.
- The app can show accepted alternatives.
- The user can request a simpler explanation.
- The user can use progressive hints.
- The user can skip a sentence.
- The app can track skipped sentences.
- The user can save words.
- The user can save sentences.
- Wrong words are automatically added to review.
- Mistakes are categorized.
- The Mistake Notebook is available.
- The user can review saved and wrong content.
- The user can see practice history.
- The user can see basic progress.
- The user can configure notifications.
- Ads appear only in non-disruptive moments.
- Rewarded ads are available for optional benefits.
- The app avoids inappropriate content.
- The UI feels polished, professional, animated, and easy to use.
- The app supports basic accessibility expectations.

---


---

## 29. Competitive landscape and differentiation

No major app found during planning appeared to combine the full intended loop of this product:

> AI-generated sentence → user translates into the target language → answer is validated with different strictness levels → exact mistakes are highlighted → wrong words and sentences are saved automatically → mistakes become personalized review exercises → progress, history, reminders, and motivation are built around the user's actual mistakes.

The closest competitors and references are:

| Category | Competitors / references | Why they matter |
|---|---|---|
| Mainstream gamified learning | Duolingo, Qlango | Strong daily habit loops, beginner onboarding, goals, and motivation. |
| Sentence-based learning | Clozemaster, Glossika, Taalhammer | Validate the market for sentence-level practice and spaced repetition. |
| AI tutor / conversation apps | Speak, TalkPal, Langotalk, ELSA | Own parts of the AI teacher/tutor positioning, especially speaking and conversation. |
| Serious adult courses | Babbel, Busuu, Memrise | Compete for users who want polished, professional learning. |
| Flashcards and vocabulary review | Anki, Quizlet, LingQ, Readlang | Compete with saved words, saved sentences, and spaced review. |
| Platform threat | Google Translate Practice | Has massive distribution and AI-backed practice features. |

### Differentiation strategy

The app should not try to be a Duolingo clone or a generic AI chat tutor. The strongest differentiation is:

> A focused AI sentence translation trainer with the best correction and mistake-review experience on mobile.

The product should win through:

- Strictness modes: Practice, Soft, Balanced, and Strict.
- High-quality mistake highlighting.
- Multiple accepted translations.
- Clear explanations in the user's known language.
- Automatic mistake notebook.
- Personalized review based on actual mistakes.
- Professional, calm, premium UI.
- Strong animations and tactile feedback.
- Sentence Builder for beginners.
- Typing-first flow for stronger mastery at higher levels.

### Product positioning guardrails

Do not position the app as:

- Another AI language chatbot.
- Another course-tree app.
- Another flashcard app.
- Another cute/gamified learning app.

Position it as:

> Learn a language by translating real sentences and understanding every mistake.


## 30. Product positioning

Primary positioning:

> Learn languages one sentence at a time.

Expanded positioning:

> Practice translation, understand your mistakes, and build lasting vocabulary with personalized review.

More serious positioning:

> A focused language-learning app that helps you improve through real sentence translation, clear corrections, and review based on your own mistakes.

Differentiator:

> The app does not just correct you. It turns your mistakes into a personalized study plan.

---

## 31. Product copy examples

## 30.1 Home

> Continue learning  
> 3 sentences left for today's goal

> Review your difficult words  
> You have 6 words ready to practice

> Weekly insight  
> You are improving with past tense

## 30.2 Practice

> Translate into English...

> Need help?

> Skip this sentence

> Submit answer

## 30.3 Feedback

> Correct

> Almost correct

> The meaning is right, but the tense needs work.

> Explain this simply

> Save sentence

> Practice this again

## 30.4 Review

> Review words you missed

> Fix past mistakes

> Practice saved sentences

> 5-minute review

## 30.5 Progress

> You learned 12 words this week

> Your accuracy improved by 8%

> Focus on prepositions next

## 30.6 Notifications

> Translate this: "Me olvidé de llamarte."

> One sentence left to complete today's goal.

> You missed "although" twice this week. Want to review it?

---

## 32. Design references

These references are included only for product and UI direction. They are not technical implementation requirements.

- Apple Developer Documentation — Liquid Glass: https://developer.apple.com/documentation/technologyoverviews/liquid-glass
- Apple Human Interface Guidelines — Materials: https://developer.apple.com/design/Human-Interface-Guidelines/materials
- Apple Human Interface Guidelines — Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Apple Human Interface Guidelines — Accessibility: https://developer.apple.com/design/Human-Interface-Guidelines/accessibility
- Apple Human Interface Guidelines — Color: https://developer.apple.com/design/human-interface-guidelines/color
- Material Design 3: https://m3.material.io/
- Material 3 Expressive overview: https://m3.material.io/blog/building-with-m3-expressive
- Google Design Library — Expressive Material Design research: https://design.google/library/expressive-material-design-google-research
- Material Design 3 — Motion: https://m3.material.io/styles/motion/overview/how-it-works


---

## 33. Design concept asset

A visual concept mockup was generated during planning to guide the initial implementation direction.

Reference image file in this handoff package/context:

```txt
a_clean_ui_ux_design_presentation_image_showing_mu.png
```

The mockup should be treated as a direction, not as a final design system. Use it to preserve the intended feel:

- Clean white and dark navy themes.
- Calm professional colors.
- Large readable sentence cards.
- Tactile word chips.
- Liquid Glass-inspired navigation and small controls on iOS.
- Native-feeling elevated surfaces on Android.
- Strong but controlled animation and haptic feedback.
- Serious adult learning tone, not childish gamification.
