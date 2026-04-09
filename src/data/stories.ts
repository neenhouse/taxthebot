// Composite displacement stories based on documented AI automation patterns

export interface DisplacementStory {
  id: string;
  name: string;
  age: number;
  formerRole: string;
  industry: string;
  location: string;
  yearsExperience: number;
  story: string;
  monthsSinceDisplacement: number;
  currentStatus: 'job-searching' | 'retraining' | 'underemployed' | 'new-career' | 'unemployed';
  aiToolThatReplaced: string;
}

export const stories: DisplacementStory[] = [
  {
    id: 'story-1',
    name: 'David M.',
    age: 42,
    formerRole: 'Senior Copywriter',
    industry: 'Marketing & Advertising',
    location: 'Chicago, IL',
    yearsExperience: 16,
    story: 'I spent 16 years crafting brand voices for Fortune 500 clients. Last March, our agency replaced the entire copy team with an AI content pipeline. They kept one junior editor to "polish the outputs." Sixteen years of expertise, reduced to a prompt.',
    monthsSinceDisplacement: 13,
    currentStatus: 'underemployed',
    aiToolThatReplaced: 'ChatGPT Enterprise',
  },
  {
    id: 'story-2',
    name: 'Priya K.',
    age: 35,
    formerRole: 'Legal Research Associate',
    industry: 'Legal Services',
    location: 'New York, NY',
    yearsExperience: 8,
    story: 'Our firm adopted an AI legal research tool that could analyze case law in seconds. Within three months, they laid off 12 of us. I have a law degree and $180,000 in student debt for a career that no longer exists in its previous form.',
    monthsSinceDisplacement: 9,
    currentStatus: 'retraining',
    aiToolThatReplaced: 'Harvey AI',
  },
  {
    id: 'story-3',
    name: 'Marcus T.',
    age: 54,
    formerRole: 'Quality Assurance Analyst',
    industry: 'Software Development',
    location: 'Austin, TX',
    yearsExperience: 22,
    story: 'After 22 years in QA, I was told my role was being "automated." The AI testing suite they bought costs less per month than my daily rate. At 54, every recruiter tells me I am "overqualified" — what they mean is too old and too expensive.',
    monthsSinceDisplacement: 18,
    currentStatus: 'job-searching',
    aiToolThatReplaced: 'Testim.io / Copilot',
  },
  {
    id: 'story-4',
    name: 'Sarah L.',
    age: 29,
    formerRole: 'Junior Graphic Designer',
    industry: 'Media & Publishing',
    location: 'Portland, OR',
    yearsExperience: 4,
    story: 'I went to design school, interned for free, finally landed a full-time role. Two years in, they replaced our design team with Midjourney and a single art director. Four years of training and portfolio-building for a career that barely lasted.',
    monthsSinceDisplacement: 11,
    currentStatus: 'new-career',
    aiToolThatReplaced: 'Midjourney + DALL-E',
  },
  {
    id: 'story-5',
    name: 'James R.',
    age: 47,
    formerRole: 'Financial Analyst',
    industry: 'Banking & Finance',
    location: 'Charlotte, NC',
    yearsExperience: 19,
    story: 'I analyzed market trends and prepared reports for institutional clients. The bank deployed an AI system that generates the same reports in minutes. They kept three analysts out of twenty. I was not one of them.',
    monthsSinceDisplacement: 7,
    currentStatus: 'job-searching',
    aiToolThatReplaced: 'Bloomberg GPT',
  },
  {
    id: 'story-6',
    name: 'Elena V.',
    age: 38,
    formerRole: 'Medical Transcriptionist',
    industry: 'Healthcare',
    location: 'Minneapolis, MN',
    yearsExperience: 12,
    story: 'I transcribed medical records for three clinics. The work required deep knowledge of medical terminology and attention to detail. An AI transcription service replaced all of us overnight. Twelve years of specialized skill, gone in a software update.',
    monthsSinceDisplacement: 15,
    currentStatus: 'unemployed',
    aiToolThatReplaced: 'Nuance DAX / Whisper',
  },
];
