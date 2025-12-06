# ResuMotion AI

AI-Powered Visual Resume Builder with multiple professional templates.

## Features

- 🎨 **3 Professional Templates**: Modern Tech, Minimalist ATS, Executive Suite
- ⚡ **Real-time Preview**: See changes instantly as you type
- 🤖 **AI Features** (Optional): Content polishing and summary generation
- 📄 **Export Options**: PDF and DOCX (ATS-friendly) formats
- 🎯 **Clean UI**: Modern, intuitive interface with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

The app will be available at `http://localhost:3000`

## Configuration

### Feature Flags

AI features can be enabled/disabled via feature flags in `constants/features.ts`:

```typescript
export const FEATURE_FLAGS = {
  isPolishEnabled: false,    // Enable AI content polishing
  isGenerateEnabled: false,  // Enable AI summary generation
} as const;
```

### Environment Variables

If AI features are enabled, create a `.env` file in the root directory:

```bash
GEMINI_API_KEY=your_api_key_here
```

## Project Structure

```
ResuMotion/
├── components/
│   ├── templates/          # Resume templates
│   │   ├── ModernTech.tsx
│   │   ├── MinimalistATS.tsx
│   │   └── ExecutiveSuite.tsx
│   ├── Editor.tsx          # Main editor component
│   └── TemplateSelector.tsx
├── constants/
│   └── features.ts         # Feature flags
├── services/
│   └── geminiService.ts    # AI service integration
├── styles/
│   └── index.css           # Global styles with Tailwind
├── App.tsx                 # Main app component
├── types.ts                # TypeScript definitions
└── index.tsx               # App entry point
```

## Build Optimizations

The project includes several optimizations:

- **Code Splitting**: Templates are lazy-loaded
- **Manual Chunks**: Vendor libraries are split into separate chunks
  - `react-vendor`: React and React DOM
  - `framer-motion`: Animation library
  - `lucide-icons`: Icon library
  - `document-libs`: PDF/DOCX generation libraries
  - `ai-service`: Google GenAI SDK

## Technologies

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **PDF Export**: html2canvas + jsPDF
- **DOCX Export**: docx
- **AI (Optional)**: Google Gemini API


## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
